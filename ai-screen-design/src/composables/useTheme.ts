/**
 * 多主题切换（deep-blue 深空蓝 / aurora 极光紫 / gold 暗夜金 / emerald 翡翠绿）
 * 主题变量定义见 src/styles/variable.scss
 */
export interface ThemeOption {
  key: string
  name: string
  /** 主题强调色，用于切换器色块展示 */
  accent: string
  /** 主题底色，用于切换器色块展示 */
  bg: string
}

export const THEMES: ThemeOption[] = [
  { key: 'deep-blue', name: '深空蓝', accent: '#22d3ee', bg: '#0d121b' },
  { key: 'aurora', name: '极光紫', accent: '#a78bfa', bg: '#0d091f' },
  { key: 'gold', name: '暗夜金', accent: '#f59e0b', bg: '#14100a' },
  { key: 'emerald', name: '翡翠绿', accent: '#34d399', bg: '#081210' },
  { key: 'light', name: '浅色', accent: '#0891b2', bg: '#f2f5fa' },
]

const STORAGE_KEY = 'screen-theme'

/** 应用主题到 html[data-theme] 并持久化；浅色主题同步移除 Element Plus 的 dark 类 */
export function applyTheme(key: string) {
  document.documentElement.setAttribute('data-theme', key)
  document.documentElement.classList.toggle('dark', key !== 'light')
  localStorage.setItem(STORAGE_KEY, key)
}

/** 读取初始主题（含兜底） */
export function getInitialTheme(): string {
  if (typeof window === 'undefined') return 'deep-blue'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && THEMES.some((t) => t.key === saved)) return saved
  return 'deep-blue'
}

/** 读取当前生效主题 key */
export function getCurrentThemeKey(): string {
  if (typeof document === 'undefined') return 'deep-blue'
  return document.documentElement.getAttribute('data-theme') || 'deep-blue'
}

/**
 * 响应式主题 key：监听 html[data-theme] 变化，
 * 供 ECharts 等 canvas 渲染的组件感知主题切换
 */
export function useReactiveTheme() {
  const key = ref(getCurrentThemeKey())
  let ob: MutationObserver | null = null

  onMounted(() => {
    ob = new MutationObserver(() => {
      key.value = getCurrentThemeKey()
    })
    ob.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
  })

  onBeforeUnmount(() => {
    ob?.disconnect()
  })

  return key
}

/* ===== 图表主题色板：默认主题(deep-blue)的青色系在渲染时替换为当前主题 ===== */
interface ThemeChartColors {
  accent: string
  accentRgb: string
  palette: string[]
}

const DEFAULT_CHART_KEY = 'deep-blue'
const CHART_THEME: Record<string, ThemeChartColors> = {
  'deep-blue': {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    palette: ['#22d3ee', '#38bdf8', '#818cf8', '#a78bfa', '#f472b6'],
  },
  aurora: {
    accent: '#a78bfa',
    accentRgb: '167, 139, 250',
    palette: ['#a78bfa', '#818cf8', '#60a5fa', '#34d399', '#f472b6'],
  },
  gold: {
    accent: '#f59e0b',
    accentRgb: '245, 158, 11',
    palette: ['#f59e0b', '#fb923c', '#fbbf24', '#a3e635', '#f59e0b'],
  },
  emerald: {
    accent: '#34d399',
    accentRgb: '52, 211, 153',
    palette: ['#34d399', '#2dd4bf', '#38bdf8', '#a3e635', '#fbbf24'],
  },
  light: {
    accent: '#0891b2',
    accentRgb: '8, 145, 178',
    palette: ['#0891b2', '#0ea5e9', '#6366f1', '#0d9488', '#d97706'],
  },
}

function walkString(obj: any, fn: (s: string) => string): any {
  if (Array.isArray(obj)) return obj.map((o) => walkString(o, fn))
  if (obj && typeof obj === 'object') {
    const out: Record<string, any> = {}
    Object.keys(obj).forEach((k) => {
      out[k] = walkString(obj[k], fn)
    })
    return out
  }
  if (typeof obj === 'string') return fn(obj)
  return obj
}

/**
 * 将 ECharts option 中的默认主题(青色系)颜色替换为当前主题色。
 * 不修改原对象，返回新对象；仅替换默认青色，用户自定义颜色保留。
 */
export function applyOptionTheme(option: Record<string, any>, themeKey?: string): Record<string, any> {
  const key = themeKey || getCurrentThemeKey()
  if (key === DEFAULT_CHART_KEY || !option) return option
  const cur = CHART_THEME[key] || CHART_THEME[DEFAULT_CHART_KEY]
  const def = CHART_THEME[DEFAULT_CHART_KEY]

  return walkString(option, (v) => {
    let s = v
    // 强调色 #22d3ee
    s = s.split(def.accent).join(cur.accent)
    // rgba(34, 211, 238, x) → rgba(当前rgb, x)，兼容有无空格
    s = s.replace(/rgba\(34,\s*211,\s*238/g, `rgba(${cur.accentRgb}`)
    // 系列色板映射
    def.palette.forEach((c, i) => {
      s = s.split(c).join(cur.palette[i] || cur.palette[0])
    })
    return s
  })
}

/** 默认主题的画布背景色（deep-blue 的 --bg-base） */
const DEFAULT_CANVAS_BG = '#0d121b'

/**
 * 画布背景色映射：默认主题背景固定为 var(--bg-base)，
 * 使画布背景跟随当前主题变化；自定义颜色原样保留
 */
export function mapCanvasBg(color?: string): string {
  if (!color) return 'var(--bg-base)'
  if (color === DEFAULT_CANVAS_BG || color === 'var(--bg-base)') return 'var(--bg-base)'
  return color
}
