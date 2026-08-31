<script setup lang="ts">
defineOptions({
  name: 'DividerMaterial',
})

const props = defineProps(['schema'])

const p = computed(() => props.schema.props || {})
const color = computed(() => p.value.color || 'var(--accent)')
const thickness = computed(() => p.value.thickness ?? 2)
const showLight = computed(() => p.value.showLight ?? true)
</script>

<template>
  <div class="divider flex h-full w-full items-center" style="gap: 10px">
    <div
      class="flex-1"
      :style="{
        height: thickness + 'px',
        background: `linear-gradient(90deg, transparent, ${color})`,
        boxShadow: showLight ? `0 0 8px ${color}` : 'none',
      }"
    ></div>
    <span
      v-if="p.title"
      class="flex-none px-10 text-x]"
      :style="{ color: p.titleColor || 'var(--text-secondary)' }"
    >
      {{ p.title }}
    </span>
    <div
      class="flex-1"
      :style="{
        height: thickness + 'px',
        background: `linear-gradient(90deg, ${color}, transparent)`,
        boxShadow: showLight ? `0 0 8px ${color}` : 'none',
      }"
    ></div>
  </div>
</template>
