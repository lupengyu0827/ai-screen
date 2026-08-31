// 文本物料
import type { MaterialDefinition } from '@/schema/material'
import TextMaterial from './component.vue'
import Marquee from './Marquee.vue'
import Time from './Time.vue'
import Button from './Button.vue'
import IconMaterial from './IconMaterial.vue'
import { TextSchema, MarqueeSchema, TimeSchema, ButtonSchema, IconSchema } from './schema.js'

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

const buttonMaterial: MaterialDefinition = {
  name: '按钮',
  icon: 'mingcute:button-fill',
  group: 'info',
  configSchema: ButtonSchema,
  setters: [
    {
      type: 'input',
      label: '按钮文字',
      key: 'props.text',
    },
    {
      type: 'select',
      label: '按钮主题',
      key: 'props.type',
      props: {
        options: [
          { label: '主色', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '中性', value: 'default' },
        ],
      },
    },
    {
      type: 'number',
      label: '圆角',
      key: 'props.borderRadius',
      span: 12,
    },
    {
      type: 'number',
      label: '字号',
      key: 'style.fontSize',
      span: 12,
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
    type: 'button',
    name: '按钮',
    layout: {
      x: 0,
      y: 0,
      width: 120,
      height: 40,
    },
    style: {
      fontSize: 14,
    },
    props: {
      text: '立即查看',
      type: 'primary',
      borderRadius: 6,
    },
  },
}

const iconMaterial: MaterialDefinition = {
  name: '图标',
  icon: 'mdi:star-four-points',
  group: 'info',
  configSchema: IconSchema,
  setters: [
    {
      type: 'input',
      label: '图标名称',
      key: 'props.icon',
    },
    {
      type: 'number',
      label: '尺寸',
      key: 'props.size',
      span: 12,
    },
    {
      type: 'color',
      label: '颜色',
      key: 'props.color',
      span: 12,
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
    type: 'icon',
    name: '图标',
    layout: {
      x: 0,
      y: 0,
      width: 48,
      height: 48,
    },
    props: {
      icon: 'mdi:star-four-points',
      size: 32,
      color: 'var(--accent)',
    },
  },
}

export function install(register) {
  register(textMaterial, TextMaterial)
  register(marqueeMaterial, Marquee)
  register(timeMaterial, Time)
  register(buttonMaterial, Button)
  register(iconMaterial, IconMaterial)
}
