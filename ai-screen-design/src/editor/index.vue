<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

import ToolbarLeft from '@/editor/toolbar/ToolbarLeft.vue'
import ToolbarRight from '@/editor/toolbar/ToolbarRight.vue'
import ThemeSwitch from '@/editor/toolbar/ThemeSwitch.vue'
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
    <header class="header flex items-center px-20">
      <ToolbarLeft />
      <div class="flex-1 brand text-center">
        <span class="brand-logo"></span>
        <span class="brand-name">AI 大屏设计器</span>
        <span class="brand-divider"></span>
        <span class="brand-slogan">智能驱动 · 可视化搭建</span>
      </div>
      <div class="flex items-center gap-8 pr-4 mr-20">
        <ThemeSwitch />
      </div>
      <ToolbarRight />
    </header>
    <main class="main flex">
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
  background-color: var(--bg-base);
  display: flex;
  flex-direction: column;

  .header {
    flex: none;
    height: var(--toolbar-height);
    border-bottom: 1px solid var(--border-color);
    background: linear-gradient(180deg, var(--bg-elevated), var(--bg-panel));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 10;

    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .brand-logo {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
        box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5);
      }

      .brand-name {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--text-primary);
      }

      .brand-divider {
        width: 1px;
        height: 14px;
        background: var(--border-color-light);
      }

      .brand-slogan {
        font-size: 12px;
        color: var(--text-muted);
      }
    }
  }

  .main {
    flex: 1;
    min-height: 0;
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
