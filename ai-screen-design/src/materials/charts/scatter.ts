import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const scatterMaterial: MaterialDefinition = {
  name: '散点图',
  group: 'charts',
  icon: 'mdi:chart-scatter-plot',
  configSchema: createChartNodeSchema('scatter-chart'),
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
      type: 'number',
      label: '散点大小',
      key: 'props.option.series.0.symbolSize',
    },
    {
      group: '系列',
      type: 'select',
      label: '点形状',
      key: 'props.option.series.0.symbol',
      props: {
        options: [
          { label: '圆形', value: 'circle' },
          { label: '方形', value: 'rect' },
          { label: '菱形', value: 'diamond' },
          { label: '三角', value: 'triangle' },
        ],
      },
    },
    {
      group: '系列',
      type: 'color',
      label: '系列颜色',
      key: 'props.option.color.0',
    },
    {
      group: '绘图区',
      type: 'number',
      label: '上边距',
      key: 'props.option.grid.top',
      span: 12,
    },
    {
      group: '绘图区',
      type: 'number',
      label: '右边距',
      key: 'props.option.grid.right',
      span: 12,
    },
    {
      group: '绘图区',
      type: 'number',
      label: '下边距',
      key: 'props.option.grid.bottom',
      span: 12,
    },
    {
      group: '绘图区',
      type: 'number',
      label: '左边距',
      key: 'props.option.grid.left',
      span: 12,
    },
    {
      group: '坐标轴',
      type: 'input',
      label: 'X轴名称',
      key: 'props.option.xAxis.name',
      span: 12,
    },
    {
      group: '坐标轴',
      type: 'input',
      label: 'Y轴名称',
      key: 'props.option.yAxis.name',
      span: 12,
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
