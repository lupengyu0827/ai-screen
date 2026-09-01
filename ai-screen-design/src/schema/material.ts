import type { ZodType } from 'zod'

interface Layout {
  x: number
  y: number
  width: number
  height: number
  // 缩放比例（默认 1）
  scaleX?: number
  scaleY?: number
}

export interface MaterialEvent {
  // 事件类型 click
  type: string
  // 事件名称
  name: string
  // new Function(code)事件触发时执行的函数 console.log()
  code: string
  // 事件标题
  title?: string

  // 根据code 生成的函数 用于组件相互调用
  handler?: Function
}

export interface MaterialSchema {
  // dsl数据
  type: string
  name: string
  locked?: boolean
  // 隐藏/显示（默认显示）
  visible?: boolean
  id: string
  layout: Layout
  style?: Record<string, any>
  props: Record<string, any>
  dataId?: string
  events?: MaterialEvent[]
  // 组合标识：同 groupId 的节点作为一个整体移动
  groupId?: string
}

export interface SettersSchema {
  key: string
  type: string
  label: string
  [key: string]: any
}

interface EventOption {
  label: string
  value: string
}

export interface MaterialDefinition {
  // 物料元数据
  name: string
  group: string
  icon: string
  configSchema: ZodType
  setters: SettersSchema[]
  eventOptions?: EventOption[]
  schema: Omit<MaterialSchema, 'id'> // 物料的dsl数据，id由系统生成故而剔除
}
