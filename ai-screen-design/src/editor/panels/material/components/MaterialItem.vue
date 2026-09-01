<script setup lang="ts">
import { getMaterialComponent } from '@/materials'

defineComponent({
  name: 'MaterialItem',
})

const props = defineProps(['material'])

/** 该物料对应的渲染组件（统一渲染真实迷你预览，所见即所得） */
const comp = computed(() => getMaterialComponent(props.material.schema.type))

/** 预览区按物料原始宽高比保持比例，避免变形 */
const ratio = computed(() => {
  const l = props.material.schema.layout || {}
  const w = l.width || 320
  const h = l.height || 200
  return h / w
})

function onStart(e: DragEvent) {
  e.dataTransfer?.setData('schema', JSON.stringify(props.material.schema))
}
</script>

<template>
  <div class="material-item" draggable="true" @dragstart="onStart">
    <div class="title">{{ material.name }}</div>
    <div class="preview" :style="{ paddingBottom: (ratio * 100).toFixed(1) + '%' }">
      <div class="preview-inner">
        <!-- 渲染真实迷你预览，所见即所得 -->
        <component :is="comp" :schema="material.schema" />
      </div>
    </div>
    <div class="drag-hint">拖拽到画布</div>
  </div>
</template>

<style scoped lang="scss">
.material-item {
  cursor: grab;
  background: var(--bg-elevated);
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all 200ms ease-in-out;

  .title {
    height: 22px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .preview {
    position: relative;
    width: 100%;
    margin-top: 4px;
    flex: none;

    .preview-inner {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      color: var(--text-secondary);
    }
  }

  .drag-hint {
    height: 0;
    overflow: hidden;
    font-size: 10px;
    color: var(--accent);
    text-align: center;
    transition: height 200ms ease;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--border-color-active);
    box-shadow: var(--shadow-card);
    background: var(--bg-hover);

    .preview-inner {
      color: var(--accent);
    }

    .drag-hint {
      height: 14px;
    }
  }

  &:active {
    cursor: grabbing;
  }
}
</style>
