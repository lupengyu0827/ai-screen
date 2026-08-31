<script setup lang="ts">
defineOptions({
  name: 'IconMaterial',
})

const props = defineProps(['schema'])

const icon = computed(() => props.schema.props.icon || 'mdi:star-four-points')
const size = computed(() => props.schema.props.size || 32)
const color = computed(() => props.schema.props.color || 'var(--accent)')
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <Icon :icon="icon" :width="size" :height="size" :color="color" />
  </div>
</template>
