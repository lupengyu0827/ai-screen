<!-- 属性面板 -->
<script setup lang="ts">
import CanvasProperty from './components/CanvasProperty.vue';
import NodeProperty from './components/NodeProperty.vue';

import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

defineComponent({
  name: 'PropertyPanel',
})

const editorStore = useEditorStore()

const { selectedNode } = storeToRefs(editorStore)
</script>

<template>
  <div>
    <NodeProperty v-if="selectedNode"></NodeProperty>
    <CanvasProperty v-else></CanvasProperty>
  </div>
</template>

<style scoped lang="scss"></style>
