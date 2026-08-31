// src/materials/number/schema.ts
import { NodeBaseSchema } from '@/editor/schema/common.ts'
import { z } from 'zod'

export const FlopSchema = NodeBaseSchema.extend({
  type: z.literal('number-flop').describe('数字翻牌器物料类型'),
  style: z
    .object({
      color: z.string().describe('数字颜色'),
      fontSize: z.number().describe('数字字号，单位为像素'),
    })
    .partial()
    .describe('数字翻牌器样式'),
  props: z
    .object({
      value: z.number().describe('目标数值，未绑定数据源时展示'),
      prefix: z.string().describe('数字前缀文本'),
      suffix: z.string().describe('数字后缀文本'),
      decimals: z.number().describe('保留的小数位数'),
      duration: z.number().describe('数字滚动动画时长，单位为毫秒'),
    })
    .describe('数字翻牌器的业务属性'),
})

export const ProgressSchema = NodeBaseSchema.extend({
  type: z.literal('progress').describe('进度条物料类型'),
  style: z.record(z.string(), z.any()).optional().describe('进度条样式'),
  props: z
    .object({
      value: z.number().describe('当前进度值，未绑定数据源时展示'),
      max: z.number().describe('进度最大值'),
      showText: z.boolean().describe('是否展示百分比文字'),
      strokeWidth: z.number().describe('进度条高度，单位为像素'),
      color: z.string().describe('进度条填充颜色'),
    })
    .describe('进度条的业务属性'),
})

export const RankListSchema = NodeBaseSchema.extend({
  type: z.literal('rank-list').describe('排行榜物料类型'),
  props: z
    .object({
      title: z.string().describe('排行榜标题'),
      data: z
        .array(z.record(z.string(), z.any()))
        .describe('排行榜数据，按 valueKey 字段降序排列'),
      labelKey: z.string().describe('展示名称使用的字段名'),
      valueKey: z.string().describe('展示数值使用的字段名'),
      textColor: z.string().describe('行文字颜色'),
    })
    .describe('排行榜的业务属性'),
})

export const RingProgressSchema = NodeBaseSchema.extend({
  type: z.literal('ring-progress').describe('环形进度物料类型'),
  style: z.record(z.string(), z.any()).optional().describe('环形进度样式'),
  props: z
    .object({
      value: z.number().describe('当前进度值，未绑定数据源时展示'),
      max: z.number().describe('进度最大值'),
      decimals: z.number().describe('百分比保留的小数位数'),
      showText: z.boolean().describe('是否展示中心百分比文字'),
      strokeWidth: z.number().describe('圆环宽度，相对 viewBox 200 的百分比'),
      color: z.string().describe('进度环颜色'),
      trackColor: z.string().describe('轨道颜色'),
      textColor: z.string().describe('中心文字颜色'),
    })
    .describe('环形进度的业务属性'),
})

export const CarouselTableSchema = NodeBaseSchema.extend({
  type: z.literal('carousel-table').describe('轮播表格物料类型'),
  props: z
    .object({
      title: z.string().describe('表格标题，留空则不显示'),
      columns: z
        .array(
          z.object({
            label: z.string().describe('列标题'),
            key: z.string().describe('列数据字段名'),
            width: z.number().optional().describe('列宽百分比，默认 50'),
          }),
        )
        .describe('表格列配置'),
      data: z.array(z.record(z.string(), z.any())).describe('表格数据，未绑定数据源时展示'),
      rowHeight: z.number().describe('每行高度，单位为像素'),
      showHeader: z.boolean().describe('是否显示表头'),
      headerBg: z.string().describe('表头背景色'),
      rowBg: z.string().describe('偶数行背景色'),
      textColor: z.string().describe('行文字颜色'),
      interval: z.number().describe('每行滚动间隔，单位为秒'),
    })
    .describe('轮播表格的业务属性'),
})
