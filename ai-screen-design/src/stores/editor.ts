import type { MaterialSchema } from '@/schema/material'
import type { PageSchema } from '@/schema/page'
import { defineStore } from 'pinia'
import { useUndoRedo } from '@/composables/useUndoRedo'

export type AlignType = 'left' | 'centerX' | 'right' | 'top' | 'centerY' | 'bottom' | 'distributeH' | 'distributeV'

export const useEditorStore = defineStore('editor', () => {
  const { applyChange, undo, redo, canUndo, canRedo } = useUndoRedo()

  const panelVisible = reactive({
    material: false,
    layer: false,
    property: false,
    ai: true,
  })

  const page = ref<PageSchema>({
    canvas: {
      width: 1800,
      height: 1169,
      backgroundColor: 'var(--bg-base)',
    },
    nodes: [],
    dataSources: [
      {
        type: 'static',
        id: '124',
        name: '静态数据',
        data: [
          {
            label: '一月',
            value: 100,
          },
          {
            label: '二月',
            value: 200,
          },
          {
            label: '三月',
            value: 300,
          },
        ],
      },
      {
        type: 'static',
        id: '456',
        name: '访问数据',
        data: [
          {
            label: '一月',
            value: 10000,
          },
          {
            label: '二月',
            value: 2000000,
          },
          {
            label: '三月',
            value: 3000000,
          },
        ],
      },
      {
        type: 'api',
        id: '999',
        name: 'API访问数据',
        url: '/api/data',
        // interval: 2000,
        method: 'get',
        params: {
          data: '2026-01-01',
        },
        data: [],
      },
    ],
  })

  const canvas = toRef(page.value, 'canvas')

  /**
   * 当前编辑器中组件的列表
   */
  const nodes = toRef(page.value, 'nodes')

  const dataSources = toRef(page.value, 'dataSources')

  function setPage(newPage: PageSchema) {
    // 合并newPage到page.value中
    Object.assign(page.value, newPage)
  }

  /**
   * 当前选中的节点ID
   */
  const selectedNodeIds = ref([])
  // 多选的情况单独id为null
  const selectedNodeId = computed(() => {
    return selectedNodeIds.value.length === 1 ? selectedNodeIds.value[0] : null
  })

  /**
   * 当前选中的节点
   */
  const selectedNode = computed(() => nodes.value.find((node) => node.id === selectedNodeId.value))

  function addNode(node: MaterialSchema) {
    setNodes([...nodes.value, node])
  }

  function selectNode(id: string) {
    selectedNodeIds.value = [id]
  }

  function selectNodes(ids: string[]) {
    selectedNodeIds.value = ids
  }

  function setNodes(newNodes) {
    applyChange(nodes, 'value', newNodes)
  }

  function findNode(id: string) {
    return nodes.value.find((node) => node.id === id)
  }

  function clearSelectedNode() {
    selectedNodeIds.value = []
  }

  function copyNode(node: MaterialSchema) {
    const newNode = JSON.parse(JSON.stringify(node))
    newNode.id = crypto.randomUUID()
    newNode.layout.x += 20
    newNode.layout.y += 20

    addNode(newNode)
    selectNode(newNode.id)
  }
  function removeNode(node: MaterialSchema) {
    setNodes(nodes.value.filter((n) => n.id !== node.id))
    selectedNodeIds.value = selectedNodeIds.value.filter((id) => id !== node.id)
  }
  function moveTop(node: MaterialSchema) {
    const index = nodes.value.findIndex((n) => n.id === node.id)
    const splicedNodes = nodes.value.toSpliced(index, 1)

    setNodes([node, ...splicedNodes])
  }
  function moveBottom(node: MaterialSchema) {
    const index = nodes.value.findIndex((n) => n.id === node.id)
    const splicedNodes = nodes.value.toSpliced(index, 1)

    setNodes([...splicedNodes, node])
  }
  function toggleLock(node: MaterialSchema) {
    applyChange(node, 'locked', !node.locked)
  }

  /** 隐藏/显示组件 */
  function toggleVisible(node: MaterialSchema) {
    applyChange(node, 'visible', node.visible === false ? true : false)
  }

  function updateNode(id: string, newNode: MaterialSchema) {
    // 使用map 返回新列表 再新列表中进行替换
    const newNodes = nodes.value.map((node) => (node.id === id ? newNode : node))
    // 设置新的nodes
    setNodes(newNodes)
  }

  /** ===== 剪贴板 ===== */
  const clipboard = ref<MaterialSchema[]>([])

  /** 复制选中的节点到剪贴板 */
  function copySelected() {
    const selected = nodes.value.filter((n) => selectedNodeIds.value.includes(n.id))
    if (!selected.length) return
    clipboard.value = JSON.parse(JSON.stringify(selected))
  }

  /** 从剪贴板粘贴（偏移 20px 防止重叠） */
  function pasteClipboard() {
    if (!clipboard.value.length) return
    const pasted = clipboard.value.map((node) => {
      const clone = JSON.parse(JSON.stringify(node))
      clone.id = crypto.randomUUID()
      clone.groupId = undefined
      clone.layout = {
        ...clone.layout,
        x: clone.layout.x + 20,
        y: clone.layout.y + 20,
      }
      return clone
    })
    setNodes([...nodes.value, ...pasted])
    selectNodes(pasted.map((n) => n.id))
  }

  /** ===== 多选对齐与分布 ===== */
  function alignNodes(type: AlignType) {
    const selected = nodes.value.filter((n) => selectedNodeIds.value.includes(n.id))
    if (selected.length < 2) return

    const setLayout = (node: MaterialSchema, patch: { x?: number; y?: number; width?: number; height?: number }) => {
      applyChange(node, 'layout', { ...node.layout, ...patch })
    }

    if (type === 'distributeH' || type === 'distributeV') {
      const isH = type === 'distributeH'
      const sorted = [...selected].sort((a, b) => (isH ? a.layout.x - b.layout.x : a.layout.y - b.layout.y))
      const getStart = (n) => (isH ? n.layout.x : n.layout.y)
      const getSize = (n) => (isH ? n.layout.width : n.layout.height)
      const total = sorted.reduce((s, n) => s + getSize(n), 0)
      const start = getStart(sorted[0])
      const end = getStart(sorted[sorted.length - 1]) + getSize(sorted[sorted.length - 1])
      const gap = (end - start - total) / (sorted.length - 1)
      let cursor = start
      sorted.forEach((n) => {
        if (isH) setLayout(n, { x: cursor })
        else setLayout(n, { y: cursor })
        cursor += getSize(n) + gap
      })
      return
    }

    const rects = selected.map((n) => n.layout)
    const left = Math.min(...rects.map((r) => r.x))
    const right = Math.max(...rects.map((r) => r.x + r.width))
    const top = Math.min(...rects.map((r) => r.y))
    const bottom = Math.max(...rects.map((r) => r.y + r.height))
    const centerX = (left + right) / 2
    const centerY = (top + bottom) / 2

    selected.forEach((n) => {
      const { x, y, width, height } = n.layout
      switch (type) {
        case 'left':
          setLayout(n, { x: left })
          break
        case 'centerX':
          setLayout(n, { x: centerX - width / 2 })
          break
        case 'right':
          setLayout(n, { x: right - width })
          break
        case 'top':
          setLayout(n, { y: top })
          break
        case 'centerY':
          setLayout(n, { y: centerY - height / 2 })
          break
        case 'bottom':
          setLayout(n, { y: bottom - height })
          break
      }
    })
  }

  /** ===== 组合 / 取消组合 ===== */
  function groupSelected() {
    const selected = nodes.value.filter((n) => selectedNodeIds.value.includes(n.id))
    if (selected.length < 2) return
    const groupId = crypto.randomUUID()
    selected.forEach((n) => applyChange(n, 'groupId', groupId))
  }

  function ungroupSelected() {
    const selected = nodes.value.filter((n) => selectedNodeIds.value.includes(n.id))
    selected.forEach((n) => applyChange(n, 'groupId', undefined))
  }

  return {
    panelVisible,
    nodes,
    page,
    dataSources,
    canvas,
    selectedNodeId,
    selectedNodeIds,
    selectedNode,
    clipboard,
    addNode,
    selectNode,
    clearSelectedNode,
    selectNodes,
    findNode,
    copyNode,
    removeNode,
    moveTop,
    moveBottom,
    toggleLock,
    toggleVisible,
    undo,
    redo,
    canUndo,
    canRedo,
    updateNode,
    setPage,
    copySelected,
    pasteClipboard,
    alignNodes,
    groupSelected,
    ungroupSelected,
  }
})
