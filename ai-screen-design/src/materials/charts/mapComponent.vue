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

// 地图名称 → 数据文件映射（public/map/*.json）
const MAP_SOURCES: Record<string, string> = {
  china: '/map/china.json',
  world: '/map/world.json',
}

// 已注册的地图集合（避免重复注册）
const registeredMaps = new Set<string>()

/** 当前地图名称（geo.map），默认 china */
const mapName = computed(() => {
  const _option = applyOptionTheme(props.schema.props.option || {}, themeKey.value) || {}
  return _option.geo?.map || 'china'
})

async function loadAndRegister(name: string) {
  if (registeredMaps.has(name)) return
  const url = MAP_SOURCES[name] || MAP_SOURCES.china
  const res = await fetch(url)
  const geoJson = await res.json()
  registerMap(name, geoJson)
  registeredMaps.add(name)
}

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

/** 刷新图表：延迟到下一宏任务，避免 setOption 在 ECharts 渲染主进程中调用 */
function refreshChart() {
  if (!chart) return
  setTimeout(() => {
    if (chart) chart.setOption(buildOption())
  }, 0)
}

// 地图数据 / 地图类型变化：重新注册 + 更新（合并监听，避免同 tick 多次 setOption）
watch(
  () => [mapName.value, mapData.value],
  async ([name]) => {
    try {
      await loadAndRegister(name)
      refreshChart()
    } catch (e) {
      console.error('地图更新失败:', e)
    }
  },
)

onMounted(async () => {
  try {
    await loadAndRegister(mapName.value)

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
