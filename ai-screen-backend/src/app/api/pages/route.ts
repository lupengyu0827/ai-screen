import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const DEFAULT_CANVAS = { width: 1800, height: 1169, backgroundColor: 'var(--bg-base)' }

/**
 * GET /api/pages —— 页面列表（不含大字段）
 */
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({ data: pages })
  } catch (error) {
    console.error('GET /api/pages failed:', error)
    return NextResponse.json({ error: '查询失败' }, { status: 500 })
  }
}

/**
 * POST /api/pages —— 新建页面
 * body: { title?, description?, canvas?, nodes?, dataSources? }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, canvas, nodes, dataSources } = body ?? {}

    const page = await prisma.page.create({
      data: {
        title: title || '未命名大屏',
        description: description ?? null,
        canvas: canvas ?? DEFAULT_CANVAS,
        nodes: nodes ?? [],
        dataSources: dataSources ?? [],
      },
    })
    return NextResponse.json({ data: page }, { status: 201 })
  } catch (error) {
    console.error('POST /api/pages failed:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
