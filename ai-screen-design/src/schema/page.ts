import type { MaterialSchema } from './material'

export interface DataSourceSchema {
  /**
   * 数据类型
   * static => 静态数据
   * api => 接口数据
   */
  type: 'static' | 'api'
  id: string
  name: string
  data: any
  // 接口请求地址
  url?: string
  method?: 'get' | 'post'
  /**
   * 响应路径
   * data:{ a: { b: { c: 'd' } } }
   * responsePath: 'a.b.c'
   * => 'd'
   */
  responsePath?: string
  // 接口轮训时间
  interval?: number
  // 预设参数 会发送给后端
  params?: Record<string, any>
  /**
   * 字段映射：将返回数据的字段重命名
   * 如 { oldKey: 'newKey' }，数组每项 / 对象键会被重命名
   */
  fieldMap?: Record<string, string>
  /**
   * 数据转换函数（JS 箭头函数体），接收 data 返回处理后的数据
   * 如 `(data) => data.filter(item => item.value > 100)`
   */
  transform?: string
}

interface CanvasSchema {
  width: number
  height: number
  backgroundColor: string
}

export interface PageSchema {
  id?: string
  canvas: CanvasSchema
  nodes: MaterialSchema[]
  dataSources: DataSourceSchema[]
}
