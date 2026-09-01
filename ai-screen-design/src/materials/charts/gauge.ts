import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const gaugeMaterial: MaterialDefinition = {
  name: '仪表盘',
  group: 'charts',
  icon: 'mdi:gauge',
  preview: '/materials/thumbs/gauge-chart.png',
  configSchema: createChartNodeSchema('gauge-chart'),
  setters: [
    {
      group: '标题',
      type: 'input',
      label: '标题',
      key: 'props.option.title.text',
    },
    {
      group: '标题',
      type: 'color',
      label: '标题色',
      key: 'props.option.title.textStyle.color',
    },
    {
      group: '标题',
      type: 'select',
      label: '对齐',
      key: 'props.option.title.left',
      props: {
        options: [
          { label: '左对齐', value: 'left' },
          { label: '居中', value: 'center' },
          { label: '右对齐', value: 'right' },
        ],
      },
    },
    {
      group: '标题',
      type: 'number',
      label: '标题字号',
      key: 'props.option.title.textStyle.fontSize',
      span: 12,
    },
    {
      group: '数值',
      type: 'number',
      label: '当前值',
      key: 'props.option.series.0.data.0.value',
    },
    {
      group: '数值',
      type: 'number',
      label: '最大值',
      key: 'props.option.series.0.max',
      span: 12,
    },
    {
      group: '数值',
      type: 'number',
      label: '数值字号',
      key: 'props.option.series.0.detail.fontSize',
      span: 12,
    },
    {
      group: '样式',
      type: 'color',
      label: '进度色',
      key: 'props.option.series.0.progress.itemStyle.color',
      span: 12,
    },
    {
      group: '样式',
      type: 'color',
      label: '轨道色',
      key: 'props.option.series.0.axisLine.lineStyle.color.0.1',
      span: 12,
    },
    {
      group: '样式',
      type: 'color',
      label: '数值色',
      key: 'props.option.series.0.detail.color',
      span: 12,
    },
    {
      group: '样式',
      type: 'number',
      label: '环宽',
      key: 'props.option.series.0.progress.width',
      span: 12,
    },
    {
      group: '样式',
      type: 'checkbox',
      label: '指针显示',
      key: 'props.option.series.0.pointer.show',
      span: 12,
    },
  ],
  schema: {
    type: 'gauge-chart',
    name: '仪表盘',
    layout: {
      x: 0,
      y: 0,
      width: 320,
      height: 240,
    },
    props: {
      option: {
        title: {
          text: '完成率',
          top: 8,
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
          },
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
          {
            name: '完成率',
            type: 'gauge',
            min: 0,
            max: 100,
            startAngle: 220,
            endAngle: -40,
            radius: '88%',
            center: ['50%', '62%'],
            progress: {
              show: true,
              width: 14,
              itemStyle: {
                color: '#22d3ee',
              },
            },
            axisLine: {
              lineStyle: {
                width: 14,
                color: [[1, 'rgba(34, 211, 238, 0.15)']],
              },
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 26,
              color: '#22d3ee',
              offsetCenter: [0, '38%'],
              formatter: '{value}%',
            },
            data: [{ value: 68, name: '完成率' }],
          },
        ],
      },
    },
  },
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
}
