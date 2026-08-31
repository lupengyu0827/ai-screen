<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'RingProgressMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

const p = computed(() => props.schema.props || {})
const max = computed(() => p.value.max ?? 100)
const decimals = computed(() => p.value.decimals ?? 0)
const strokeWidth = computed(() => p.value.strokeWidth ?? 12)
const color = computed(() => p.value.color || 'var(--accent)')
const trackColor = computed(() => p.value.trackColor || 'rgba(var(--accent-rgb), 0.12)')
const showText = computed(() => p.value.showText ?? true)
const textColor = computed(() => p.value.textColor || 'var(--text-primary)')

const value = computed(() => {
  const raw = data.value ?? p.value.value ?? 0
  const first = Array.isArray(raw) ? raw[0] : raw
  const num =
    typeof first === 'object' && first !== null
      ? Number(first.value ?? first)
      : Number(first)
  return Number.isNaN(num) ? 0 : num
})

const percent = computed(() =>
  Math.min(100, Math.max(0, (value.value / max.value) * 100)),
)

// SVG 坐标系：viewBox 200x200，圆心 (100,100)，半径 78
const CENTER = 100
const RADIUS = 78
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const dashOffset = computed(() => CIRCUMFERENCE * (1 - percent.value / 100))
const fontSize = computed(() => (props.schema.style?.fontSize || 26) + 'px')

defineExpose({ refresh })
</script>

<template>
  <div
    class="ring-progress relative flex h-full w-full items-center justify-center"
    :style="schema.style"
  >
    <svg :viewBox="`0 0 ${CENTER * 2} ${CENTER * 2}`" class="h-full w-full">
      <!-- 轨道 -->
      <circle
        :cx="CENTER"
        :cy="CENTER"
        :r="RADIUS"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
      />
      <!-- 进度环 -->
      <circle
        :cx="CENTER"
        :cy="CENTER"
        :r="RADIUS"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 100 100)"
        class="transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>
    <div
      v-if="showText"
      class="num-font absolute inset-0 flex items-center justify-center font-bold"
      :style="{ color: textColor, fontSize }"
    >
      {{ percent.toFixed(decimals) }}%
    </div>
  </div>
</template>
