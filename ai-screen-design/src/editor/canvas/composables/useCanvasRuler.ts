import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'

import { debounce } from '@/utils/index'
import { useReactiveTheme, mapCanvasBg } from '@/composables/useTheme'

export function useCanvasRuler({ moveableRef, canvasRootRef }) {
  const editorStore = useEditorStore()

  const { canvas } = storeToRefs(editorStore)

  const canvasWidth = computed(() => canvas.value.width)
  const canvasHeight = computed(() => canvas.value.height)

  const canvasStyle = computed(() => {
    return {
      width: canvasWidth.value + 'px',
      height: canvasHeight.value + 'px',
      // 默认背景跟随主题
      backgroundColor: mapCanvasBg(canvas.value.backgroundColor),
    }
  })

  const lines = ref({ h: [], v: [] })
  const rectWidth = ref(1000)
  const rectHeight = ref(1000)
  const scale = ref(1)

  // 刻度尺配色跟随主题
  const themeKey = useReactiveTheme()
  const palette = computed(() => {
    void themeKey.value
    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--accent').trim() || '#22d3ee'
    const accentRgb = css.getPropertyValue('--accent-rgb').trim() || '34, 211, 238'
    const border = css.getPropertyValue('--border-color').trim() || '#334151'
    return {
      bgColor: css.getPropertyValue('--bg-elevated').trim() || '#232e50',
      longfgColor: border,
      fontColor: css.getPropertyValue('--text-muted').trim() || '#64748b',
      fontShadowColor: accent,
      shadowColor: `rgba(${accentRgb}, 0.14)`,
      lineColor: css.getPropertyValue('--success').trim() || '#22c55e',
      lineType: 'solid',
      lockLineColor: css.getPropertyValue('--border-color-light').trim() || '#4b5563',
      borderColor: border,
      hoverBg: css.getPropertyValue('--bg-hover').trim() || '#111827',
      hoverColor: css.getPropertyValue('--text-primary').trim() || '#ffffff',
    }
  })

  const onRootResize = debounce((rect) => {
    rectWidth.value = rect.width
    rectHeight.value = rect.height
  }, 300)

  onMounted(() => {
    const { width, height } = canvasRootRef.value.getBoundingClientRect()
    console.log(width, height)
    rectWidth.value = width
    rectHeight.value = height

    const ob = new ResizeObserver((entries) => {
      const entry = entries[0]
      const rect = entry.contentRect
      onRootResize(rect)
    })
    ob.observe(canvasRootRef.value)

    onUnmounted(() => {
      ob.disconnect()
    })
  })

  function onZoomChange() {
    moveableRef.value.updateRect()
  }

  return {
    canvasWidth,
    canvasHeight,
    canvasStyle,
    rectWidth,
    rectHeight,
    lines,
    scale,
    palette,
    onZoomChange,
  }
}
