<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

import ScreenRenderer from '@/components/ScreenRenderer/index.vue'

defineComponent({
  name: 'ScreenPreview',
})

const editorStore = useEditorStore()
const { page } = storeToRefs(editorStore)

</script>

<template>
  <ScreenRenderer :page="page"></ScreenRenderer>
</template>
