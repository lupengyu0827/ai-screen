// src/materials/media/schema.ts
import { NodeBaseSchema } from '@/editor/schema/common.ts'
import { z } from 'zod'

export const ImageSchema = NodeBaseSchema.extend({
  type: z.literal('image').describe('图片物料类型'),
  props: z
    .object({
      src: z.string().describe('图片地址，支持 http(s) 或相对路径'),
      fit: z
        .enum(['cover', 'contain', 'fill'])
        .describe('图片填充方式：cover 裁剪铺满 / contain 完整包含 / fill 拉伸铺满'),
      radius: z.number().describe('图片圆角，单位为像素'),
    })
    .describe('图片物料的业务属性'),
})

export const VideoSchema = NodeBaseSchema.extend({
  type: z.literal('video').describe('视频物料类型'),
  props: z
    .object({
      src: z.string().describe('视频地址，支持 mp4 等浏览器可播放格式'),
      poster: z.string().describe('视频封面图地址，留空则不展示'),
      autoplay: z.boolean().describe('是否自动播放'),
      loop: z.boolean().describe('是否循环播放'),
      muted: z.boolean().describe('是否静音'),
      controls: z.boolean().describe('是否显示播放控件'),
      fit: z
        .enum(['cover', 'contain', 'fill'])
        .describe('视频填充方式：cover 裁剪铺满 / contain 完整包含 / fill 拉伸铺满'),
      radius: z.number().describe('视频圆角，单位为像素'),
    })
    .describe('视频物料的业务属性'),
})

export const IframeSchema = NodeBaseSchema.extend({
  type: z.literal('iframe').describe('iframe 嵌入物料类型'),
  props: z
    .object({
      src: z.string().describe('要嵌入的网页地址'),
      radius: z.number().describe('圆角，单位为像素'),
      interactive: z.boolean().describe('运行态是否允许与嵌入页面交互'),
    })
    .describe('iframe 物料的业务属性'),
})
