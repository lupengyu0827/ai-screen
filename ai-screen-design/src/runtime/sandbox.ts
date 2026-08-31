/**
 * 在沙箱中运行代码
 * @param code
 * @param scope
 */
/**
 * 全局白名单，表示沙箱环境可以访问的全局属性
 */

const globalKeys = new Set(['console', 'Promise', 'setTimeout'])
export function runSandbox(code: string, scope: Record<string, any>) {
  const sandbox = new Proxy(scope, {
    has() {
      return true
    },
    get(target, key) {
      if (key === Symbol.unscopables) return
      if (Object.hasOwn(target, key)) {
        return target[key as string]
      }

      if (globalKeys.has(key as string)) {
        const value = globalThis[key]
        // 如果是函数，则绑定全局this 放置this丢失
        return typeof value === 'function' ? value.bind(globalThis) : value
      }
    },
  })

  const fn = new Function(
    'sandbox',
    `
      const asyncFn = async () => {
          with (sandbox) {
            ${code}
          }
        }
      asyncFn()
    `,
  )

  fn(sandbox)
}
