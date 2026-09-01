<script setup lang="ts">
import type { MaterialSchema } from '@/schema/material'

import { init, registerMap, type EChartsType } from 'echarts'

import { useDataSource } from '@/composables/useDataSource'
import { applyOptionTheme, useReactiveTheme } from '@/composables/useTheme'

defineOptions({
  name: 'MapChartMaterial',
})

const props = defineProps<{ schema: MaterialSchema }>()

const chartRef = useTemplateRef<HTMLElement>('chartRef')

let chart: EChartsType

const dataId = computed(() => props.schema.dataId)
const { data, loading, refresh } = useDataSource(dataId)

const themeKey = useReactiveTheme()

// 地图系列数据（name + value）
const mapData = computed(() => {
  const _option = applyOptionTheme(props.schema.props.option || {}, themeKey.value) || {}
  const dataset = _option.dataset?.source
  const seriesData = (Array.isArray(dataset) ? dataset : []).map((item: any) => ({
    name: item.name ?? item.channel ?? item.area,
    value: item.value,
  }))
  return seriesData
})

const baseOption = computed(() => {
  const _option = applyOptionTheme(props.schema.props.option || {}, themeKey.value) || {}
  return _option
})

function buildOption() {
  const _option = baseOption.value
  const series = (_option.series || [{}])[0] || {}
  return {
    ..._option,
    series: [
      {
        ...series,
        type: 'map',
        data: mapData.value,
      },
    ],
  }
}

watch(
  mapData,
  () => {
    if (chart) chart.setOption(buildOption())
  },
  { deep: true },
)

onMounted(async () => {
  try {
    // 注册中国地图（public/map/china.json）
    const res = await fetch('/map/china.json')
    const geoJson = await res.json()
    registerMap('china', geoJson)

    chart = init(chartRef.value)
    chart.setOption(buildOption())

    const observer = new ResizeObserver(() => {
      chart.resize()
    })
    observer.observe(chartRef.value)
    onBeforeUnmount(() => {
      observer.disconnect()
      chart.dispose()
    })
  } catch (e) {
    console.error('地图组件初始化失败:', e)
  }
})

defineExpose({
  refresh,
})
</script>

<template>
  <div v-loading="loading" class="chart-material w-full h-full" ref="chartRef" :style="schema.style">
    {{ schema.props.content }}
  </div>
</template>

<style lang="scss" scoped></style>
