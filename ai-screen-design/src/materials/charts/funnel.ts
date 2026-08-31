import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const funnelMaterial: MaterialDefinition = {
  name: '漏斗图',
  group: 'charts',
  icon: 'fluent-mdl2:funnel-chart',
  configSchema: createChartNodeSchema('funnel-chart'),
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
      type: 'select',
      label: '对齐',
      key: 'props.option.series.0.sort',
      props: {
        options: [
          { label: '降序', value: 'descending' },
          { label: '升序', value: 'ascending' },
        ],
      },
    },
    {
      type: 'color',
      label: '系列颜色',
      key: 'props.option.color.0',
    },
  ],
  schema: {
    type: 'funnel-chart',
    name: '漏斗图',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 320,
    },
    props: {
      option: {
        color: ['#22d3ee', '#38bdf8', '#818cf8', '#a78bfa', '#f472b6'],
        title: {
          text: '转化漏斗',
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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        series: [
          {
            name: '转化',
            type: 'funnel',
            left: '12%',
            top: 70,
            width: '76%',
            minSize: '20%',
            maxSize: '100%',
            sort: 'descending',
            gap: 3,
            label: {
              show: true,
              position: 'inside',
              formatter: '{b} : {c}',
              color: '#fff',
              fontSize: 12,
            },
            itemStyle: {
              borderColor: '#0d121b',
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 14,
                fontWeight: 700,
              },
            },
            data: [
              { name: '曝光', value: 1000 },
              { name: '点击', value: 720 },
              { name: '访问', value: 460 },
              { name: '咨询', value: 280 },
              { name: '成交', value: 160 },
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
