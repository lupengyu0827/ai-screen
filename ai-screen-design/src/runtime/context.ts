import type { MaterialSchema } from '@/schema/material'
import type { PageSchema } from '@/schema/page'

import { setValue } from '@/utils'

interface RuntimeContext {
  /**
   * 获取节点
   * @param id
   * @returns  getNode('123') => {id: '1234' /....}
   */
  getNode: (id: string) => MaterialSchema

  /**
   * 修改节点属性
   * @param id
   * @param key
   * @param value
   * @returns
   * setAttribute('123', 'props.context', '你好啊‘’)
   */
  setAttribute: (id: string, key: string, value: any) => void

  /**
   * 更新节点的prop
   */
  setProp: (id: string, key: string, value: any) => void

  /**
   * 更新节点的style
   *
   */
  setStyle: (id: string, key: string, value: any) => void
  /**
   * 注册组件实例
   * @param instances
   * @returns
   */
  registerNodeInstance: (instances: Record<string, any>) => void

  /**
   * 触发 指定节点的组件实例方法
   * @param id
   * @param name
   * @returns trigger('123', 'click') 通知123组件点击
   */
  trigger: (id: string, name: string, ...args: any[]) => any

  /**
   * 通过dataId 刷新所有的数据
   * @param dataId
   * @returns
   */
  refreshNodesByDataId: (dataId: string, ...args) => void

  dispatch(id: string, eventName: string, payload: any, ...args: any[]): void
}

export function createRuntimeContext(page: Ref<PageSchema>): RuntimeContext {
  let instanceMap: Record<string, any> = {}

  const getNode: RuntimeContext['getNode'] = (id: string) => {
    return page.value.nodes.find((node) => node.id === id) as MaterialSchema
  }

  const setAttribute: RuntimeContext['setAttribute'] = (id: string, key: string, value: any) => {
    const node = getNode(id)
    if (!node) {
      console.warn(`没找到${id}节点`)
    }
    setValue(node, key, value)
  }

  /**
   * 更新节点的prop
   */
  const setProp: RuntimeContext['setProp'] = (id: string, key: string, value: any) => {
    setAttribute(id, `props.${key}`, value)
  }

  /**
   * 更新节点的style
   */
  const setStyle: RuntimeContext['setStyle'] = (id: string, key: string, value: any) => {
    setAttribute(id, `style.${key}`, value)
  }

  const registerNodeInstance: RuntimeContext['registerNodeInstance'] = (
    instances: Record<string, any>,
  ) => {
    instanceMap = instances
  }

  const trigger: RuntimeContext['trigger'] = (id: string, name: string, ...args: any[]) => {
    const instance = instanceMap[id]
    if (!instance) {
      console.warn(`没找到${id}组件实例`)
    }
    // 将日调用组件的getdata 有返回值 将返回值返回
    return instance[name]?.(...args)
  }

  const refreshNodesByDataId: RuntimeContext['refreshNodesByDataId'] = (
    dataId: string,
    ...args
  ) => {
    const nodes = page.value.nodes.filter((node) => node.dataId === dataId)
    nodes.forEach((node) => {
      trigger(node.id, 'refresh', ...args)
    })
  }

  const dispatch: RuntimeContext['dispatch'] = (
    id: string,
    eventName: string,
    payload: any,
    ...args: any[]
  ) => {
    const node = getNode(id)
    if (!node) {
      console.warn(`没找到${id}节点`)
    }
    const event = node.events?.find((event) => event.name === eventName)
    if (event) {
      event?.handler(payload)
    }
  }

  return {
    getNode,
    setAttribute,
    setProp,
    setStyle,
    registerNodeInstance,
    trigger,
    refreshNodesByDataId,
    dispatch,
  }
}
