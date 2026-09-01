import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

/**
 * GET /api/pages/[id] —— 页面详情
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const page = await prisma.page.findUnique({ where: { id } })
    if (!page) return NextResponse.json({ error: '页面不存在' }, { status: 404 })
    return NextResponse.json({ data: page })
  } catch (error) {
    console.error('GET /api/pages/[id] failed:', error)
    return NextResponse.json({ error: '查询失败' }, { status: 500 })
  }
}

/**
 * PUT /api/pages/[id] —— 更新页面（部分更新）
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, canvas, nodes, dataSources, published } = body ?? {}

    const existing = await prisma.page.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: '页面不存在' }, { status: 404 })

    const page = await prisma.page.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(canvas !== undefined ? { canvas } : {}),
        ...(nodes !== undefined ? { nodes } : {}),
        ...(dataSources !== undefined ? { dataSources } : {}),
        ...(published !== undefined ? { published } : {}),
      },
    })
    return NextResponse.json({ data: page })
  } catch (error) {
    console.error('PUT /api/pages/[id] failed:', error)
    return NextResponse.json({ error: '更新失败' }, { status: 500 })
  }
}

/**
 * DELETE /api/pages/[id] —— 删除页面
 */
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const existing = await prisma.page.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: '页面不存在' }, { status: 404 })

    await prisma.page.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/pages/[id] failed:', error)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}
