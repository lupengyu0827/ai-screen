<script setup lang="ts">
defineOptions({
  name: 'TitleBoxMaterial',
})

const props = defineProps(['schema'])

const p = computed(() => props.schema.props || {})
const color = computed(() => p.value.color || 'var(--accent)')
const titleColor = computed(() => p.value.titleColor || color.value)
const subTitleColor = computed(() => p.value.subTitleColor || 'var(--text-secondary)')
const fontSize = computed(() => p.value.fontSize || 28)
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
    <!-- 两侧装饰线 -->
    <div v-if="p.showDeco !== false" class="absolute left-0 right-0 top-1/2 flex items-center justify-center"
      :style="{ transform: 'translateY(-50%)' }">
      <span class="deco-line" :style="{ borderColor: color }"></span>
      <span class="deco-diamond" :style="{ background: color, boxShadow: `0 0 6px ${color}` }"></span>
      <span class="deco-line" :style="{ borderColor: color }"></span>
    </div>

    <!-- 标题主体 -->
    <div class="relative z-10 text-center px-8">
      <div class="font-bold whitespace-nowrap" :style="{
        color: titleColor,
        fontSize: fontSize + 'px',
        letterSpacing: '0.2em',
        textShadow: `0 0 12px ${color}66`,
      }">{{ p.title }}</div>
      <div v-if="p.subTitle" class="mt-6 opacity-80" :style="{
        color: subTitleColor,
        fontSize: Math.max(Math.round(fontSize * 0.42), 10) + 'px',
        letterSpacing: '0.18em',
      }">{{ p.subTitle }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.deco-line {
  width: 80px;
  border-top: 1px solid;
  opacity: 0.8;
}

.deco-diamond {
  width: 6px;
  height: 6px;
  margin: 0 8px;
  transform: rotate(45deg);
}
</style>
