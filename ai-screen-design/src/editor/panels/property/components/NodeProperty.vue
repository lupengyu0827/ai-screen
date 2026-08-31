<script setup lang="ts">
import { Icon } from '@iconify/vue'
import MonacoEditor from '@/components/MonacoEditor/index.vue'

import { getMaterialSetters } from '@/materials';

import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

import FormCreate from './FormCreate.vue'
import DataSource from './DataSource.vue'
import NodeEvents from './NodeEvents.vue'

defineComponent({
  name: 'NodeProperty',
})

const editorStore = useEditorStore()

const { selectedNode } = storeToRefs(editorStore)

const setters = computed(() => {
  return getMaterialSetters(selectedNode.value.type)
})


const layoutSetters = [
  {
    label: '宽度',
    key: 'layout.width',
    type: 'number',
    span: 12,
    props: { min: 1 },
  },
  {
    label: '高度',
    key: 'layout.height',
    type: 'number',
    span: 12,
    props: { min: 1 },
  },
  {
    label: 'X',
    key: 'layout.x',
    type: 'number',
    span: 12,
  },
  {
    label: 'Y',
    key: 'layout.y',
    type: 'number',
    span: 12,
  },
  {
    label: '旋转',
    key: 'style.rotation',
    type: 'number',
    span: 12,
    props: { min: -360, max: 360 },
  },
  {
    label: '缩放X',
    key: 'layout.scaleX',
    type: 'number',
    span: 12,
    props: { min: 0.1, max: 3, step: 0.05 },
  },
  {
    label: '缩放Y',
    key: 'layout.scaleY',
    type: 'number',
    span: 12,
    props: { min: 0.1, max: 3, step: 0.05 },
  },
]

// 通用样式（GoView 风格），作用于节点内层包装
const styleSetters = [
  {
    label: '透明度',
    key: 'style.opacity',
    type: 'number',
    span: 12,
    props: { min: 0, max: 1, step: 0.05, precision: 2 },
  },
  {
    label: '圆角',
    key: 'style.borderRadius',
    type: 'number',
    span: 12,
    props: { min: 0 },
  },
  {
    label: '边框宽度',
    key: 'style.borderWidth',
    type: 'number',
    span: 12,
    props: { min: 0 },
  },
  {
    label: '边框颜色',
    key: 'style.borderColor',
    type: 'color',
    span: 12,
  },
  {
    label: '阴影',
    key: 'style.boxShadow',
    type: 'input',
    span: 24,
    props: {
      placeholder: '如 0 4px 12px rgba(0,0,0,0.5)',
    },
  },
  {
    label: '背景色',
    key: 'style.backgroundColor',
    type: 'color',
    span: 12,
  },
  {
    label: '内边距',
    key: 'style.padding',
    type: 'number',
    span: 12,
    props: { min: 0 },
  },
]

const activeTab = ref('property')
const active = ref('node')
const jsonVisible = ref(false)
const eventVisible = ref(false)
const jsonText = ref('')

const nodeEventRef = useTemplateRef<InstanceType<typeof NodeEvents>>('nodeEventRef')

function previewJson() {
  jsonText.value = JSON.stringify(selectedNode.value, null, 2)
  jsonVisible.value = true
}

function onConfirm() {
  // 拿到新节点
  const newNode = JSON.parse(jsonText.value)
  // 更新： id和type不能修改
  editorStore.updateNode(selectedNode.value.id, {
    ...newNode,
    id: selectedNode.value.id,
    type: selectedNode.value.type,
  })
  jsonVisible.value = false
}

function onConfirmEvent() {
  nodeEventRef.value.save()
  eventVisible.value = false
}

</script>

<template>
  <div class="node-property h-full flex flex-col">
    <div class="node-title">
      <span class="node-name"> {{ selectedNode.name }}</span>
      <div class="flex gap-20">
        <el-tooltip content="事件配置" placement="bottom" :show-after="300">
          <span class="cursor-pointer action-btn" @click="eventVisible = true">
            <Icon icon="codicon:symbol-event"></Icon>
          </span>
        </el-tooltip>
        <el-tooltip content="编辑 JSON" placement="bottom" :show-after="300">
          <span class="cursor-pointer action-btn" @click="previewJson">
            <Icon icon="si:json-duotone"></Icon>
          </span>
        </el-tooltip>
      </div>
    </div>

    <el-tabs v-model="activeTab" stretch class="property-tabs flex-1 min-h-0">
      <el-tab-pane label="属性" name="property">
        <el-collapse v-model="active" accordion>
          <el-collapse-item name="layout">
            <template #title>
              <span class="collapse-title"><Icon icon="solar:ruler-angled-bold" width="14" /> 布局属性</span>
            </template>
            <form-create :setters="layoutSetters" :formData="selectedNode"></form-create>
          </el-collapse-item>
          <el-collapse-item name="style">
            <template #title>
              <span class="collapse-title"><Icon icon="solar:palette-round-bold" width="14" /> 通用样式</span>
            </template>
            <form-create :setters="styleSetters" :formData="selectedNode"></form-create>
          </el-collapse-item>
          <el-collapse-item name="node">
            <template #title>
              <span class="collapse-title"><Icon icon="solar:widget-bold" width="14" /> 组件属性</span>
            </template>
            <form-create :setters="setters" :formData="selectedNode"></form-create>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="数据源" name="dataSource">
        <DataSource></DataSource>
      </el-tab-pane>
    </el-tabs>

    <!-- json预览 -->
    <el-drawer v-model="jsonVisible" :destroy-on-close="true" title="编辑JSON" size="800">
      <MonacoEditor v-model="jsonText" />
      <template #footer>
        <el-button @click="jsonVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </template>
    </el-drawer>
    <!-- 事件配置 -->
    <el-dialog destroy-on-close title="事件配置" width="800" v-model="eventVisible">
      <NodeEvents ref="nodeEventRef"></NodeEvents>
      <template #footer>
        <el-button @click="eventVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirmEvent">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.node-property {
  background: var(--bg-panel);

  .node-title {
    height: var(--panel-header-height);
    flex: none;
    display: flex;
    align-items: center;
    background-color: var(--bg-elevated);
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
    padding: 0 12px;
    justify-content: space-between;

    .node-name {
      font-size: 13px;
      color: var(--text-primary);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      transition: all 160ms ease;

      &:hover {
        color: var(--accent);
        background-color: var(--bg-hover);
      }
    }
  }

  :deep(.property-tabs) {
    min-height: 0;

    .el-tabs__header {
      margin: 0;
      padding: 0 8px;
    }

    .el-tabs__nav-wrap::after {
      background-color: var(--border-color);
    }

    .el-tabs__content {
      overflow: auto;
    }
  }

  :deep(.el-collapse) {
    --el-collapse-border-color: var(--border-color);
    --el-collapse-header-height: 42px;
    --el-collapse-header-bg-color: transparent;
    --el-collapse-header-text-color: var(--text-secondary);
    --el-collapse-header-font-size: 13px;
    --el-collapse-content-bg-color: transparent;
    --el-collapse-content-font-size: 13px;
    --el-collapse-content-text-color: var(--text-primary);
    border-top: 1px solid var(--el-collapse-border-color);
    border-bottom: 1px solid var(--el-collapse-border-color);

    .el-collapse-item__header {
      padding-left: 12px;
      font-weight: 600;

      .collapse-title {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--text-secondary);

        svg {
          color: var(--text-muted);
        }
      }

      &:hover {
        color: var(--text-primary);

        .collapse-title svg {
          color: var(--accent);
        }
      }
    }

    .el-collapse-item__arrow {
      margin-right: 10px;
    }
  }
}
</style>
