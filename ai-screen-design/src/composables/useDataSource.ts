import type { DataSourceSchema } from '@/schema/page'
import axios from 'axios'
import { getValue } from '@/utils'

export function useDataSource(dataId: Ref<string>) {
  const dataSources = inject<Ref<DataSourceSchema[]>>('dataSources')
  const loading = ref(false)
  const error = ref()

  let timer

  // 保存的source的数据
  const source = computed(() => {
    return dataSources.value.find((item) => item.id === dataId.value)
  })

  const data = ref()

  async function loadData(params?: Record<string, any>) {
    // 清除定时器 避免多次请求启动多个定时器
    clearTimeout(timer)
    if (!source.value) return
    if (source.value.type === 'api') {
      try {
        // 设置loading
        loading.value = true
        // 等一个promsie
        const res = await fetchData(source.value, params)

        data.value = res
      } catch (e) {
        error.value = e
      } finally {
        // 取消loading
        loading.value = false
        if (source.value.interval) {
          timer = setTimeout(() => {
            loadData()
          }, source.value.interval)
        }
      }
    } else {
      // 静态数据
      data.value = source.value.data
    }
  }

  onBeforeUnmount(() => {
    clearTimeout(timer)
  })

  // 只要source变化，就重新加载数据
  watch(
    source,
    () => {
      loadData()
    },
    { immediate: true },
  )

  return {
    data,
    loading,
    error,
    refresh: loadData,
  }
}
/**
 * 相同的url params method 请求复用
 * {
 *  'api/data?a=1': Promise
 * }
 */
const requestMap = {}

export async function fetchData(source: DataSourceSchema, data?: Record<string, any>) {
  const search = new URLSearchParams(location.search)
  // url参数转对象
  const params = Object.fromEntries(search.entries())
  console.log(params)
  const queryParams = {
    // 请求参数
    ...source.params,
    ...params,
    // 手动传递的参数优先级最高
    ...data,
  }
  const paramsKey = source.method === 'post' ? 'data' : 'params'

  const config = {
    url: source.url,
    method: source.method,
    [paramsKey]: queryParams,
  }

  const key = JSON.stringify(config)

  if (requestMap[key]) {
    console.log('复用请求')
    // 直接返回不请求
    return requestMap[key]
  }
  console.log('发起请求')
  const promise = axios
    .request(config)
    .then((res) => {
      return getValue(res.data, source.responsePath)
    })
    .finally(() => {
      // 请求完成删除
      delete requestMap[key]
    })
  requestMap[key] = promise

  return promise
}
