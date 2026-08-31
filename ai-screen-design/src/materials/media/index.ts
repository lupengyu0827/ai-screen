// 媒体物料
import type { MaterialDefinition } from '@/schema/material'
import Image from './Image.vue'
import { ImageSchema } from './schema.js'

const imageMaterial: MaterialDefinition = {
  name: '图片',
  icon: 'fluent-color:image-20',
  group: 'media',
  configSchema: ImageSchema,
  setters: [
    {
      type: 'input',
      label: '图片地址',
      key: 'props.src',
    },
    {
      type: 'select',
      label: '填充方式',
      key: 'props.fit',
      props: {
        options: [
          { label: '裁剪铺满', value: 'cover' },
          { label: '完整包含', value: 'contain' },
          { label: '拉伸铺满', value: 'fill' },
        ],
      },
    },
    {
      type: 'number',
      label: '圆角',
      key: 'props.radius',
    },
  ],
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
  schema: {
    type: 'image',
    name: '图片',
    layout: {
      x: 0,
      y: 0,
      width: 320,
      height: 200,
    },
    props: {
      src: '',
      fit: 'cover',
      radius: 0,
    },
  },
}

export function install(register) {
  register(imageMaterial, Image)
}
