import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const roseMaterial: MaterialDefinition = {
  name: '南丁格尔玫瑰图',
  group: 'charts',
  icon: 'si:pie-chart-alt-2',
  configSchema: createChartNodeSchema('rose-chart'),
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
      group: '系列',
      type: 'select',
      label: '玫瑰模式',
      key: 'props.option.series.0.roseType',
      props: {
        options: [
          { label: '半径玫瑰', value: 'radius' },
          { label: '面积玫瑰', value: 'area' },
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
        placeholder: '如 20%',
      },
    },
    {
      group: '系列',
      type: 'input',
      label: '外径',
      key: 'props.option.series.0.radius.1',
      span: 12,
      props: {
        placeholder: '如 80%',
      },
    },
    {
      group: '系列',
      type: 'checkbox',
      label: '显示标签',
      key: 'props.option.series.0.label.show',
      span: 12,
    },
  ],
  schema: {
    type: 'rose-chart',
    name: '南丁格尔玫瑰图',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
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
          text: '销售渠道分析',
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
            { channel: '线上商城', value: 1200 },
            { channel: '实体门店', value: 900 },
            { channel: '合作分销', value: 640 },
            { channel: '直播带货', value: 480 },
            { channel: '海外市场', value: 320 },
          ],
        },
        series: [
          {
            name: '渠道',
            type: 'pie',
            roseType: 'radius',
            radius: ['20%', '80%'],
            center: ['50%', '62%'],
            itemStyle: {
              borderRadius: 4,
            },
            label: {
              color: '#e2e8f0',
              show: false,
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
    { label: '点击', value: 'click' },
    { label: '鼠标移入', value: 'mouseover' },
    { label: '鼠标移出', value: 'mouseout' },
    { label: '组件挂载时', value: 'vnodeMounted' },
  ],
}
