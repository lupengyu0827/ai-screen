<script setup lang="ts">
import { getPublishedPage } from '@/utils/publish';
import type { PageSchema } from '@/schema/page';

import ScreenRenderer from '@/components/ScreenRenderer/index.vue'

import { useRoute } from 'vue-router'

defineComponent({
  name: 'ScreenPage',
})

const route = useRoute()

let page: PageSchema
try {
  page = getPublishedPage(route.query.id as string)
} catch {
  // 未找到已发布页面（首次访问 / 数据被清空）时，提供空白默认页，避免预览白屏
  page = {
    canvas: { width: 1800, height: 1169, backgroundColor: 'var(--bg-base)' },
    nodes: [],
    dataSources: [],
  }
}
</script>

<template>
  <ScreenRenderer :page="page"></ScreenRenderer>
</template>

<style scoped lang="scss"></style>
