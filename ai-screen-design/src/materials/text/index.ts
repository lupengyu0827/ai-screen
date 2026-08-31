// 文本物料
import type { MaterialDefinition } from '@/schema/material'
import TextMaterial from './component.vue'
import { TextSchema } from './schema.js'

const textMaterial: MaterialDefinition = {
  name: '文本',
  icon: 'solar:text-bold',
  group: 'info',
  configSchema: TextSchema,
  setters: [
    {
      type: 'input',
      label: '文本内容',
      key: 'props.content',
    },
    {
      type: 'color',
      label: '颜色',
      key: 'style.color',
    },
    {
      type: 'number',
      label: '字号',
      key: 'style.fontSize',
    },
  ],
  eventOptions: [
    {
      label: '点击',
      value: 'click',
    },
    {
      label: '鼠标移入',
      value: 'mouseover',
    },
    {
      label: '鼠标移出',
      value: 'mouseout',
    },
    {
      label: '组件挂载时',
      value: 'vnodeMounted',
    },
  ],
  schema: {
    type: 'text',
    name: '文本',
    layout: {
      x: 0,
      y: 0,
      width: 100,
      height: 30,
    },
    style: {
      color: '#fff',
      fontSize: 24,
    },
    props: {
      content: 'Hello, World!',
    },
    events: [
      {
        type: 'click',
        name: 'fn',
        title: '点击事件',
        code: ``,
      },
    ],
  },
}

export function install(register) {
  return register(textMaterial, TextMaterial)
}
