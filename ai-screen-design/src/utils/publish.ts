import type { PageSchema } from '@/schema/page'
import { api } from '@/utils/api'

const SCREEN_PUBLISH = 'screen-publish'

/**
 * 保存大屏到后端；同时写一份到 localStorage 作为离线兜底（兼容历史数据）。
 * - 已有 id → PUT 更新
 * - 无 id → POST 创建（后端生成 id）
 */
export async function publishPage(page: PageSchema) {
  const { data } = page.id
    ? await api.updatePage(page.id, page)
    : await api.createPage(page)

  // 同步写 localStorage 兜底
  try {
    const raw = localStorage.getItem(SCREEN_PUBLISH)
    const map = raw ? JSON.parse(raw) : {}
    map[data.id] = page
    page.id = data.id
    localStorage.setItem(SCREEN_PUBLISH, JSON.stringify(map))
  } catch {
    // localStorage 不可用时忽略，不影响后端保存
  }

  return data.id
}

/**
 * 从后端读取大屏；未找到时回退 localStorage（兼容历史本地数据）。
 */
export async function getPublishedPage(id: string): Promise<PageSchema> {
  try {
    const { data } = await api.getPage(id)
    return data as PageSchema
  } catch (error) {
    // 后端没有 → 回退本地
    const raw = localStorage.getItem(SCREEN_PUBLISH)
    const map = raw ? JSON.parse(raw) : {}
    if (map[id]) return map[id] as PageSchema
    throw error
  }
}
