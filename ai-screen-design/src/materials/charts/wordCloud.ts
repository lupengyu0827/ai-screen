import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const wordCloudMaterial: MaterialDefinition = {
  name: '词云',
  group: 'charts',
  icon: 'mdi:cloud-outline',
  configSchema: createChartNodeSchema('word-cloud'),
  setters: [
    {
      group: '数据',
      type: 'input',
      label: '名称字段',
      key: 'props.option.series.0.encode.itemName',
    },
    {
      group: '数据',
      type: 'input',
      label: '数值字段',
      key: 'props.option.series.0.encode.value',
    },
    {
      group: '布局',
      type: 'select',
      label: '形状',
      key: 'props.option.series.0.shape',
      props: {
        options: [
          { label: '圆形', value: 'circle' },
          { label: '心形', value: 'cardioid' },
          { label: '菱形', value: 'diamond' },
          { label: '三角形', value: 'triangle' },
          { label: '五角星', value: 'star' },
          { label: '直角', value: 'rect' },
        ],
      },
    },
    {
      group: '布局',
      type: 'number',
      label: '网格大小',
      key: 'props.option.series.0.gridSize',
      span: 12,
      props: { min: 2, max: 30 },
    },
    {
      group: '布局',
      type: 'number',
      label: '最小字号',
      key: 'props.option.series.0.sizeRange.0',
      span: 12,
      props: { min: 8, max: 60 },
    },
    {
      group: '布局',
      type: 'number',
      label: '最大字号',
      key: 'props.option.series.0.sizeRange.1',
      span: 12,
      props: { min: 12, max: 120 },
    },
    {
      group: '布局',
      type: 'number',
      label: '旋转范围',
      key: 'props.option.series.0.rotationRange.0',
      span: 12,
    },
    {
      group: '布局',
      type: 'number',
      label: '旋转步长',
      key: 'props.option.series.0.rotationStep',
      span: 12,
      props: { min: 0, max: 90 },
    },
    {
      group: '样式',
      type: 'color',
      label: '词云颜色',
      key: 'props.option.series.0.textStyle.color',
      span: 12,
    },
    {
      group: '样式',
      type: 'select',
      label: '字体粗细',
      key: 'props.option.series.0.textStyle.fontWeight',
      span: 12,
      props: {
        options: [
          { label: '正常', value: 'normal' },
          { label: '加粗', value: 'bold' },
          { label: '细体', value: 'lighter' },
        ],
      },
    },
    {
      group: '样式',
      type: 'checkbox',
      label: '词云随机色',
      key: 'props.option.series.0.randomColor',
      span: 12,
    },
    {
      group: '样式',
      type: 'color',
      label: '背景色',
      key: 'props.option.backgroundColor',
      span: 12,
    },
  ],
  schema: {
    type: 'word-cloud',
    name: '词云',
    layout: {
      x: 0,
      y: 0,
      width: 420,
      height: 300,
    },
    props: {
      option: {
        backgroundColor: 'rgba(15,23,42,0.35)',
        tooltip: {
          trigger: 'item',
        },
        dataset: {
          source: [
            { name: '大屏', value: 100 },
            { name: '数据可视化', value: 90 },
            { name: '实时监控', value: 82 },
            { name: '智慧城市', value: 78 },
            { name: '物联网', value: 70 },
            { name: '人工智能', value: 66 },
            { name: '数字孪生', value: 60 },
            { name: '大数据', value: 55 },
            { name: '云计算', value: 48 },
            { name: '边缘计算', value: 40 },
            { name: '5G', value: 36 },
            { name: '可视化', value: 30 },
          ],
        },
        series: [
          {
            type: 'wordCloud',
            shape: 'circle',
            gridSize: 8,
            sizeRange: [14, 42],
            rotationRange: [-45, 45],
            rotationStep: 15,
            width: '100%',
            height: '100%',
            textStyle: {
              color: '#22d3ee',
              fontWeight: 'bold',
            },
            randomColor: false,
            encode: {
              itemName: 'name',
              value: 'value',
            },
          },
        ],
      },
    },
  },
  eventOptions: [
    { label: '点击', value: 'click' },
    { label: '组件挂载时', value: 'vnodeMounted' },
  ],
}
