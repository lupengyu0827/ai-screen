import type { MaterialSchema } from '@/schema/material'

/**
 * 节点通用样式（GoView 风格）
 * 布局 + 透明度 作用于节点外层（与 Moveable 拖拽兼容）；
 * 旋转/圆角/边框/阴影/背景/内边距 作用于内层包装。
 */
export function buildNodeOuterStyle(node: MaterialSchema, index: number) {
  const s = node.style || {}
  return {
    width: node.layout.width + 'px',
    height: node.layout.height + 'px',
    left: node.layout.x + 'px',
    top: node.layout.y + 'px',
    zIndex: index + 1,
    opacity: s.opacity != null ? s.opacity : undefined,
  }
}

export function buildNodeInnerStyle(node: MaterialSchema) {
  const s = node.style || {}
  const styles: Record<string, any> = {}

  // 旋转 + 缩放组合变换
  const transforms: string[] = []
  if (s.rotation) transforms.push(`rotate(${s.rotation}deg)`)
  const sx = node.layout.scaleX ?? 1
  const sy = node.layout.scaleY ?? 1
  if (sx !== 1 || sy !== 1) transforms.push(`scale(${sx}, ${sy})`)
  if (transforms.length) styles.transform = transforms.join(' ')

  if (s.borderRadius != null) styles.borderRadius = s.borderRadius + 'px'
  if (s.borderWidth != null || s.borderColor) {
    styles.border = `${s.borderWidth ?? 0}px solid ${s.borderColor || 'transparent'}`
  }
  if (s.boxShadow) styles.boxShadow = s.boxShadow
  if (s.backgroundColor) styles.backgroundColor = s.backgroundColor
  if (s.padding != null) styles.padding = s.padding + 'px'

  return styles
}
