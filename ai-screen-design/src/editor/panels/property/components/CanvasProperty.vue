<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

defineComponent({
  name: 'CanvasProperty',
})

const editorStore = useEditorStore()

const { canvas } = storeToRefs(editorStore)
</script>

<template>
  <div class="canvas-property h-full flex flex-col">
    <div class="canvas-title">画布设置</div>
    <el-form class="p-20" size="small" label-width="60">
      <el-form-item label="宽度">
        <el-input-number v-model="canvas.width" :min="100" :max="7680"></el-input-number>
      </el-form-item>
      <el-form-item label="高度">
        <el-input-number v-model="canvas.height" :min="100" :max="4320"></el-input-number>
      </el-form-item>
      <el-form-item label="背景色">
        <el-color-picker v-model="canvas.backgroundColor"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.canvas-property {
  background: var(--bg-panel);

  .canvas-title {
    height: var(--panel-header-height);
    flex: none;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background-color: var(--bg-elevated);
    border-bottom: 1px solid var(--border-color);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  :deep(.el-form-item__label) {
    color: var(--text-secondary);
  }
}
</style>
