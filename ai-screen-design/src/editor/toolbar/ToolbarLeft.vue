<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useEditorStore } from '@/stores/editor'
import { useUndoRedo } from '@/composables/useUndoRedo';

defineComponent({
  name: 'ToolbarLeft',
})

const { panelVisible } = useEditorStore()

const { undo, redo, canUndo, canRedo } = useUndoRedo()
</script>

<template>
  <div class="toolbar-left flex gap-20">
    <el-tooltip content="物料面板" placement="bottom" :show-after="300">
      <span :class="{ active: panelVisible.material }" @click="panelVisible.material = !panelVisible.material">
        <Icon icon="fluent:panel-left-28-filled"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="属性面板" placement="bottom" :show-after="300">
      <span :class="{ active: panelVisible.property }" @click="panelVisible.property = !panelVisible.property">
        <Icon icon="fluent:panel-right-28-filled"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="图层面板" placement="bottom" :show-after="300">
      <span :class="{ active: panelVisible.layer }" @click="panelVisible.layer = !panelVisible.layer">
        <Icon icon="fluent:layer-20-filled"></Icon>
      </span>
    </el-tooltip>
    <span class="divider"></span>
    <el-tooltip content="撤销" placement="bottom" :show-after="300">
      <span @click="undo" :class="{ disabled: !canUndo }">
        <Icon icon="ic:baseline-undo"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="重做" placement="bottom" :show-after="300">
      <span @click="redo" :class="{ disabled: !canRedo }">
        <Icon icon="ic:baseline-redo"></Icon>
      </span>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.toolbar-left {
  align-items: center;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 4px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--text-secondary);
    transition: all 180ms ease;

    &:hover {
      border-color: var(--border-color-light);
      color: var(--text-primary);
      background-color: var(--bg-hover);
    }

    &.active {
      border-color: var(--accent);
      color: var(--accent);
      background-color: rgba(var(--accent-rgb), 0.12);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.35;
      pointer-events: none;
    }
  }

  .divider {
    width: 1px;
    height: 18px;
    background: var(--border-color);
    border: none;
    padding: 0;
    cursor: default;
    pointer-events: none;
  }
}
</style>
