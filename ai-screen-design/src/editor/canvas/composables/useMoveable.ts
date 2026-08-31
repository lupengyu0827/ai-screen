import type { OnDrag, OnDragGroup, OnResize, OnResizeGroup } from 'vue3-moveable'
import { useEditorStore } from '@/stores/editor'
import { useUndoRedo } from '@/composables/useUndoRedo'

export function useMoveable(moveableRef) {
  const editorStore = useEditorStore()

  const { applyChange, startBatch, commitBatch } = useUndoRedo()

  function getNodeByTarget(element: HTMLElement) {
    const id = element.getAttribute('data-node-id')
    return editorStore.findNode(id)
  }
  // 当 layout发生变化时手动更新moveable的选框
  watch(
    () =>
      editorStore.nodes.map((node) => {
        return node.layout
      }),
    () => {
      // 手动更新的方法
      moveableRef.value.updateRect(undefined, true)
    },
    {
      // dom更新后执行
      flush: 'post',
    },
  )

  function onStart() {
    startBatch()
  }

  function onEnd() {
    commitBatch()
  }

  // 移动
  function onDrag(e: OnDrag) {
    e.target.style.left = e.left + 'px'
    e.target.style.top = e.top + 'px'

    const node = getNodeByTarget(e.target as HTMLElement)
    if (!node) return

    // 若节点属于组合，则同组节点整体偏移
    const groupNodes = node.groupId
      ? editorStore.nodes.filter((n) => n.groupId === node.groupId)
      : [node]

    const dx = e.left - node.layout.x
    const dy = e.top - node.layout.y

    groupNodes.forEach((n) => {
      applyChange(n, 'layout', {
        ...n.layout,
        x: n.layout.x + dx,
        y: n.layout.y + dy,
      })
    })
  }

  function onResize(e: OnResize) {
    e.target.style.width = e.width + 'px'
    e.target.style.height = e.height + 'px'
    const node = getNodeByTarget(e.target as HTMLElement)
    // node.layout.width = e.width
    // node.layout.height = e.height
    applyChange(node, 'layout', {
      ...node.layout,
      width: e.width,
      height: e.height,
    })
    onDrag(e.drag)
  }

  // 选中多个节点一起移动
  function onDragGroup(e: OnDragGroup) {
    e.events.forEach(onDrag)
  }
  function onResizeGroup(e: OnResizeGroup) {
    e.events.forEach(onResize)
  }

  return {
    onDrag,
    onResize,
    onDragGroup,
    onResizeGroup,
    onStart,
    onEnd,
  }
}
