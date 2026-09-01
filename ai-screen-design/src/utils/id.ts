/**
 * 生成唯一 ID。
 *
 * 优先使用 crypto.randomUUID（仅在 HTTPS / localhost 等安全上下文可用）；
 * 非安全上下文（如通过 IP + HTTP 直接部署访问）下 crypto.randomUUID 不存在，
 * 降级为基于 Math.random 生成的 RFC4122 v4 风格 UUID，保证功能可用。
 */
export function genId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // fallback：RFC4122 v4 格式
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
