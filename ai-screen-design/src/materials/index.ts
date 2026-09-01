import type { MaterialDefinition } from '@/schema/material'
import { genId } from '@/utils/id'

const materials: MaterialDefinition[] = []

const componentMap = new Map()
const materialMap = new Map()
export function register(material: MaterialDefinition, component: Component) {
  materials.push(material)
  // 注册组件
  componentMap.set(material.schema.type, component)
  materialMap.set(material.schema.type, material)
}
// 批量注册物料
const materialModules = import.meta.glob('./*/index.ts', { eager: true })

Object.values(materialModules).forEach((module) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error

  module.install(register)
})

const groups = [
  {
    name: '图表',
    icon: 'solar:chart-bold',
    key: 'charts',
  },
  {
    name: '数字',
    icon: 'solar:hashtag-square-bold',
    key: 'number',
  },
  {
    name: '媒体',
    icon: 'solar:gallery-bold',
    key: 'media',
  },
  {
    name: '装饰',
    icon: 'solar:widget-4-bold',
    key: 'decorate',
  },
  {
    name: '基础',
    icon: 'ant-design:form-outlined',
    key: 'info',
  },
]

export function getMaterialsByGroup(groupKey: string) {
  return materials.filter((item) => item.group === groupKey)
}

export function getMaterialGroups() {
  return groups
}

export function getMaterialComponent(type: string) {
  return componentMap.get(type)
}

/**
 * 根据材质类型获取对应的设置器函数
 * @param type 材质类型字符串
 * @returns 返回与材质类型对应的设置器函数，如果找不到则返回undefined
 */
export function getMaterialSetters(type: string) {
  return materialMap.get(type)?.setters || [] // 从settersMap中获取指定类型的设置器函数
}

export function getMaterialEventOptions(type: string) {
  return materialMap.get(type)?.eventOptions || []
}

export function createNode(node) {
  return { ...node, id: genId() }
}

export function getMaterialsConfigSchema() {
  return materials
    .filter((material) => material.configSchema)
    .map((material) => ({
      name: material.name,
      type: material.schema.type,
      configSchema: material.configSchema.toJSONSchema(),
    }))
}
