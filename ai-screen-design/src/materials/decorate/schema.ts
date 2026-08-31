// src/materials/decorate/schema.ts
import { NodeBaseSchema } from '@/editor/schema/common.ts'
import { z } from 'zod'

/** 边框装饰 schema 工厂：支持多款边框（不同 type），props 一致 */
export function createBorderBoxSchema(type: string) {
  return NodeBaseSchema.extend({
    type: z.literal(type).describe('边框装饰物料类型'),
    props: z
      .object({
        title: z.string().describe('边框标题，留空则不显示'),
        color: z.string().describe('边框与角标颜色'),
        titleColor: z.string().describe('标题文字颜色'),
        radius: z.number().describe('边框圆角，单位为像素'),
        bgOpacity: z.number().describe('半透明背景的不透明度，0-1'),
        variant: z.string().describe('边框款式标识'),
      })
      .describe('边框装饰的业务属性'),
  })
}

export const DividerSchema = NodeBaseSchema.extend({
  type: z.literal('divider').describe('分割线装饰物料类型'),
  props: z
    .object({
      title: z.string().describe('分割线中间标题，留空则不显示'),
      titleColor: z.string().describe('标题文字颜色'),
      color: z.string().describe('线条渐变主色'),
      thickness: z.number().describe('线条厚度，单位为像素'),
      showLight: z.boolean().describe('是否显示发光效果'),
    })
    .describe('分割线装饰的业务属性'),
})

/** 动态装饰线 schema 工厂：不同款式独立 type */
export function createDecorationSchema(type: string) {
  return NodeBaseSchema.extend({
    type: z.literal(type).describe('动态装饰线物料类型'),
    props: z
      .object({
        color: z.string().describe('装饰线主色'),
        variant: z.string().describe('装饰线款式：line-1 / line-2 / dot'),
        duration: z.number().describe('动画周期，单位为秒'),
      })
      .describe('动态装饰线的业务属性'),
  })
}
