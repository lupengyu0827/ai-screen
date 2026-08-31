// 装饰物料
import type { MaterialDefinition } from '@/schema/material'
import BorderBox from './BorderBox.vue'
import { BorderBoxSchema } from './schema.js'

const borderBoxMaterial: MaterialDefinition = {
  name: '边框装饰',
  icon: 'fluent-color:border-20',
  group: 'decorate',
  configSchema: BorderBoxSchema,
  setters: [
    {
      type: 'input',
      label: '标题',
      key: 'props.title',
    },
    {
      type: 'color',
      label: '边框颜色',
      key: 'props.color',
      span: 12,
    },
    {
      type: 'color',
      label: '标题颜色',
      key: 'props.titleColor',
      span: 12,
    },
    {
      type: 'number',
      label: '圆角',
      key: 'props.radius',
      span: 12,
    },
    {
      type: 'number',
      label: '背景透明度',
      key: 'props.bgOpacity',
      span: 12,
      props: {
        min: 0,
        max: 1,
        step: 0.05,
      },
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
    type: 'border-box',
    name: '边框装饰',
    layout: {
      x: 0,
      y: 0,
      width: 320,
      height: 200,
    },
    props: {
      title: '标题',
      color: '#22d3ee',
      titleColor: '#22d3ee',
      radius: 6,
      bgOpacity: 0.25,
    },
  },
}

export function install(register) {
  register(borderBoxMaterial, BorderBox)
}
