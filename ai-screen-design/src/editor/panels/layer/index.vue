<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'
import { useDraggable } from 'vue-draggable-plus'

defineComponent({
  name: 'LayerPanel',
})
const editorStore = useEditorStore()

const { nodes, selectedNodeIds } = storeToRefs(editorStore)

useDraggable('.layer-panel', nodes, { animation: 150, direction: 'horizontal' })
</script>

<template>
  <div class="h-full layer-root flex flex-col">
    <div class="layer-header">
      <span>图层</span>
      <span class="count">{{ nodes.length }}</span>
    </div>
    <div class="layer-panel overflow-auto">
      <div v-for="node in nodes" :key="node.id" :class="{ active: selectedNodeIds.includes(node.id), hidden: node.visible === false }"
        @click="editorStore.selectNode(node.id)">
        <span class="node-name">
          <Icon :icon="node.locked ? 'fluent:lock-16-filled' : 'fluent:list-bar-24-filled'"></Icon>
          {{ node.name }}
        </span>
        <span class="node-state" @click.stop="editorStore.toggleVisible(node)">
          <Icon :icon="node.visible === false ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"></Icon>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layer-root {
  background: var(--bg-panel);

  .layer-header {
    height: var(--panel-header-height);
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid var(--border-color);
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);

    .count {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      border-radius: 9px;
      background: var(--bg-elevated);
      color: var(--text-muted);
    }
  }

  .layer-panel {
    flex: 1;
    background: var(--bg-panel);
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: start;

    &>div {
      margin-top: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 0 10px;
      height: 30px;
      border: 1px solid var(--border-color);
      background: var(--bg-elevated);
      font-size: 12px;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      transition: all 160ms ease;

      .node-name {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .node-state {
        color: var(--text-muted);
      }

      &:hover {
        border-color: var(--border-color-light);
        background: var(--bg-hover);
      }

      &.active {
        background: linear-gradient(90deg, var(--bg-active), rgba(14, 138, 215, 0.4));
        border-color: #3fa9e3;
        color: #fff;
      }

      &.hidden {
        opacity: 0.45;
      }
    }
  }
}
</style>
