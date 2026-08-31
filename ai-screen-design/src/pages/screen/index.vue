<script setup lang="ts">
import { getPublishedPage } from '@/utils/publish';

import ScreenRenderer from '@/components/ScreenRenderer/index.vue'

import { useRoute } from 'vue-router'

defineComponent({
  name: 'ScreenPage',
})

const route = useRoute()

const page = getPublishedPage(route.query.id as string)
</script>

<template>
  <ScreenRenderer :page="page"></ScreenRenderer>
</template>

<style scoped lang="scss"></style>
