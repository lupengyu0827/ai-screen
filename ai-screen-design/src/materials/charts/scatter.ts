import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const scatterMaterial: MaterialDefinition = {
  name: '散点图',
  group: 'charts',
  icon: 'bx:scatter-chart',
  configSchema: createChartNodeSchema('scatter-chart'),
  setters: [
    {
      type: 'input',
      label: '标题',
      key: 'props.option.title.text',
    },
    {
      type: 'color',
      label: '标题色',
      key: 'props.option.title.textStyle.color',
    },
    {
      type: 'checkbox',
      label: '图例显示',
      key: 'props.option.legend.show',
    },
    {
      type: 'number',
      label: '散点大小',
      key: 'props.option.series.0.symbolSize',
    },
    {
      type: 'color',
      label: '系列颜色',
      key: 'props.option.color.0',
    },
  ],
  schema: {
    type: 'scatter-chart',
    name: '散点图',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 280,
    },
    props: {
      option: {
        color: ['#22d3ee'],
        title: {
          text: '访问量分布',
          top: 8,
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
          },
        },
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          top: 72,
          right: 30,
          bottom: 30,
          left: 50,
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name: 'uv',
          axisLabel: {
            color: '#94a3b8',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(148, 163, 184, 0.18)',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'pv',
          axisLabel: {
            color: '#94a3b8',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(148, 163, 184, 0.18)',
            },
          },
        },
        series: [
          {
            name: '访问样本',
            type: 'scatter',
            symbolSize: 10,
            itemStyle: {
              opacity: 0.8,
            },
            data: [
              [10, 82],
              [12, 89],
              [15, 74],
              [20, 98],
              [25, 88],
              [30, 110],
              [32, 96],
              [40, 132],
              [45, 121],
              [50, 158],
              [55, 142],
              [60, 175],
              [68, 165],
              [75, 198],
              [80, 182],
            ],
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
