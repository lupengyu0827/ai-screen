<script setup lang="ts">
defineOptions({
  name: 'BorderBoxMaterial',
})

const props = defineProps(['schema'])

const p = computed(() => props.schema.props || {})
const radius = computed(() => p.value.radius || 0)
const color = computed(() => p.value.color || 'var(--accent)')
const bgOpacity = computed(() => p.value.bgOpacity ?? 0.25)
const titleColor = computed(() => p.value.titleColor || color.value)
const variant = computed(() => p.value.variant || '01')

const bgStyle = computed(() => ({
  borderRadius: radius.value + 'px',
  background: `rgba(13, 18, 27, ${bgOpacity.value})`,
  border: `1px solid ${color.value}40`,
}))

// 01 科技直角：四角 L 型
const cornersL = [
  { pos: 'top-0 left-0', border: 'border-t-2 border-l-2' },
  { pos: 'top-0 right-0', border: 'border-t-2 border-r-2' },
  { pos: 'bottom-0 left-0', border: 'border-b-2 border-l-2' },
  { pos: 'bottom-0 right-0', border: 'border-b-2 border-r-2' },
]
function cornerLStyle(c: string) {
  return { width: '16px', height: '16px', borderColor: c, boxShadow: `0 0 6px ${c}`, zIndex: 2 }
}

// 04 数字科技：粗 L 型 + 边中点方块
const cornersBold = [
  { pos: 'top-0 left-0', border: 'border-t-[3px] border-l-[3px]' },
  { pos: 'top-0 right-0', border: 'border-t-[3px] border-r-[3px]' },
  { pos: 'bottom-0 left-0', border: 'border-b-[3px] border-l-[3px]' },
  { pos: 'bottom-0 right-0', border: 'border-b-[3px] border-r-[3px]' },
]
function cornerBoldStyle(c: string) {
  return { width: '20px', height: '20px', borderColor: c, boxShadow: `0 0 8px ${c}`, zIndex: 2 }
}

// 08 星点边框：边中点发光点
const edgeDots = [
  { pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', size: '6px' },
  { pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', size: '6px' },
  { pos: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2', size: '6px' },
  { pos: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2', size: '6px' },
]
</script>

<template>
  <div class="relative w-full h-full" :style="{ borderRadius: radius + 'px' }">
    <!-- 通用半透明背景 -->
    <div class="absolute inset-0" :style="bgStyle"></div>

    <!-- 01 科技直角 -->
    <template v-if="variant === '01'">
      <span v-for="c in cornersL" :key="c.pos" class="absolute" :class="[c.pos, c.border]" :style="cornerLStyle(color)"></span>
      <div v-if="p.title" class="absolute top-0 left-16 h-32 flex items-center gap-6 z-10" :style="{ color: titleColor }">
        <span class="w-8 h-8" :style="{ background: color, boxShadow: `0 0 6px ${color}` }"></span>
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>

    <!-- 02 渐变描边：四边渐变 + 四角圆点 -->
    <template v-else-if="variant === '02'">
      <div class="absolute top-0 left-0 right-0 h-px" :style="{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px" :style="{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }"></div>
      <div class="absolute top-0 left-0 bottom-0 w-px" :style="{ background: `linear-gradient(180deg, transparent, ${color}, transparent)` }"></div>
      <div class="absolute top-0 right-0 bottom-0 w-px" :style="{ background: `linear-gradient(180deg, transparent, ${color}, transparent)` }"></div>
      <span v-for="c in cornersL" :key="c.pos" class="absolute" :class="c.pos" :style="{ width: '7px', height: '7px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, transform: c.pos.includes('left-0') ? '-translate-x-1/2 -translate-y-1/2' : 'translate-x-1/2 -translate-y-1/2', zIndex: 2 }"></span>
      <span v-for="c in cornersL.slice(2)" :key="'b'+c.pos" class="absolute" :class="c.pos" :style="{ width: '7px', height: '7px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, transform: c.pos.includes('left-0') ? '-translate-x-1/2 translate-y-1/2' : 'translate-x-1/2 translate-y-1/2', zIndex: 2 }"></span>
      <div v-if="p.title" class="absolute top-2 left-2 z-10" :style="{ color: titleColor }">
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>

    <!-- 03 圆弧四角 -->
    <template v-else-if="variant === '03'">
      <span v-for="c in cornersL" :key="c.pos" class="absolute" :class="[c.pos, c.border]" :style="{ ...cornerLStyle(color), borderRadius: '4px', width: '18px', height: '18px' }"></span>
      <div class="absolute top-1/2 -translate-y-1/2 left-0 w-6" :style="{ borderTop: `1px solid ${color}`, boxShadow: `0 0 4px ${color}` }"></div>
      <div class="absolute top-1/2 -translate-y-1/2 right-0 w-6" :style="{ borderTop: `1px solid ${color}`, boxShadow: `0 0 4px ${color}` }"></div>
      <div class="absolute left-1/2 -translate-x-1/2 top-0 h-6" :style="{ borderLeft: `1px solid ${color}`, boxShadow: `0 0 4px ${color}` }"></div>
      <div class="absolute left-1/2 -translate-x-1/2 bottom-0 h-6" :style="{ borderLeft: `1px solid ${color}`, boxShadow: `0 0 4px ${color}` }"></div>
      <div v-if="p.title" class="absolute top-2 left-1/2 -translate-x-1/2 z-10" :style="{ color: titleColor }">
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>

    <!-- 04 数字科技：粗 L + 边中点方块 -->
    <template v-else-if="variant === '04'">
      <span v-for="c in cornersBold" :key="c.pos" class="absolute" :class="[c.pos, c.border]" :style="cornerBoldStyle(color)"></span>
      <span v-for="d in edgeDots" :key="d.pos" class="absolute" :class="d.pos" :style="{ width: d.size, height: d.size, background: color, boxShadow: `0 0 6px ${color}`, zIndex: 2 }"></span>
      <div v-if="p.title" class="absolute top-3 left-16 flex items-center gap-6 z-10" :style="{ color: titleColor }">
        <span class="w-1.5 h-6" :style="{ background: color, boxShadow: `0 0 6px ${color}` }"></span>
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>

    <!-- 05 双层内嵌 -->
    <template v-else-if="variant === '05'">
      <div class="absolute inset-0" :style="{ borderRadius: radius + 'px', border: `1px solid ${color}33` }"></div>
      <div class="absolute" :style="{ top: '6px', left: '6px', right: '6px', bottom: '6px', borderRadius: (Math.max((radius||0)-4, 0)) + 'px', border: `1px solid ${color}66`, boxShadow: `0 0 6px ${color}22 inset` }"></div>
      <span v-for="c in cornersL" :key="c.pos" class="absolute" :class="[c.pos, c.border]" :style="{ width: '12px', height: '12px', borderColor: color, zIndex: 2 }"></span>
      <div v-if="p.title" class="absolute top-8 left-8 z-10" :style="{ color: titleColor }">
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>

    <!-- 06 侧边流光 -->
    <template v-else-if="variant === '06'">
      <div class="absolute top-0 left-0 bottom-0 w-px" :style="{ background: `linear-gradient(180deg, transparent, ${color}, transparent)`, boxShadow: `0 0 6px ${color}` }"></div>
      <div class="absolute top-0 right-0 bottom-0 w-px" :style="{ background: `linear-gradient(180deg, transparent, ${color}, transparent)`, boxShadow: `0 0 6px ${color}` }"></div>
      <div class="border-flow absolute top-0 left-0 bottom-0" :style="{ background: color, boxShadow: `0 0 10px ${color}` }"></div>
      <div class="border-flow border-flow-r absolute top-0 right-0 bottom-0" :style="{ background: color, boxShadow: `0 0 10px ${color}` }"></div>
      <div v-if="p.title" class="absolute top-2 left-1/2 -translate-x-1/2 z-10" :style="{ color: titleColor }">
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>

    <!-- 07 标题栏式 -->
    <template v-else-if="variant === '07'">
      <div class="absolute top-0 left-0 right-0 h-30 overflow-hidden" :style="{ borderBottom: `1px solid ${color}55`, background: `linear-gradient(90deg, ${color}22, ${color}55, ${color}22)` }"></div>
      <div v-if="p.title" class="absolute top-0 left-0 right-0 h-30 flex items-center gap-8 px-12 z-10" :style="{ color: titleColor }">
        <span class="w-10 h-10" :style="{ background: color, clipPath: 'polygon(0 0,100% 0,100% 100%)', boxShadow: `0 0 8px ${color}` }"></span>
        <span class="font-bold tracking-widest text-[13px]">{{ p.title }}</span>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-px" :style="{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }"></div>
      <span v-for="c in cornersBold" :key="c.pos" class="absolute" :class="[c.pos, c.border]" :style="cornerBoldStyle(color)"></span>
    </template>

    <!-- 08 星点边框：四角 L + 边中点发光点 -->
    <template v-else>
      <span v-for="c in cornersL" :key="c.pos" class="absolute" :class="[c.pos, c.border]" :style="cornerLStyle(color)"></span>
      <span v-for="d in edgeDots" :key="d.pos" class="absolute rounded-full" :class="d.pos" :style="{ width: d.size, height: d.size, background: color, boxShadow: `0 0 10px ${color}`, zIndex: 2 }"></span>
      <div v-if="p.title" class="absolute top-2 left-4 z-10" :style="{ color: titleColor }">
        <span class="font-bold tracking-wide text-[12px]">{{ p.title }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.border-flow {
  width: 3px;
  border-radius: 2px;
  animation: borderFlow 3s linear infinite;
}

.border-flow-r {
  animation-delay: 1.5s;
}

@keyframes borderFlow {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
