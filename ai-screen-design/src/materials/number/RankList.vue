<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'RankListMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

const labelKey = computed(() => props.schema.props.labelKey || 'name')
const valueKey = computed(() => props.schema.props.valueKey || 'value')

const list = computed(() => {
  const source = data.value ?? props.schema.props.data
  if (!Array.isArray(source)) return []

  return [...source]
    .map((item, index) => ({ ...item, _index: index }))
    .sort((a, b) => (b[valueKey.value] ?? 0) - (a[valueKey.value] ?? 0))
})

defineExpose({ refresh })
</script>

<template>
  <div
    class="flex flex-col w-full h-full gap-10 overflow-hidden"
    :style="{ color: schema.props.textColor || 'var(--text-primary)' }"
  >
    <div
      v-if="schema.props.title"
      class="flex-none text-[14px] font-bold text-[var(--text-primary)] pb-10"
    >
      {{ schema.props.title }}
    </div>
    <div
      v-for="(item, index) in list"
      :key="item._index"
      class="flex-1 min-h-0 flex items-center gap-8 px-8 rounded-[var(--radius-sm)] border-l-2 border-transparent"
      :style="{ background: 'rgba(35, 46, 80, 0.6)' }"
    >
      <span
        class="flex-none w-20 h-20 flex items-center justify-center text-[12px] font-bold rounded-[var(--radius-sm)]"
        :class="{
          'bg-[linear-gradient(135deg,#f59e0b,#fbbf24)] text-[#1a1206]': index === 0,
          'bg-[linear-gradient(135deg,#94a3b8,#cbd5e1)] text-[#1f2937]': index === 1,
          'bg-[linear-gradient(135deg,#b45309,#d97706)] text-[#fff7ed]': index === 2,
          'text-[var(--text-secondary)]': index >= 3,
        }"
        :style="index >= 3 ? { background: 'rgba(100, 116, 139, 0.3)' } : {}"
      >
        {{ index + 1 }}
      </span>
      <span class="flex-1 text-[13px] truncate">{{ item[labelKey] }}</span>
      <span class="flex-none text-[13px] font-bold text-[var(--accent)] num-font">
        {{ item[valueKey] }}
      </span>
    </div>
  </div>
</template>
