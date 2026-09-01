<script setup lang="ts">
import type { MaterialSchema } from '@/schema/material'
import { useDataSource } from '@/composables/useDataSource'
import { applyOptionTheme, useReactiveTheme } from '@/composables/useTheme'

defineOptions({
  name: 'WordCloudMaterial',
})

const props = defineProps<{ schema: MaterialSchema }>()

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
const { data, loading, refresh } = useDataSource(computed(() => props.schema.dataId))

const themeKey = useReactiveTheme()

// 词云配置项（从 option 提取）
const option = computed(() => applyOptionTheme(props.schema.props.option || {}, themeKey.value) || {})

// 词条数据：优先数据源，其次 dataset.source
const words = computed(() => {
  const dataset = option.value.dataset?.source
  const defaultWords = Array.isArray(dataset) ? dataset : []
  const list = Array.isArray(data.value) && data.value.length ? data.value : defaultWords
  return list.map((item: any) => ({
    name: String(item.name ?? item.channel ?? ''),
    value: Number(item.value ?? 0),
  }))
})

// 简易词云布局：按 value 降序，螺旋/随机点放置 + 碰撞检测
function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const s = option.value.series?.[0] || {}
  const dpr = window.devicePixelRatio || 1
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  // 背景
  const bg = option.value.backgroundColor
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
  }

  const list = words.value
    .filter((it) => it.name)
    .sort((a, b) => b.value - a.value)
  if (!list.length) return

  const sizeRange = s.sizeRange || [14, 42]
  const rotationRange = s.rotationRange || [-45, 45]
  const rotationStep = s.rotationStep ?? 15
  const gridSize = s.gridSize || 8
  const fontWeight = s.textStyle?.fontWeight || 'bold'
  const fontFamily = s.textStyle?.fontFamily || 'sans-serif'
  const baseColor = s.textStyle?.color || '#22d3ee'
  const randomColor = !!s.randomColor

  const min = list[list.length - 1].value
  const max = list[0].value
  const span = Math.max(max - min, 1)

  const palette = ['#22d3ee', '#38bdf8', '#818cf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24']

  // 已占位置（网格法碰撞检测）
  const gridW = Math.ceil(w / gridSize)
  const gridH = Math.ceil(h / gridSize)
  const occupied: boolean[][] = Array.from({ length: gridW }, () => new Array(gridH).fill(false))

  function collides(x: number, y: number, tw: number, th: number) {
    if (x < 0 || y < 0 || x + tw > w || y + th > h) return true
    const gx0 = Math.max(0, Math.floor(x / gridSize))
    const gy0 = Math.max(0, Math.floor(y / gridSize))
    const gx1 = Math.min(gridW - 1, Math.ceil((x + tw) / gridSize))
    const gy1 = Math.min(gridH - 1, Math.ceil((y + th) / gridSize))
    for (let gx = gx0; gx <= gx1; gx++) {
      for (let gy = gy0; gy <= gy1; gy++) {
        if (occupied[gx][gy]) return true
      }
    }
    return false
  }

  function occupy(x: number, y: number, tw: number, th: number) {
    const gx0 = Math.max(0, Math.floor(x / gridSize))
    const gy0 = Math.max(0, Math.floor(y / gridSize))
    const gx1 = Math.min(gridW - 1, Math.ceil((x + tw) / gridSize))
    const gy1 = Math.min(gridH - 1, Math.ceil((y + th) / gridSize))
    for (let gx = gx0; gx <= gx1; gx++) {
      for (let gy = gy0; gy <= gy1; gy++) {
        occupied[gx][gy] = true
      }
    }
  }

  list.forEach((item, i) => {
    const fontSize = sizeRange[0] + ((item.value - min) / span) * (sizeRange[1] - sizeRange[0])
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
    const tw = ctx.measureText(item.name).width
    const th = fontSize

    // 旋转角度（从 rotationRange 按 step 取，i 轮换）
    const steps = Math.max(1, Math.floor((rotationRange[1] - rotationRange[0]) / rotationStep))
    const rot = (rotationRange[0] + (i % (steps + 1)) * rotationStep) * (Math.PI / 180)

    // 螺旋寻找位置
    let placed = false
    const cx = w / 2
    const cy = h / 2
    const maxR = Math.hypot(w, h) / 2
    for (let r = 0; r < maxR; r += gridSize) {
      const steps2 = Math.max(8, Math.floor((2 * Math.PI * r) / gridSize))
      for (let k = 0; k < steps2; k++) {
        const angle = (k / steps2) * 2 * Math.PI
        let px = cx + r * Math.cos(angle)
        let py = cy + r * Math.sin(angle)

        let dx = tw / 2
        let dy = th / 2
        if (rot) {
          dx = (Math.abs(Math.cos(rot)) * tw + Math.abs(Math.sin(rot)) * th) / 2
          dy = (Math.abs(Math.sin(rot)) * tw + Math.abs(Math.cos(rot)) * th) / 2
        }

        const x = px - dx
        const y = py - dy
        if (!collides(x, y, tw, th)) {
          ctx.save()
          ctx.translate(px, py)
          ctx.rotate(rot)
          ctx.fillStyle = randomColor ? palette[i % palette.length] : baseColor
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(item.name, 0, 0)
          ctx.restore()
          occupy(x, y, tw, th)
          placed = true
          break
        }
      }
      if (placed) break
    }
  })
}

const renderTask = ref<number>()

function scheduleRender() {
  cancelAnimationFrame(renderTask.value!)
  renderTask.value = requestAnimationFrame(render)
}

watch([words, option, themeKey], scheduleRender, { deep: true })

onMounted(() => {
  scheduleRender()
  const observer = new ResizeObserver(() => scheduleRender())
  observer.observe(canvasRef.value!)
  onBeforeUnmount(() => {
    observer.disconnect()
    cancelAnimationFrame(renderTask.value!)
  })
})

defineExpose({
  refresh,
})
</script>

<template>
  <div v-loading="loading" class="word-cloud-material w-full h-full">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.word-cloud-material {
  canvas {
    display: block;
  }
}
</style>
