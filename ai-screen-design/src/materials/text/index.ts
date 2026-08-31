// 文本物料
import type { MaterialDefinition } from '@/schema/material'
import TextMaterial from './component.vue'
import Marquee from './Marquee.vue'
import Time from './Time.vue'
import { TextSchema, MarqueeSchema, TimeSchema } from './schema.js'

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

const marqueeMaterial: MaterialDefinition = {
  name: '跑马灯',
  icon: 'solar:routing-2-bold',
  group: 'info',
  configSchema: MarqueeSchema,
  setters: [
    {
      type: 'input',
      label: '滚动内容',
      key: 'props.content',
    },
    {
      type: 'number',
      label: '速度',
      key: 'props.speed',
      span: 12,
      props: {
        min: 10,
      },
    },
    {
      type: 'select',
      label: '方向',
      key: 'props.direction',
      span: 12,
      props: {
        options: [
          { label: '向左', value: 'left' },
          { label: '向右', value: 'right' },
        ],
      },
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
  ],
  schema: {
    type: 'marquee',
    name: '跑马灯',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 36,
    },
    style: {
      color: '#e2e8f0',
      fontSize: 16,
    },
    props: {
      content: '欢迎来到 AI 大屏，更多精彩数据持续更新中……',
      speed: 60,
      direction: 'left',
    },
  },
}

const timeMaterial: MaterialDefinition = {
  name: '时间',
  icon: 'solar:clock-circle-bold',
  group: 'info',
  configSchema: TimeSchema,
  setters: [
    {
      type: 'input',
      label: '时间格式',
      key: 'props.format',
    },
    {
      type: 'number',
      label: '刷新间隔',
      key: 'props.interval',
      span: 12,
      props: {
        min: 100,
      },
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
  ],
  schema: {
    type: 'time',
    name: '时间',
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 32,
    },
    style: {
      color: '#e2e8f0',
      fontSize: 20,
    },
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      interval: 1000,
    },
  },
}

export function install(register) {
  register(textMaterial, TextMaterial)
  register(marqueeMaterial, Marquee)
  register(timeMaterial, Time)
}
