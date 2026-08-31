<script setup lang="ts">
defineOptions({
  name: 'DecorationMaterial',
})

const props = defineProps(['schema'])

const p = computed(() => props.schema.props || {})
const color = computed(() => p.value.color || 'var(--accent)')
const variant = computed(() => p.value.variant || 'line-1')
const duration = computed(() => p.value.duration ?? 3)
</script>

<template>
  <div class="decoration h-full w-full flex items-center justify-center overflow-hidden">
    <!-- 横线流光：单光点从左到右 -->
    <div v-if="variant === 'line-1'" class="w-full h-1.5 rounded-full relative" :style="{ background: `linear-gradient(90deg, transparent, ${color}33, transparent)`, boxShadow: `0 0 8px ${color}44` }">
      <span class="flow-dot absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" :style="{ background: color, boxShadow: `0 0 12px ${color}`, animationDuration: duration + 's' }"></span>
    </div>

    <!-- 横线双向流光：两道光束对向 -->
    <div v-else-if="variant === 'line-2'" class="w-full h-1 relative" :style="{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }">
      <span class="beam beam-a absolute top-0 h-full" :style="{ background: `linear-gradient(90deg, transparent, ${color})`, boxShadow: `0 0 10px ${color}`, animationDuration: duration + 's' }"></span>
      <span class="beam beam-b absolute top-0 h-full" :style="{ background: `linear-gradient(90deg, transparent, ${color})`, boxShadow: `0 0 10px ${color}`, animationDuration: duration + 's', animationDelay: (duration / 2) + 's' }"></span>
    </div>

    <!-- 点阵：一排流动点 -->
    <div v-else class="w-full flex items-center justify-around">
      <span v-for="i in 12" :key="i" class="dot-item w-1.5 h-1.5 rounded-full" :style="{ background: color, boxShadow: `0 0 6px ${color}`, animationDelay: (i * 0.1) + 's' }"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flow-dot {
  animation: flowRight linear infinite;
}

@keyframes flowRight {
  0% {
    left: -8px;
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    left: calc(100% + 4px);
    opacity: 0;
  }
}

.beam {
  width: 40%;
  border-radius: 2px;
  animation: beamMove linear infinite;
}

.beam-a {
  left: 0;
}

.beam-b {
  right: 0;
  animation-direction: reverse;
}

@keyframes beamMove {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translateX(60%);
    opacity: 0;
  }
}

.dot-item {
  animation: dotPulse 1.5s ease-in-out infinite;
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>
