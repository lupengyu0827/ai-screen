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
]

const STORAGE_KEY = 'screen-theme'

/** 应用主题到 html[data-theme] 并持久化 */
export function applyTheme(key: string) {
  document.documentElement.setAttribute('data-theme', key)
  localStorage.setItem(STORAGE_KEY, key)
}

/** 读取初始主题（含兜底） */
export function getInitialTheme(): string {
  if (typeof window === 'undefined') return 'deep-blue'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && THEMES.some((t) => t.key === saved)) return saved
  return 'deep-blue'
}
