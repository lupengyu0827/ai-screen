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
