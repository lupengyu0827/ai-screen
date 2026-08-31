<script setup lang="ts">
import type { MaterialSchema } from '@/schema/material'

import { init, type EChartsType } from 'echarts'

import { useDataSource } from '@/composables/useDataSource'
import { applyOptionTheme, useReactiveTheme } from '@/composables/useTheme'

defineOptions({
  name: 'ChartMaterial',
})

const props = defineProps<{ schema: MaterialSchema }>()

/**
 * 物料状态来源
 * 1.编辑时的状态 => 编辑器再用的时候
 * 2.运行时的状态 => 渲染器再用的时候
 */

const chartRef = useTemplateRef<HTMLElement>('chartRef')

let chart: EChartsType

const dataId = computed(() => props.schema.dataId)

const { data, loading, refresh } = useDataSource(dataId)

const themeKey = useReactiveTheme()

const option = computed(() => {
  // 主题色替换（canvas 不支持 CSS 变量，此处把默认青色替换为当前主题色）
  const _option = applyOptionTheme(props.schema.props.option || {}, themeKey.value) || {}

  // 仅当图表配置了 dataset 时才重写数据源（雷达图/仪表盘等无 dataset 的图表保持原样）
  const hasDataset = !!(_option.dataset && _option.dataset.source)

  return {
    ..._option,
    ...(hasDataset
      ? {
          dataset: {
            ..._option.dataset,
            // 重写source 如果存在就使用，不存在就使用默认值
            source: data.value || _option.dataset.source,
          },
        }
      : {}),
  }
})

watch(
  option,
  (newValue) => {
    chart.setOption(newValue)
  },
  {
    deep: true
  }
)

onMounted(() => {
  chart = init(chartRef.value)
  chart.setOption(option.value)

  const observer = new ResizeObserver(() => {
    // dom更新后，echarts实例需要重新resize
    chart.resize()
  })

  observer.observe(chartRef.value)
  onBeforeUnmount(() => {
    observer.disconnect()
    chart.dispose()
  })
})

defineExpose({
  refresh,
})

</script>

<template>
  <!-- <div v-if="error">
    {{ error }}
  </div> -->
  <div v-loading="loading" class="chart-material w-full h-full" ref="chartRef" :style="schema.style">
    {{ schema.props.content }}
  </div>
</template>



<style lang="scss" scoped></style>
