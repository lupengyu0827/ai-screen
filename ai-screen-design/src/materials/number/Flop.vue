<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'NumberFlopMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

/**
 * 显示值：优先取绑定数据源的值，其次取 props.value
 */
const displayValue = computed(() => {
  const raw = data.value ?? props.schema.props.value
  return Number(raw) || 0
})

const shown = ref(0)
let rafId: number | null = null

function animate(to: number) {
  if (rafId !== null) cancelAnimationFrame(rafId)

  const from = shown.value
  const duration = props.schema.props.duration ?? 1000
  const startTime = performance.now()

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3)
    shown.value = from + (to - from) * eased

    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      rafId = null
    }
  }

  rafId = requestAnimationFrame(step)
}

watch(displayValue, (val) => animate(val), { immediate: true })

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

defineExpose({ refresh })
</script>

<template>
  <div
    class="flex w-full h-full items-center justify-center gap-10 font-bold leading-none"
    :style="{ color: schema.style?.color, fontSize: (schema.style?.fontSize || 32) + 'px' }"
  >
    <span v-if="schema.props.prefix" class="prefix opacity-85 font-medium">{{ schema.props.prefix }}</span>
    <span class="value num-font">{{ shown.toFixed(schema.props.decimals || 0) }}</span>
    <span v-if="schema.props.suffix" class="suffix opacity-85 font-medium">{{ schema.props.suffix }}</span>
  </div>
</template>

<style scoped lang="scss">
.prefix,
.suffix {
  font-size: 0.5em;
}

.value {
  text-shadow: 0 0 12px rgba(var(--accent-rgb), 0.35);
}
</style>
