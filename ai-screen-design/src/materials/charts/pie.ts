import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const pieMaterial: MaterialDefinition = {
  name: '饼图',
  group: 'charts',
  icon: 'mdi:chart-pie',
  configSchema: createChartNodeSchema('pie-chart'),
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
      label: '主色',
      key: 'props.option.color.0',
    },
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
      type: 'input',
      label: '内径',
      key: 'props.option.series.0.radius.0',
      span: 12,
      props: {
        placeholder: '如 40%',
      },
    },
    {
      group: '系列',
      type: 'input',
      label: '外径',
      key: 'props.option.series.0.radius.1',
      span: 12,
      props: {
        placeholder: '如 70%',
      },
    },
    {
      group: '系列',
      type: 'checkbox',
      label: '显示标签',
      key: 'props.option.series.0.label.show',
      span: 12,
    },
    {
      group: '系列',
      type: 'color',
      label: '系列色2',
      key: 'props.option.color.1',
      span: 12,
    },
  ],
  schema: {
    type: 'pie-chart',
    name: '饼图',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 260,
    },
    props: {
      option: {
        color: ['#22d3ee', '#a78bfa', '#f59e0b', '#34d399', '#fb7185'],
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
          text: '访问来源占比',
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
        dataset: {
          source: [
            { channel: '搜索引擎', value: 1048 },
            { channel: '直接访问', value: 735 },
            { channel: '联盟广告', value: 484 },
            { channel: '视频广告', value: 300 },
          ],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '62%'],
            avoidLabelOverlap: true,
            label: {
              color: '#e2e8f0',
            },
            labelLine: {
              lineStyle: {
                color: '#94a3b8',
              },
            },
            encode: {
              itemName: 'channel',
              value: 'value',
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
