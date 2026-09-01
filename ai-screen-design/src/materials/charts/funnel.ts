import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const funnelMaterial: MaterialDefinition = {
  name: '漏斗图',
  group: 'charts',
  icon: 'mdi:chart-ppf',
  configSchema: createChartNodeSchema('funnel-chart'),
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
      type: 'select',
      label: '排序',
      key: 'props.option.series.0.sort',
      props: {
        options: [
          { label: '降序', value: 'descending' },
          { label: '升序', value: 'ascending' },
        ],
      },
    },
    {
      group: '系列',
      type: 'number',
      label: '层间距',
      key: 'props.option.series.0.gap',
      span: 12,
    },
    {
      group: '系列',
      type: 'input',
      label: '最小尺寸',
      key: 'props.option.series.0.minSize',
      span: 12,
      props: {
        placeholder: '如 20%',
      },
    },
    {
      group: '系列',
      type: 'checkbox',
      label: '标签显示',
      key: 'props.option.series.0.label.show',
      span: 12,
    },
    {
      group: '系列',
      type: 'color',
      label: '系列颜色',
      key: 'props.option.color.0',
      span: 12,
    },
    {
      group: '系列',
      type: 'color',
      label: '描边颜色',
      key: 'props.option.series.0.itemStyle.borderColor',
      span: 12,
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
