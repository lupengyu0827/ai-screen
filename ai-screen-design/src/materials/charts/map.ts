import type { MaterialDefinition } from '@/schema/material.ts'
import { createChartNodeSchema } from './schema.js'

export const mapMaterial: MaterialDefinition = {
  name: '地图',
  group: 'charts',
  icon: 'mdi:map-outline',
  configSchema: createChartNodeSchema('map-chart'),
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
      group: '地图',
      type: 'color',
      label: '区域色',
      key: 'props.option.geo.itemStyle.areaColor',
      span: 12,
    },
    {
      group: '地图',
      type: 'color',
      label: '边界色',
      key: 'props.option.geo.itemStyle.borderColor',
      span: 12,
    },
    {
      group: '地图',
      type: 'number',
      label: '边界宽度',
      key: 'props.option.geo.itemStyle.borderWidth',
      span: 12,
      props: { min: 0, max: 10 },
    },
    {
      group: '地图',
      type: 'color',
      label: '高亮区域色',
      key: 'props.option.geo.emphasis.itemStyle.areaColor',
      span: 12,
    },
    {
      group: '地图',
      type: 'color',
      label: '高亮边界色',
      key: 'props.option.geo.emphasis.itemStyle.borderColor',
      span: 12,
    },
    {
      group: '地图',
      type: 'checkbox',
      label: '缩放平移',
      key: 'props.option.geo.roam',
      span: 12,
    },
    {
      group: '地图',
      type: 'checkbox',
      label: '显示标签',
      key: 'props.option.series.0.label.show',
      span: 12,
    },
    {
      group: '地图',
      type: 'select',
      label: '标签颜色',
      key: 'props.option.series.0.label.color',
      span: 12,
      props: {
        options: [
          { label: '白色', value: '#ffffff' },
          { label: '青色', value: '#22d3ee' },
          { label: '浅灰', value: '#cbd5e1' },
        ],
      },
    },
    {
      group: '地图',
      type: 'number',
      label: '标签字号',
      key: 'props.option.series.0.label.fontSize',
      span: 12,
      props: { min: 8, max: 24 },
    },
    {
      group: '图例',
      type: 'checkbox',
      label: '显示图例',
      key: 'props.option.visualMap.show',
      span: 12,
    },
    {
      group: '图例',
      type: 'number',
      label: '最小值',
      key: 'props.option.visualMap.min',
      span: 12,
    },
    {
      group: '图例',
      type: 'number',
      label: '最大值',
      key: 'props.option.visualMap.max',
      span: 12,
    },
    {
      group: '图例',
      type: 'input',
      label: '低值色',
      key: 'props.option.visualMap.inRange.color.0',
      span: 12,
      props: { placeholder: '如 #1e3a8a' },
    },
    {
      group: '图例',
      type: 'input',
      label: '中值色',
      key: 'props.option.visualMap.inRange.color.1',
      span: 12,
      props: { placeholder: '如 #22d3ee' },
    },
    {
      group: '图例',
      type: 'input',
      label: '高值色',
      key: 'props.option.visualMap.inRange.color.2',
      span: 12,
      props: { placeholder: '如 #a78bfa' },
    },
  ],
  schema: {
    type: 'map-chart',
    name: '地图',
    layout: {
      x: 0,
      y: 0,
      width: 520,
      height: 420,
    },
    props: {
      option: {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15,23,42,0.85)',
          borderColor: '#22d3ee',
          textStyle: {
            color: '#e2e8f0',
          },
        },
        visualMap: {
          show: true,
          min: 0,
          max: 100,
          left: 16,
          bottom: 16,
          text: ['高', '低'],
          textStyle: {
            color: '#cbd5e1',
          },
          inRange: {
            color: ['#1e3a8a', '#22d3ee', '#a78bfa'],
          },
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1,
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: '#0f172a',
            borderColor: '#22d3ee',
            borderWidth: 1,
            shadowBlur: 8,
            shadowColor: 'rgba(34,211,238,0.25)',
          },
          emphasis: {
            itemStyle: {
              areaColor: '#1e293b',
              borderColor: '#a78bfa',
              borderWidth: 2,
            },
            label: {
              show: true,
              color: '#ffffff',
            },
          },
        },
        dataset: {
          source: [
            { name: '北京', value: 92 },
            { name: '广东', value: 88 },
            { name: '上海', value: 85 },
            { name: '江苏', value: 80 },
            { name: '浙江', value: 78 },
            { name: '四川', value: 66 },
            { name: '湖北', value: 62 },
            { name: '陕西', value: 55 },
            { name: '云南', value: 48 },
            { name: '新疆', value: 40 },
          ],
        },
        series: [
          {
            type: 'map',
            geoIndex: 0,
            map: 'china',
            label: {
              show: false,
              color: '#cbd5e1',
              fontSize: 10,
            },
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
    { label: '鼠标移入', value: 'mouseover' },
    { label: '鼠标移出', value: 'mouseout' },
    { label: '组件挂载时', value: 'vnodeMounted' },
  ],
}
