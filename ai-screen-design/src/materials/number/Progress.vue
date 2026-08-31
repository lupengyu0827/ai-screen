<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'ProgressMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

const percent = computed(() => {
  const raw = data.value ?? props.schema.props.value
  const max = props.schema.props.max || 100
  return Math.min(Math.max((Number(raw) || 0) / max * 100, 0), 100)
})

const barStyle = computed(() => ({
  width: percent.value + '%',
  background:
    props.schema.props.color ||
    'linear-gradient(90deg, rgba(34, 211, 238, 0.4), #22d3ee)',
}))

defineExpose({ refresh })
</script>

<template>
  <div class="flex w-full h-full items-center justify-center gap-10" :class="{ 'px-10': schema.props.showText }">
    <div
      class="relative flex-1 overflow-hidden rounded-full"
      :style="{ height: (schema.props.strokeWidth || 8) + 'px', background: 'rgba(100, 116, 139, 0.25)' }"
    >
      <div
        class="relative h-full rounded-full"
        :style="{ ...barStyle, transition: 'width 600ms ease' }"
      >
        <span class="absolute top-0 left-0 right-0 h-1/2 rounded-full bg-white/35"></span>
      </div>
    </div>
    <span v-if="schema.props.showText" class="flex-none text-[14px] font-bold text-[var(--accent)] num-font">
      {{ percent.toFixed(0) }}%
    </span>
  </div>
</template>
