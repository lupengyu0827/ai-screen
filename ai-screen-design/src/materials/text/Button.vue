<script setup lang="ts">
defineOptions({
  name: 'ButtonMaterial',
})

const props = defineProps(['schema'])

const p = computed(() => props.schema.props || {})

const TYPE_MAP = {
  primary: { background: 'var(--accent)', color: '#08121a' },
  success: { background: 'var(--success)', color: '#052e22' },
  warning: { background: 'var(--warning)', color: '#2b1a00' },
  danger: { background: 'var(--danger)', color: '#2d0711' },
  default: { background: 'var(--bg-elevated)', color: 'var(--text-primary)' },
}

const btnStyle = computed(() => {
  const type = p.value.type || 'primary'
  const t = TYPE_MAP[type] || TYPE_MAP.primary
  return {
    background: t.background,
    color: t.color,
    fontSize: (props.schema.style?.fontSize || 14) + 'px',
    borderRadius: (p.value.borderRadius ?? 6) + 'px',
    border:
      type === 'default' ? '1px solid var(--border-color-light)' : 'none',
  }
})
</script>

<template>
  <button
    class="h-full w-full cursor-pointer select-none border-none font-medium shadow-[var(--shadow-card)] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
    :style="btnStyle"
  >
    {{ p.text || '按钮' }}
  </button>
</template>
