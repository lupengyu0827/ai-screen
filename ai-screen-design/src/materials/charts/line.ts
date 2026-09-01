import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const lineMaterial: MaterialDefinition = {
  name: '折线图',
  group: 'charts',
  icon: 'mdi:chart-line',
  preview: '/materials/thumbs/line-chart.png',
  configSchema: createChartNodeSchema('line-chart'),
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
      group: '图例',
      type: 'checkbox',
      label: '图例显示',
      key: 'props.option.legend.show',
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
      group: '系列',
      type: 'color',
      label: '线颜色',
      key: 'props.option.series.0.lineStyle.color',
    },
    {
      group: '坐标轴',
      type: 'input',
      label: 'X字段',
      key: 'props.option.series.0.encode.x',
    },
    {
      group: '坐标轴',
      type: 'input',
      label: 'Y字段',
      key: 'props.option.series.0.encode.y',
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
      group: '标题',
      type: 'number',
      label: '标题字号',
      key: 'props.option.title.textStyle.fontSize',
      span: 12,
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
      label: '线宽',
      key: 'props.option.series.0.lineStyle.width',
      span: 12,
    },
    {
      group: '系列',
      type: 'checkbox',
      label: '平滑曲线',
      key: 'props.option.series.0.smooth',
      span: 12,
    },
    {
      group: '系列',
      type: 'checkbox',
      label: '显示数据点',
      key: 'props.option.series.0.symbolShow',
      span: 12,
    },
    {
      group: '坐标轴',
      type: 'color',
      label: '轴文字色',
      key: 'props.option.xAxis.axisLabel.color',
      span: 12,
    },
  ],
  schema: {
    type: 'line-chart',
    name: '折线图',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 260,
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
          text: '访问量趋势',
          top: 8,
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        dataset: {
          source: [
            { date: '周一', visits: 820 },
            { date: '周二', visits: 932 },
            { date: '周三', visits: 901 },
            { date: '周四', visits: 934 },
            { date: '周五', visits: 1290 },
            { date: '周六', visits: 1330 },
            { date: '周日', visits: 1320 },
          ],
        },
        grid: {
          top: 86,
          right: 24,
          bottom: 32,
          left: 48,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#64748b',
            },
          },
          axisLabel: {
            color: '#cbd5e1',
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#cbd5e1',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(148, 163, 184, 0.18)',
            },
          },
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            smooth: true,
            symbolSize: 8,
            encode: {
              x: 'date',
              y: 'visits',
            },
            lineStyle: {
              width: 3,
              color: '#38bdf8',
            },
            itemStyle: {
              color: '#38bdf8',
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
