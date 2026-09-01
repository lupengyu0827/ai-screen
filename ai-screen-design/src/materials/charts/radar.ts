import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const radarMaterial: MaterialDefinition = {
  name: '雷达图',
  group: 'charts',
  icon: 'mdi:radar',
  preview: '/materials/thumbs/radar-chart.png',
  configSchema: createChartNodeSchema('radar-chart'),
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
      group: '图例',
      type: 'checkbox',
      label: '图例显示',
      key: 'props.option.legend.show',
    },
    {
      group: '图例',
      type: 'number',
      label: '图例字号',
      key: 'props.option.legend.textStyle.fontSize',
      span: 12,
    },
    {
      group: '系列',
      type: 'color',
      label: '线条色',
      key: 'props.option.series.0.lineStyle.color',
    },
    {
      group: '系列',
      type: 'color',
      label: '填充色',
      key: 'props.option.series.0.areaStyle.color',
    },
    {
      group: '系列',
      type: 'number',
      label: '线宽',
      key: 'props.option.series.0.lineStyle.width',
      span: 12,
    },
    {
      group: '系列',
      type: 'number',
      label: '符号大小',
      key: 'props.option.series.0.symbolSize',
      span: 12,
    },
    {
      group: '雷达',
      type: 'input',
      label: '雷达半径',
      key: 'props.option.radar.radius',
    },
    {
      group: '雷达',
      type: 'color',
      label: '指标文字色',
      key: 'props.option.radar.axisName.color',
    },
  ],
  schema: {
    type: 'radar-chart',
    name: '雷达图',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 280,
    },
    props: {
      option: {
        legend: {
          top: 38,
          left: 'center',
          itemWidth: 12,
          itemHeight: 8,
          show: true,
          textStyle: {
            color: '#cbd5e1',
          },
        },
        title: {
          text: '能力评估',
          top: 8,
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'item',
        },
        radar: {
          indicator: [
            { name: '销售', max: 100 },
            { name: '管理', max: 100 },
            { name: '技术', max: 100 },
            { name: '客服', max: 100 },
            { name: '研发', max: 100 },
          ],
          radius: '62%',
          axisName: {
            color: '#cbd5e1',
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(148, 163, 184, 0.35)',
            },
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(34, 211, 238, 0.04)', 'rgba(34, 211, 238, 0.1)'],
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(148, 163, 184, 0.4)',
            },
          },
        },
        series: [
          {
            name: '能力模型',
            type: 'radar',
            symbolSize: 6,
            data: [{ value: [82, 70, 90, 76, 88], name: '能力模型' }],
            lineStyle: {
              color: '#22d3ee',
              width: 2,
            },
            itemStyle: {
              color: '#22d3ee',
            },
            areaStyle: {
              color: 'rgba(34, 211, 238, 0.25)',
            },
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
