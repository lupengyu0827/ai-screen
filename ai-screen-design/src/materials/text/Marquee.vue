<script setup lang="ts">
defineOptions({
  name: 'MarqueeMaterial',
})

const props = defineProps(['schema'])

const content = computed(() => props.schema.props.content || '')
const color = computed(() => props.schema.style?.color || 'var(--text-primary)')
const fontSize = computed(() => (props.schema.style?.fontSize || 16) + 'px')
const direction = computed(() => props.schema.props.direction || 'left')

/**
 * 根据内容长度与速度计算单次循环时长
 */
const duration = computed(() => {
  const speed = props.schema.props.speed || 60
  const textWidth = content.value.length * (props.schema.style?.fontSize || 16) + 80
  return Math.max(textWidth / speed, 4)
})
</script>

<template>
  <div
    class="w-full h-full overflow-hidden flex items-center"
    :style="{ color, fontSize }"
  >
    <div
      class="marquee-track whitespace-nowrap inline-flex will-change-transform"
      :class="direction"
      :style="{ animationDuration: duration + 's' }"
    >
      <span>{{ content }}</span>
      <span class="w-20"></span>
      <span>{{ content }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee-track {
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  &.left {
    animation-name: marquee-left;
  }

  &.right {
    animation-name: marquee-right;
  }
}

@keyframes marquee-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
