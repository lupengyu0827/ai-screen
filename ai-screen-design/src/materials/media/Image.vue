<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'ImageMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

const src = computed(() => {
  const s = data.value ?? props.schema.props.src
  return typeof s === 'string' && s ? s : ''
})

const imgStyle = computed(() => ({
  objectFit: props.schema.props.fit || 'cover',
}))

defineExpose({ refresh })
</script>

<template>
  <div
    class="relative w-full h-full overflow-hidden"
    :style="{ borderRadius: (schema.props.radius || 0) + 'px' }"
  >
    <img v-if="src" :src="src" class="w-full h-full" :style="imgStyle" draggable="false" />
    <div v-else class="flex flex-col items-center justify-center w-full h-full gap-10 text-[var(--text-muted)]">
      <Icon icon="solar:gallery-bold" width="40"></Icon>
      <span class="text-[12px]">图片</span>
    </div>
  </div>
</template>
