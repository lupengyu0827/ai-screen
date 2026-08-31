export function debounce(fn, ms: number) {
  let timer
  return function (this, ...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function getValue<T>(target: T, key: string) {
  if (!key) return target
  const keys = key.split('.') // [a, b, c]

  let cur: any = target
  while (keys.length) {
    // 中间路径缺失时安全返回 undefined，避免抛错
    if (cur === undefined || cur === null) return undefined
    cur = cur[keys.shift()!]
  }

  return cur
}

export function setValue<T>(target: T, key: string, value: T) {
  const keys = key.split('.') // [a, b, c]
  const lastKey = keys.pop()!

  let cur: any = target
  for (const k of keys) {
    // 中间路径缺失时自动创建对象
    if (cur[k] === undefined || cur[k] === null) cur[k] = {}
    cur = cur[k]
  }

  cur[lastKey] = value
}

export function deepClone<T>(value: T): T {
  if (typeof value !== 'object' || value === null) return value
  return JSON.parse(JSON.stringify(value))
}
