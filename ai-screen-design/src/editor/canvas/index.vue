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
} = storeToRefs(editorStore)

const moveableRef = useTemplateRef('moveable')
const stageRef = useTemplateRef('stage')
const canvasRootRef = useTemplateRef('canvasRoot')

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
  remove: () => editorStore.removeNode(editorStore.selectedNode),
  moveBottom: () => editorStore.moveTop(editorStore.selectedNode),
  moveTop: () => editorStore.moveBottom(editorStore.selectedNode),
  toggleLock: () => {
    editorStore.toggleLock(editorStore.selectedNode)
    selectedTarget.value = []
  },
}

function onCommand(command: string) {
  commandMap[command]()
}
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
            <el-dropdown-item command="remove">移除</el-dropdown-item>
            <el-dropdown-item command="moveTop">置顶</el-dropdown-item>
            <el-dropdown-item command="moveBottom">置底</el-dropdown-item>
            <el-dropdown-item command="toggleLock">{{ node.locked ? '解锁' : '锁定' }}</el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </SketchRuler>
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
}
</style>
