// 数字物料
import type { MaterialDefinition } from '@/schema/material'
import Flop from './Flop.vue'
import Progress from './Progress.vue'
import RankList from './RankList.vue'
import RingProgress from './RingProgress.vue'
import CarouselTable from './CarouselTable.vue'
import { FlopSchema, ProgressSchema, RankListSchema, RingProgressSchema, CarouselTableSchema } from './schema.js'

const numberFlopMaterial: MaterialDefinition = {
  name: '数字翻牌器',
  icon: 'mdi:numeric',
  group: 'number',
  configSchema: FlopSchema,
  setters: [
    {
      type: 'number',
      label: '数值',
      key: 'props.value',
    },
    {
      type: 'input',
      label: '前缀',
      key: 'props.prefix',
      span: 12,
    },
    {
      type: 'input',
      label: '后缀',
      key: 'props.suffix',
      span: 12,
    },
    {
      type: 'number',
      label: '小数位',
      key: 'props.decimals',
      span: 12,
    },
    {
      type: 'number',
      label: '动画时长',
      key: 'props.duration',
      span: 12,
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
    type: 'number-flop',
    name: '数字翻牌器',
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 80,
    },
    style: {
      color: '#22d3ee',
      fontSize: 40,
    },
    props: {
      value: 1024,
      prefix: '',
      suffix: '',
      decimals: 0,
      duration: 1000,
    },
  },
}

const progressMaterial: MaterialDefinition = {
  name: '进度条',
  icon: 'mdi:progress-check',
  group: 'number',
  configSchema: ProgressSchema,
  setters: [
    {
      type: 'number',
      label: '进度值',
      key: 'props.value',
    },
    {
      type: 'number',
      label: '最大值',
      key: 'props.max',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '显示文字',
      key: 'props.showText',
      span: 12,
    },
    {
      type: 'number',
      label: '条高度',
      key: 'props.strokeWidth',
      span: 12,
    },
    {
      type: 'color',
      label: '填充色',
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
    type: 'progress',
    name: '进度条',
    layout: {
      x: 0,
      y: 0,
      width: 320,
      height: 44,
    },
    props: {
      value: 72,
      max: 100,
      showText: true,
      strokeWidth: 10,
      color: 'linear-gradient(90deg, rgba(var(--accent-rgb), 0.4), var(--accent))',
    },
  },
}

const rankListMaterial: MaterialDefinition = {
  name: '排行榜',
  icon: 'mdi:format-list-numbered',
  group: 'number',
  configSchema: RankListSchema,
  setters: [
    {
      type: 'input',
      label: '标题',
      key: 'props.title',
    },
    {
      type: 'input',
      label: '名称字段',
      key: 'props.labelKey',
      span: 12,
    },
    {
      type: 'input',
      label: '数值字段',
      key: 'props.valueKey',
      span: 12,
    },
    {
      type: 'color',
      label: '文字颜色',
      key: 'props.textColor',
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
    type: 'rank-list',
    name: '排行榜',
    layout: {
      x: 0,
      y: 0,
      width: 320,
      height: 260,
    },
    props: {
      title: '销售排行',
      labelKey: 'name',
      valueKey: 'value',
      textColor: '#e2e8f0',
      data: [
        { name: '华东区', value: 860 },
        { name: '华南区', value: 720 },
        { name: '华北区', value: 540 },
        { name: '西南区', value: 420 },
        { name: '西北区', value: 300 },
      ],
    },
  },
}

const ringProgressMaterial: MaterialDefinition = {
  name: '环形进度',
  icon: 'mdi:chart-donut-variant',
  group: 'number',
  configSchema: RingProgressSchema,
  setters: [
    {
      type: 'number',
      label: '进度值',
      key: 'props.value',
    },
    {
      type: 'number',
      label: '最大值',
      key: 'props.max',
      span: 12,
    },
    {
      type: 'number',
      label: '小数位',
      key: 'props.decimals',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '显示文字',
      key: 'props.showText',
      span: 12,
    },
    {
      type: 'number',
      label: '环宽',
      key: 'props.strokeWidth',
      span: 12,
    },
    {
      type: 'color',
      label: '进度色',
      key: 'props.color',
      span: 12,
    },
    {
      type: 'color',
      label: '轨道色',
      key: 'props.trackColor',
      span: 12,
    },
    {
      type: 'color',
      label: '文字色',
      key: 'props.textColor',
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
    type: 'ring-progress',
    name: '环形进度',
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    },
    props: {
      value: 72,
      max: 100,
      decimals: 0,
      showText: true,
      strokeWidth: 12,
      color: 'var(--accent)',
      trackColor: 'rgba(var(--accent-rgb), 0.12)',
      textColor: 'var(--text-primary)',
    },
  },
}

const carouselTableMaterial: MaterialDefinition = {
  name: '轮播表格',
  icon: 'mdi:table-large',
  group: 'number',
  configSchema: CarouselTableSchema,
  setters: [
    {
      type: 'input',
      label: '标题',
      key: 'props.title',
    },
    {
      type: 'input',
      label: '列1名称',
      key: 'props.columns.0.label',
      span: 12,
    },
    {
      type: 'input',
      label: '列1字段',
      key: 'props.columns.0.key',
      span: 12,
    },
    {
      type: 'input',
      label: '列2名称',
      key: 'props.columns.1.label',
      span: 12,
    },
    {
      type: 'input',
      label: '列2字段',
      key: 'props.columns.1.key',
      span: 12,
    },
    {
      type: 'number',
      label: '行高',
      key: 'props.rowHeight',
      span: 12,
      props: {
        min: 20,
      },
    },
    {
      type: 'number',
      label: '滚动间隔',
      key: 'props.interval',
      span: 12,
      props: {
        min: 1,
        step: 0.5,
      },
    },
    {
      type: 'checkbox',
      label: '显示表头',
      key: 'props.showHeader',
      span: 12,
    },
    {
      type: 'color',
      label: '文字颜色',
      key: 'props.textColor',
      span: 12,
    },
    {
      type: 'color',
      label: '表头背景',
      key: 'props.headerBg',
      span: 12,
    },
    {
      type: 'color',
      label: '行背景',
      key: 'props.rowBg',
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
    type: 'carousel-table',
    name: '轮播表格',
    layout: {
      x: 0,
      y: 0,
      width: 360,
      height: 200,
    },
    props: {
      title: '',
      columns: [
        { label: '名称', key: 'name', width: 50 },
        { label: '数值', key: 'value', width: 50 },
      ],
      data: [
        { name: '搜索服务', value: 9821 },
        { name: '推荐服务', value: 8754 },
        { name: '消息服务', value: 7632 },
        { name: '存储服务', value: 6540 },
        { name: '计算服务', value: 5321 },
        { name: '网关服务', value: 4287 },
        { name: '日志服务', value: 3176 },
      ],
      rowHeight: 28,
      showHeader: true,
      headerBg: 'rgba(35, 46, 80, 0.6)',
      rowBg: 'rgba(15, 23, 42, 0.4)',
      textColor: '#e2e8f0',
      interval: 2,
    },
  },
}

export function install(register) {
  register(numberFlopMaterial, Flop)
  register(progressMaterial, Progress)
  register(rankListMaterial, RankList)
  register(ringProgressMaterial, RingProgress)
  register(carouselTableMaterial, CarouselTable)
}
