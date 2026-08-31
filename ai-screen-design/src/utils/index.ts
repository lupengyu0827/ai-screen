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

  while (keys.length) {
    const key = keys.shift()
    target = target[key]
  }

  return target
}

export function setValue<T>(target: T, key: string, value: T) {
  const keys = key.split('.') // [a, b, c]
  const lastKey = keys.pop()
  if (keys.length) {
    target = getValue(target, keys.join('.'))
  }

  target[lastKey] = value
}

export function deepClone<T>(value: T): T {
  if (typeof value !== 'object' || value === null) return value
  return JSON.parse(JSON.stringify(value))
}
