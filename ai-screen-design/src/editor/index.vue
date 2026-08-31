<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

import ToolbarLeft from '@/editor/toolbar/ToolbarLeft.vue'
import ToolbarRight from '@/editor/toolbar/ToolbarRight.vue'
import MaterialPanel from '@/editor/panels/material/index.vue'
import LayerPanel from '@/editor/panels/layer/index.vue'
import CanvasRoot from '@/editor/canvas/index.vue'
import Property from '@/editor/panels/property/index.vue'
import AiPanel from '@/editor/panels/ai/index.vue'

import { useRoute } from 'vue-router'
import { getPublishedPage } from '@/utils/publish';

defineComponent({
  name: 'ScreenEditor',
})

const route = useRoute()

const editorStore = useEditorStore()

const pageId = route.query.id
if (pageId) {
  // 如果有就去查询数据库
  const page = getPublishedPage(pageId as string)
  editorStore.setPage(page)
}

const { dataSources } = storeToRefs(editorStore)

provide('dataSources', dataSources)

const materialWidth = computed(() => (editorStore.panelVisible.material ? '260px' : 0))
const layerWidth = computed(() => (editorStore.panelVisible.layer ? '160px' : 0))
const propertyWidth = computed(() => (editorStore.panelVisible.property ? '360px' : 0))
const aiWidth = computed(() => (editorStore.panelVisible.ai ? '460px' : 0))
</script>
<template>
  <div class="editor h-screen select-none">
    <header class="h-56 header flex items-center px-20">
      <ToolbarLeft />
      <div class="flex-1 text-center">中间</div>
      <ToolbarRight />
    </header>
    <main class="h-[calc(100vh-56px)] flex">
      <!-- 物料区 -->
      <MaterialPanel class="material overflow-hidden transition-all" :style="{ width: materialWidth }" />
      <!-- 图层区 -->
      <LayerPanel class="layer overflow-hidden transition-all" :style="{ width: layerWidth }" />
      <!-- 画布 -->
      <CanvasRoot class="canvas flex-1" />
      <!-- 属性 -->
      <Property class="property overflow-hidden transition-all" :style="{ width: propertyWidth }" />
      <!-- ai -->
      <AiPanel class="ai overflow-hidden transition-all" :style="{ width: aiWidth }" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.editor {
  background-color: var(--background-color);

  .header {
    border-bottom: 1px solid var(--border-color);
  }

  .material,
  .layer {
    border-right: 1px solid var(--border-color);
  }

  .property {
    border-left: 1px solid var(--border-color);
  }

  .ai {
    border-left: 1px solid var(--border-color);
  }
}
</style>
