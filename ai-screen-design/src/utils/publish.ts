import type { PageSchema } from '@/schema/page'
import { genId } from '@/utils/id'

const SCREEN_PUBLISH = 'screen-publish'

/**
 * 存储结构
 * {
 *  id: value
 * }
 */
export function publishPage(page: PageSchema) {
  let value: string | Record<string, PageSchema> = localStorage.getItem(SCREEN_PUBLISH)

  if (value) {
    value = JSON.parse(value)
  } else {
    value = {}
  }

  // 如果已存在直接用
  const id = page.id || genId()
  value[id] = page
  page.id = id

  localStorage.setItem(SCREEN_PUBLISH, JSON.stringify(value))
  // TODO: 发布到服务器

  return id
}

export function getPublishedPage(id: string) {
  const value = localStorage.getItem(SCREEN_PUBLISH)

  const map = JSON.parse(value || '{}')

  const page = map[id]
  if (!page) {
    throw new Error('数据库为查到id为' + id + '的数据')
  }
  return map[id]
}
