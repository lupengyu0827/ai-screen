<script setup lang="ts">
defineOptions({
  name: 'TimeMaterial',
})

const props = defineProps(['schema'])

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

/**
 * 按格式占位符格式化时间
 * 支持：YYYY / YY / MM / DD / HH / mm / ss
 */
function formatDate(date: Date, fmt: string) {
  const map: Record<string, number> = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }

  return fmt.replace(/Y+|M+|D+|H+|m+|s+/g, (match) => {
    const key = match[0]
    const value = map[key] ?? 0
    return match.length === 1 ? String(value) : String(value).padStart(match.length, '0')
  })
}

const text = computed(() => formatDate(now.value, props.schema.props.format || 'YYYY-MM-DD HH:mm:ss'))

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, props.schema.props.interval || 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="flex w-full h-full items-center justify-center num-font whitespace-nowrap overflow-hidden"
    :style="{ color: schema.style?.color, fontSize: (schema.style?.fontSize || 20) + 'px' }"
  >
    {{ text }}
  </div>
</template>
