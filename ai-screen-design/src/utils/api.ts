/**
 * 后端 API 请求封装。
 *
 * 统一走相对路径 /api（开发环境由 Vite proxy 转发到 Next.js:3000，
 * 生产环境由 Nginx 反代到后端），前端代码无需关心后端地址。
 */

const BASE = '/api'

interface ApiResponse<T> {
  data?: T
  error?: string
  ok?: boolean
}

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  let res: Response
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('无法连接到服务器，请确认后端已启动')
  }

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null
  if (!res.ok) {
    throw new Error(json?.error || `请求失败 (${res.status})`)
  }
  return json ?? { data: undefined as T }
}

export const api = {
  /** 页面列表 */
  listPages: () => request<unknown[]>('/pages'),
  /** 页面详情 */
  getPage: (id: string) => request<unknown>(`/pages/${id}`),
  /** 新建页面 */
  createPage: (data: unknown) =>
    request<{ id: string }>('/pages', { method: 'POST', body: JSON.stringify(data) }),
  /** 更新页面 */
  updatePage: (id: string, data: unknown) =>
    request<{ id: string }>(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  /** 删除页面 */
  deletePage: (id: string) => request<{ ok: boolean }>(`/pages/${id}`, { method: 'DELETE' }),
}
