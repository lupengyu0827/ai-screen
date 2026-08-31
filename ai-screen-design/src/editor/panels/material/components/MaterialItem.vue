<script setup lang="ts">
defineComponent({
  name: 'MaterialItem',
})

const props = defineProps(['material'])

function onStart(e: DragEvent) {
  e.dataTransfer?.setData('schema', JSON.stringify(props.material.schema))
}
</script>

<template>
  <div class="material-item" draggable="true" @dragstart="onStart">
    <div class="title">{{ material.name }}</div>
    <div class="icon">
      <Icon :icon="material.icon" width="64"></Icon>
    </div>
    <div class="drag-hint">拖拽到画布</div>
  </div>
</template>

<style scoped lang="scss">
.material-item {
  cursor: grab;
  background: var(--bg-elevated);
  height: 110px;
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

  .icon {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-secondary);
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

    .icon {
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
