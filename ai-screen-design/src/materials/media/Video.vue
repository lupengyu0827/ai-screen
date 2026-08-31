<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'VideoMaterial',
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
    class="relative h-full w-full overflow-hidden"
    :style="{ borderRadius: (schema.props.radius || 0) + 'px' }"
  >
    <video
      v-if="src"
      :src="src"
      :autoplay="schema.props.autoplay"
      :loop="schema.props.loop"
      :muted="schema.props.muted"
      :controls="schema.props.controls"
      :poster="schema.props.poster || undefined"
      class="h-full w-full"
      :style="{ objectFit: schema.props.fit || 'cover' }"
      draggable="false"
    />
    <div
      v-else
      class="flex h-full w-full flex-col items-center justify-center gap-10 bg-[var(--bg-elevated)] text-[var(--text-muted)]"
    >
      <Icon icon="mingcute:video-fill" width="40" height="40" />
      <span class="text-x]">视频</span>
    </div>
  </div>
</template>
