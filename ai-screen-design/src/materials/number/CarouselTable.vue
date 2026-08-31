<script setup lang="ts">
import { useDataSource } from '@/composables/useDataSource'

defineOptions({
  name: 'CarouselTableMaterial',
})

const props = defineProps(['schema'])

const dataId = computed(() => props.schema.dataId)
const { data, refresh } = useDataSource(dataId)

const columns = computed(() => props.schema.props.columns || [{ label: '名称', key: 'name' }, { label: '数值', key: 'value' }])
const rowHeight = computed(() => props.schema.props.rowHeight || 28)
const textColor = computed(() => props.schema.props.textColor || 'var(--text-primary)')
const headerBg = computed(() => props.schema.props.headerBg || 'rgba(35, 46, 80, 0.6)')
const rowBg = computed(() => props.schema.props.rowBg || 'rgba(15, 23, 42, 0.4)')
const showHeader = computed(() => props.schema.props.showHeader ?? true)
const interval = computed(() => props.schema.props.interval || 2)

const rows = computed(() => {
  const source = data.value ?? props.schema.props.data
  return Array.isArray(source) ? source : []
})

// 复制一份实现无缝滚动
const doubled = computed(() => [...rows.value, ...rows.value])

// 动画时长 = 行数 * 每行间隔
const animationDuration = computed(() => {
  const n = Math.max(rows.value.length, 1)
  return `${n * interval.value}s`
})

const contentHeight = computed(() => rowHeight.value * Math.max(rows.value.length, 1))

defineExpose({ refresh })
</script>

<template>
  <div class="carousel-table flex flex-col w-full h-full overflow-hidden" :style="{ color: textColor }">
    <!-- 表头 -->
    <div
      v-if="showHeader"
      class="flex-none flex items-center px-8"
      :style="{ height: rowHeight + 'px', background: headerBg }"
    >
      <span
        v-for="(col, ci) in columns"
        :key="ci"
        class="text-[12px] font-bold truncate"
        :class="ci === 0 ? 'text-left' : 'text-right'"
        :style="{ flex: `0 0 ${col.width || 50}%`, paddingLeft: ci === 0 ? '0' : '8px' }"
      >
        {{ col.label }}
      </span>
    </div>

    <!-- 滚动区域 -->
    <div class="flex-1 relative overflow-hidden">
      <div
        class="carousel-track absolute left-0 right-0 top-0"
        :style="{ animationDuration: animationDuration }"
      >
        <div
          v-for="(item, index) in doubled"
          :key="index"
          class="carousel-row flex items-center px-8"
          :style="{ height: rowHeight + 'px', background: index % 2 === 0 ? rowBg : 'transparent' }"
        >
          <span
            v-for="(col, ci) in columns"
            :key="ci"
            class="text-[12px] truncate"
            :class="ci === 0 ? 'text-left' : 'text-right font-bold'"
            :style="{ flex: `0 0 ${col.width || 50}%`, paddingLeft: ci === 0 ? '0' : '8px', color: ci === 0 ? textColor : 'var(--accent)' }"
          >
            {{ item[col.key] ?? '--' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel-track {
  animation-name: tableScroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.carousel-table:hover .carousel-track {
  animation-play-state: paused;
}

.carousel-row {
  transition: background 200ms;

  &:hover {
    background: rgba(var(--accent-rgb), 0.15);
  }
}

@keyframes tableScroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
