<script setup lang="ts">
import { getPublishedPage } from '@/utils/publish';
import type { PageSchema } from '@/schema/page';

import ScreenRenderer from '@/components/ScreenRenderer/index.vue'

import { useRoute } from 'vue-router'

defineComponent({
  name: 'ScreenPage',
})

const route = useRoute()

const emptyPage: PageSchema = {
  canvas: { width: 1800, height: 1169, backgroundColor: 'var(--bg-base)' },
  nodes: [],
  dataSources: [],
}

// 从后端读取已发布页面；未找到（首次访问/数据被清空）时提供空白默认页，避免预览白屏
const page = ref<PageSchema>(emptyPage)

async function loadPage() {
  try {
    page.value = await getPublishedPage(route.query.id as string)
  } catch {
    page.value = emptyPage
  }
}
loadPage()
</script>

<template>
  <ScreenRenderer :page="page"></ScreenRenderer>
</template>

<style scoped lang="scss"></style>
