<script setup lang="ts">
defineOptions({
  name: 'BorderBoxMaterial',
})

const props = defineProps(['schema'])

const radius = computed(() => props.schema.props.radius || 0)
const color = computed(() => props.schema.props.color || '#22d3ee')
const bgOpacity = computed(() => props.schema.props.bgOpacity ?? 0.25)
const titleColor = computed(() => props.schema.props.titleColor || color.value)

/**
 * 四角装饰：定位 + 边框方向
 */
const corners = [
  { key: 'tl', pos: 'top-0 left-0', border: 'border-t-2 border-l-2' },
  { key: 'tr', pos: 'top-0 right-0', border: 'border-t-2 border-r-2' },
  { key: 'bl', pos: 'bottom-0 left-0', border: 'border-b-2 border-l-2' },
  { key: 'br', pos: 'bottom-0 right-0', border: 'border-b-2 border-r-2' },
]

function cornerStyle(color: string) {
  return {
    width: '14px',
    height: '14px',
    borderColor: color,
    boxShadow: `0 0 6px ${color}`,
    zIndex: 2,
  }
}
</script>

<template>
  <div class="relative w-full h-full" :style="{ borderRadius: radius + 'px' }">
    <!-- 半透明背景 + 主边框 -->
    <div
      class="absolute inset-0"
      :style="{
        borderRadius: radius + 'px',
        background: `rgba(13, 18, 27, ${bgOpacity})`,
        border: `1px solid ${color}40`,
      }"
    ></div>

    <!-- 四角装饰 -->
    <span
      v-for="corner in corners"
      :key="corner.key"
      class="absolute"
      :class="[corner.pos, corner.border]"
      :style="cornerStyle(color)"
    ></span>

    <!-- 标题 -->
    <div
      v-if="schema.props.title"
      class="absolute top-0 left-16 h-32 flex items-center gap-6 z-10"
      :style="{ color: titleColor }"
    >
      <span class="w-8 h-8" :style="{ background: color, boxShadow: `0 0 6px ${color}` }"></span>
      <span class="text-[14px] font-bold tracking-wide">{{ schema.props.title }}</span>
    </div>

    <!-- 插槽内容 -->
    <div class="relative w-full h-full z-1"></div>
  </div>
</template>
