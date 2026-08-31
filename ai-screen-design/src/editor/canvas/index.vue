<script setup lang="ts">
import type { MaterialSchema } from '@/schema/material'
import { getMaterialComponent, createNode } from '@/materials'
import Moveable from 'vue3-moveable';
import Selecto from 'vue3-selecto';
import SketchRuler from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'

import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'

import { useCanvasRuler } from './composables/useCanvasRuler';
import { useMoveable } from './composables/useMoveable'
import { useSelection } from './composables/useSelection'
import { mapCanvasBg } from '@/composables/useTheme'
import { buildNodeOuterStyle, buildNodeInnerStyle } from '@/utils/nodeStyle'

defineComponent({
  name: 'CanvasRoot',
})

const editorStore = useEditorStore()

const {
  nodes,
  selectedNodeIds,
} = storeToRefs(editorStore)

const moveableRef = useTemplateRef<InstanceType<typeof Moveable> | null>('moveable')
const stageRef = useTemplateRef('stage')
const canvasRootRef = useTemplateRef('canvasRoot')

// 多选状态
const multiSelecting = computed(() => selectedNodeIds.value.length > 1)
// 选中的节点是否属于同一组合
const isGroupSelected = computed(() => {
  if (selectedNodeIds.value.length < 2) return false
  const selected = nodes.value.filter((n) => selectedNodeIds.value.includes(n.id))
  const gids = selected.map((n) => n.groupId).filter(Boolean)
  return gids.length === selected.length && new Set(gids).size === 1
})

const {
  canvasWidth,
  canvasHeight,
  canvasStyle,
  rectWidth,
  rectHeight,
  lines,
  scale,
  palette,
  onZoomChange,
} = useCanvasRuler({ canvasRootRef, moveableRef })

const {
  onDrag,
  onResize,
  onDragGroup,
  onResizeGroup,
  onStart,
  onEnd
} = useMoveable(moveableRef)
const {
  selectedTarget,
  onSelect,
  onSelectEnd,
  onClearSelected,
} = useSelection({ stageRef, moveableRef })

// 获取当前组件的节点
function onDrop(e: DragEvent) {
  const data = e.dataTransfer?.getData('schema')
  const node = createNode(JSON.parse(data || '{}'))
  node.layout.x = e.offsetX - node.layout.width / 2
  node.layout.y = e.offsetY - node.layout.height / 2

  editorStore.addNode(node)
  editorStore.selectNode(node.id)
}


/**
 * 移动修改css属性
 */
function getNodeStyle(node: MaterialSchema, index: number) {
  return buildNodeOuterStyle(node, index)
}

function getNodeInnerStyle(node: MaterialSchema) {
  return buildNodeInnerStyle(node)
}

// css实现指定的顺序颠倒 所以置顶置底方法相互调用
const commandMap = {
  copy: () => editorStore.copyNode(editorStore.selectedNode),
  paste: () => editorStore.pasteClipboard(),
  remove: () => editorStore.removeNode(editorStore.selectedNode),
  moveBottom: () => editorStore.moveTop(editorStore.selectedNode),
  moveTop: () => editorStore.moveBottom(editorStore.selectedNode),
  toggleLock: () => {
    editorStore.toggleLock(editorStore.selectedNode)
    selectedTarget.value = []
  },
  group: () => editorStore.groupSelected(),
  ungroup: () => editorStore.ungroupSelected(),
  alignLeft: () => editorStore.alignNodes('left'),
  alignCenterX: () => editorStore.alignNodes('centerX'),
  alignRight: () => editorStore.alignNodes('right'),
  alignTop: () => editorStore.alignNodes('top'),
  alignCenterY: () => editorStore.alignNodes('centerY'),
  alignBottom: () => editorStore.alignNodes('bottom'),
  distributeH: () => editorStore.alignNodes('distributeH'),
  distributeV: () => editorStore.alignNodes('distributeV'),
}

function onCommand(command: string) {
  commandMap[command]()
}

/** 键盘快捷键：复制 / 粘贴 / 删除 */
function onKeydown(e: KeyboardEvent) {
  const mod = e.metaKey || e.ctrlKey
  if (mod && (e.key === 'c' || e.key === 'C')) {
    editorStore.copySelected()
    e.preventDefault()
  } else if (mod && (e.key === 'v' || e.key === 'V')) {
    editorStore.pasteClipboard()
    e.preventDefault()
  } else if ((e.key === 'Delete' || e.key === 'Backspace') && editorStore.selectedNode) {
    const target = e.target as HTMLElement
    const inInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable
    if (!inInput) {
      selectedNodeIds.value.forEach((id) => {
        const node = editorStore.findNode(id)
        if (node) editorStore.removeNode(node)
      })
      e.preventDefault()
    }
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

/** 多选对齐工具条配置 */
const alignActions = [
  { key: 'alignLeft', icon: 'mdi:format-align-left', tip: '左对齐' },
  { key: 'alignCenterX', icon: 'mdi:format-horizontal-align-center', tip: '水平居中' },
  { key: 'alignRight', icon: 'mdi:format-align-right', tip: '右对齐' },
  { key: 'alignTop', icon: 'mdi:format-vertical-align-top', tip: '顶对齐' },
  { key: 'alignCenterY', icon: 'mdi:format-vertical-align-center', tip: '垂直居中' },
  { key: 'alignBottom', icon: 'mdi:format-vertical-align-bottom', tip: '底对齐' },
  { key: 'distributeH', icon: 'mdi:format-horizontal-distribute-center', tip: '水平等距' },
  { key: 'distributeV', icon: 'mdi:format-vertical-distribute-center', tip: '垂直等距' },
]
</script>

<template>
  <div class="canvas-root" ref="canvasRoot">
    <SketchRuler v-model:scale="scale" :palette="palette" :thick="20" :width="rectWidth" :height="rectHeight"
      :canvasWidth="canvasWidth" :canvasHeight="canvasHeight" :lines="lines" @zoomchange="onZoomChange">
      <div ref="stage" class="canvas-stage" :style="canvasStyle" @dragover.prevent @drop="onDrop"
        @mousedown.self="onClearSelected">
        <el-dropdown v-for="(node, index) in nodes" :key="node.id" trigger="contextmenu" @command="onCommand">
          <div class="canvas-node" :style="getNodeStyle(node, index)" :data-node-id="node.id"
            :data-node-locked="node.locked" @mousedown="onSelect(node, $event)">
            <div class="canvas-node-inner h-full w-full" :style="getNodeInnerStyle(node)">
              <component :is="getMaterialComponent(node.type)" :schema="node"></component>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-item command="copy">复制</el-dropdown-item>
            <el-dropdown-item command="paste">粘贴</el-dropdown-item>
            <el-dropdown-item command="remove">移除</el-dropdown-item>
            <el-dropdown-item command="moveTop">置顶</el-dropdown-item>
            <el-dropdown-item command="moveBottom">置底</el-dropdown-item>
            <el-dropdown-item command="toggleLock">{{ node.locked ? '解锁' : '锁定' }}</el-dropdown-item>
            <el-dropdown-item v-if="multiSelecting" command="group">组合</el-dropdown-item>
            <el-dropdown-item v-if="isGroupSelected" command="ungroup">取消组合</el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </SketchRuler>

    <!-- 多选对齐工具条（不随画布缩放） -->
    <div v-if="multiSelecting" class="align-toolbar absolute top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-10 py-6 rounded-lg"
      :style="{ background: 'var(--bg-panel)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-panel)' }">
      <el-tooltip v-for="action in alignActions" :key="action.key" :content="action.tip" placement="bottom">
        <button class="align-btn" @mousedown.stop @click="onCommand(action.key)">
          <Icon :icon="action.icon" width="16" />
        </button>
      </el-tooltip>
      <span class="align-divider"></span>
      <el-tooltip :content="isGroupSelected ? '取消组合' : '组合'" placement="bottom">
        <button class="align-btn" @mousedown.stop @click="onCommand(isGroupSelected ? 'ungroup' : 'group')">
          <Icon :icon="isGroupSelected ? 'mdi:ungroup' : 'mdi:group'" width="16" />
        </button>
      </el-tooltip>
    </div>
    <Selecto v-if="stageRef" :container="stageRef" :dragContainer="stageRef" :selectableTargets="['.canvas-node']"
      :selectFromInside="false" toggleContinueSelect="shift" @selectEnd="onSelectEnd"></Selecto>
    <Moveable ref="moveable" :target="selectedTarget" :draggable="true" :resizable="true" :origin="false" @drag="onDrag"
      @dragGroup="onDragGroup" @resize="onResize" @resizeGroup="onResizeGroup" @dragStart="onStart" @dragEnd="onEnd"
      @dragGroupStart="onStart" @dragGroupEnd="onEnd" @resizeStart="onStart" @resizeEnd="onEnd"
      @resizeGroupStart="onStart" @resizeGroupEnd="onEnd">
    </Moveable>
  </div>
</template>

<style scoped lang="scss">
.canvas-root {
  position: relative;
  overflow: hidden;
  // 创建新的层级上下文 不管zindex多少 只能在canvasroot下面生效
  isolation: isolate;

  .canvas-stage {
    position: absolute;

    .canvas-node {
      position: absolute;
    }
  }

  .align-toolbar {
    .align-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 4px;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 150ms;

      &:hover {
        color: var(--accent);
        background: var(--bg-hover);
      }
    }

    .align-divider {
      width: 1px;
      height: 16px;
      background: var(--border-color);
    }
  }
}
</style>
