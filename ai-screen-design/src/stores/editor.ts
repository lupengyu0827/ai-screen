import type { MaterialSchema } from '@/schema/material'
import type { PageSchema } from '@/schema/page'
import { defineStore } from 'pinia'
import { useUndoRedo } from '@/composables/useUndoRedo'

export const useEditorStore = defineStore('editor', () => {
  const { applyChange } = useUndoRedo()

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
      backgroundColor: '#0d121b',
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

  function updateNode(id: string, newNode: MaterialSchema) {
    // 使用map 返回新列表 再新列表中进行替换
    const newNodes = nodes.value.map((node) => (node.id === id ? newNode : node))
    // 设置新的nodes
    setNodes(newNodes)
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
    updateNode,
    setPage,
  }
})
