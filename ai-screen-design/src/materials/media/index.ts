// 媒体物料
import type { MaterialDefinition } from '@/schema/material'
import Image from './Image.vue'
import Video from './Video.vue'
import Iframe from './Iframe.vue'
import { ImageSchema, VideoSchema, IframeSchema } from './schema.js'

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

const videoMaterial: MaterialDefinition = {
  name: '视频',
  icon: 'mingcute:video-fill',
  group: 'media',
  configSchema: VideoSchema,
  setters: [
    {
      type: 'input',
      label: '视频地址',
      key: 'props.src',
    },
    {
      type: 'input',
      label: '封面地址',
      key: 'props.poster',
    },
    {
      type: 'checkbox',
      label: '自动播放',
      key: 'props.autoplay',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '循环播放',
      key: 'props.loop',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '静音',
      key: 'props.muted',
      span: 12,
    },
    {
      type: 'checkbox',
      label: '显示控件',
      key: 'props.controls',
      span: 12,
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
    type: 'video',
    name: '视频',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 240,
    },
    props: {
      src: '',
      poster: '',
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
      fit: 'cover',
      radius: 0,
    },
  },
}

const iframeMaterial: MaterialDefinition = {
  name: '网页嵌入',
  icon: 'material-symbols:iframe',
  group: 'media',
  configSchema: IframeSchema,
  setters: [
    {
      type: 'input',
      label: '网页地址',
      key: 'props.src',
    },
    {
      type: 'checkbox',
      label: '允许交互',
      key: 'props.interactive',
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
    type: 'iframe',
    name: '网页嵌入',
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
    },
    props: {
      src: '',
      radius: 0,
      interactive: false,
    },
  },
}

export function install(register) {
  register(imageMaterial, Image)
  register(videoMaterial, Video)
  register(iframeMaterial, Iframe)
}
