<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'IframeMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

const src = computed(() => {
  const s = data.value ?? props.schema.props.src
  return typeof s === 'string' && s ? s : ''
})

defineExpose({ refresh })
</script>

<template>
  <div
    class="relative h-full w-full overflow-hidden bg-[var(--bg-elevated)]"
    :style="{ borderRadius: (schema.props.radius || 0) + 'px' }"
  >
    <iframe
      v-if="src"
      :src="src"
      class="h-full w-full border-0"
      :style="{ pointerEvents: schema.props.interactive ? 'auto' : 'none' }"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      loading="lazy"
    ></iframe>
    <div
      v-else
      class="flex h-full w-full flex-col items-center justify-center gap-10 text-[var(--text-muted)]"
    >
      <Icon icon="material-symbols:iframe" width="40" height="40" />
      <span class="text-x]">嵌入网页</span>
    </div>
  </div>
</template>
