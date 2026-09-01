// 装饰物料
import type { MaterialDefinition } from '@/schema/material'
import BorderBox from './BorderBox.vue'
import Divider from './Divider.vue'
import Decoration from './Decoration.vue'
import TitleBox from './TitleBox.vue'
import { createBorderBoxSchema, DividerSchema, createDecorationSchema, TitleSchema } from './schema.js'

/** 边框系列：款式 -> (名称, 图标, 默认宽高) */
const BORDER_VARIANTS: Record<string, [string, string, number, number]> = {
  '01': ['边框·科技直角', 'fluent-color:border-20', 320, 200],
  '02': ['边框·渐变描边', 'fluent:border-all-24-regular', 320, 200],
  '03': ['边框·圆弧四角', 'fluent:border-rounded-24-regular', 320, 200],
  '04': ['边框·数字科技', 'fluent:border-top-thick-24-regular', 320, 200],
  '05': ['边框·双层内嵌', 'fluent:border-inside-24-regular', 320, 200],
  '06': ['边框·侧边流光', 'fluent:border-left-right-24-regular', 320, 200],
  '07': ['边框·标题栏', 'fluent:border-top-bottom-24-regular', 360, 60],
  '08': ['边框·星点', 'fluent:star-four-points-24-regular', 320, 200],
  '09': ['边框·折线角标', 'fluent:border-style-24-regular', 320, 200],
  '10': ['边框·光晕', 'fluent:border-all-20-regular', 320, 200],
  '11': ['边框·内衬菱形', 'fluent:border-inside-24-regular', 320, 200],
  '12': ['边框·流光标题', 'fluent:border-top-thick-24-regular', 360, 60],
}

const borderMaterials: MaterialDefinition[] = Object.entries(BORDER_VARIANTS).map(([variant, meta]) => {
  const [name, icon, width, height] = meta
  const type = `border-box-${variant}`
  return {
    name,
    icon,
    group: 'decorate',
    configSchema: createBorderBoxSchema(type),
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
      { label: '点击', value: 'click' },
      { label: '鼠标移入', value: 'mouseover' },
      { label: '鼠标移出', value: 'mouseout' },
      { label: '组件挂载时', value: 'vnodeMounted' },
    ],
    schema: {
      type,
      name,
      layout: { x: 0, y: 0, width, height },
      props: {
        title: name.replace('边框·', ''),
        color: '#22d3ee',
        titleColor: '#22d3ee',
        radius: 6,
        bgOpacity: 0.25,
        variant,
      },
    },
  }
})

const dividerMaterial: MaterialDefinition = {
  name: '分割线',
  icon: 'fluent:divider-tall-20-filled',
  group: 'decorate',
  configSchema: DividerSchema,
  setters: [
    {
      type: 'input',
      label: '标题',
      key: 'props.title',
    },
    {
      type: 'color',
      label: '标题颜色',
      key: 'props.titleColor',
      span: 12,
    },
    {
      type: 'color',
      label: '线条颜色',
      key: 'props.color',
      span: 12,
    },
    {
      type: 'number',
      label: '线条厚度',
      key: 'props.thickness',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '发光效果',
      key: 'props.showLight',
      span: 12,
    },
  ],
  eventOptions: [
    { label: '点击', value: 'click' },
    { label: '鼠标移入', value: 'mouseover' },
    { label: '鼠标移出', value: 'mouseout' },
    { label: '组件挂载时', value: 'vnodeMounted' },
  ],
  schema: {
    type: 'divider',
    name: '分割线',
    layout: { x: 0, y: 0, width: 320, height: 24 },
    props: {
      title: '',
      titleColor: 'var(--text-secondary)',
      color: 'var(--accent)',
      thickness: 2,
      showLight: true,
    },
  },
}

/** 动态装饰线系列 */
const DECO_VARIANTS: Record<string, [string, string, number, number]> = {
  'line-1': ['装饰线·流光', 'fluent:line-flow-24-regular', 320, 12],
  'line-2': ['装饰线·双向', 'fluent:line-horizontal-3-20-regular', 320, 12],
  dot: ['装饰线·点阵', 'fluent:circle-small-20-regular', 320, 12],
}

const decorationMaterials: MaterialDefinition[] = Object.entries(DECO_VARIANTS).map(([variant, meta]) => {
  const [name, icon, width, height] = meta
  const type = `decoration-${variant}`
  return {
    name,
    icon,
    group: 'decorate',
    configSchema: createDecorationSchema(type),
    setters: [
      {
        type: 'color',
        label: '装饰颜色',
        key: 'props.color',
        span: 12,
      },
      {
        type: 'number',
        label: '动画周期',
        key: 'props.duration',
        span: 12,
        props: {
          min: 1,
          max: 10,
        },
      },
    ],
    eventOptions: [
      { label: '点击', value: 'click' },
      { label: '鼠标移入', value: 'mouseover' },
      { label: '鼠标移出', value: 'mouseout' },
    ],
    schema: {
      type,
      name,
      layout: { x: 0, y: 0, width, height },
      props: {
        color: '#22d3ee',
        variant,
        duration: 3,
      },
    },
  }
})

/** 大屏标题装饰 */
const titleMaterial: MaterialDefinition = {
  name: '标题',
  icon: 'fluent:text-header-1-20-filled',
  group: 'decorate',
  configSchema: TitleSchema,
  setters: [
    {
      type: 'input',
      label: '主标题',
      key: 'props.title',
    },
    {
      type: 'input',
      label: '副标题',
      key: 'props.subTitle',
    },
    {
      type: 'number',
      label: '标题字号',
      key: 'props.fontSize',
      span: 12,
      props: { min: 12, max: 80 },
    },
    {
      type: 'color',
      label: '装饰色',
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
      type: 'color',
      label: '副标题颜色',
      key: 'props.subTitleColor',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '两侧装饰线',
      key: 'props.showDeco',
      span: 12,
    },
  ],
  eventOptions: [
    { label: '点击', value: 'click' },
    { label: '鼠标移入', value: 'mouseover' },
    { label: '鼠标移出', value: 'mouseout' },
    { label: '组件挂载时', value: 'vnodeMounted' },
  ],
  schema: {
    type: 'title-box',
    name: '标题',
    layout: { x: 0, y: 0, width: 360, height: 80 },
    props: {
      title: '数据可视化大屏',
      subTitle: 'DATA VISUALIZATION',
      color: '#22d3ee',
      titleColor: '#e2f3ff',
      subTitleColor: 'rgba(203,213,225,0.75)',
      fontSize: 28,
      showDeco: true,
    },
  },
}

export function install(register) {
  borderMaterials.forEach((m) => register(m, BorderBox))
  register(dividerMaterial, Divider)
  decorationMaterials.forEach((m) => register(m, Decoration))
  register(titleMaterial, TitleBox)
}
