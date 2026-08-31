// src/materials/text/schema.ts
import { NodeBaseSchema } from '@/editor/schema/common.ts'
import { z } from 'zod'

export const TextSchema = NodeBaseSchema.extend({
  type: z.literal('text').describe('文本物料类型。'),
  style: z.object({
    color: z.string().describe('文本颜色。'),
    fontSize: z.number().describe('文本字号，单位为像素。'),
  }),
  props: z.object({
    content: z.string().describe('文本物料实际展示的文字内容；真实字段是 props.content'),
  }),
})

export const MarqueeSchema = NodeBaseSchema.extend({
  type: z.literal('marquee').describe('跑马灯物料类型'),
  style: z
    .object({
      color: z.string().describe('文本颜色'),
      fontSize: z.number().describe('文本字号，单位为像素'),
    })
    .partial()
    .describe('跑马灯样式'),
  props: z
    .object({
      content: z.string().describe('滚动展示的文字内容'),
      speed: z.number().describe('滚动速度，单位为像素/秒'),
      direction: z.enum(['left', 'right']).describe('滚动方向'),
    })
    .describe('跑马灯的业务属性'),
})

export const TimeSchema = NodeBaseSchema.extend({
  type: z.literal('time').describe('时间物料类型'),
  style: z
    .object({
      color: z.string().describe('时间文字颜色'),
      fontSize: z.number().describe('时间字号，单位为像素'),
    })
    .partial()
    .describe('时间样式'),
  props: z
    .object({
      format: z.string().describe('时间格式，支持 YYYY-MM-DD HH:mm:ss 等占位符'),
      interval: z.number().describe('刷新间隔，单位为毫秒'),
    })
    .describe('时间的业务属性'),
})

export const ButtonSchema = NodeBaseSchema.extend({
  type: z.literal('button').describe('按钮物料类型'),
  style: z
    .object({
      fontSize: z.number().describe('按钮文字字号，单位为像素'),
    })
    .partial()
    .describe('按钮样式'),
  props: z
    .object({
      text: z.string().describe('按钮展示文字'),
      type: z
        .enum(['primary', 'success', 'warning', 'danger', 'default'])
        .describe('按钮主题：primary 主色 / success 成功 / warning 警告 / danger 危险 / default 中性'),
      borderRadius: z.number().describe('按钮圆角，单位为像素'),
    })
    .describe('按钮的业务属性'),
})

export const IconSchema = NodeBaseSchema.extend({
  type: z.literal('icon').describe('图标物料类型'),
  props: z
    .object({
      icon: z.string().describe('iconify 图标名称，例如 mdi:star-four-points'),
      size: z.number().describe('图标尺寸，单位为像素'),
      color: z.string().describe('图标颜色，支持 CSS 颜色值'),
    })
    .describe('图标的业务属性'),
})
