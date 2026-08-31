import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'

import type { MaterialSchema } from '@/schema/material'

export function useSelection({ stageRef, moveableRef }) {
  const editorStore = useEditorStore()

  const { selectedNodeIds } = storeToRefs(editorStore)

  const selectedTarget = shallowRef<HTMLElement[]>()

  watch(
    selectedNodeIds,
    (ids) => {
      selectedTarget.value = ids.map((id) => {
        return stageRef.value.querySelector(`[data-node-id="${id}"]:not([data-node-locked='true'])`)
      })
    },
    { deep: true, flush: 'post' },
  )

  // 选中（shift+点击切换多选）
  function onSelect(node: MaterialSchema, e: MouseEvent) {
    if (e.shiftKey) {
      const ids = new Set(editorStore.selectedNodeIds)
      if (ids.has(node.id)) {
        ids.delete(node.id)
      } else {
        ids.add(node.id)
      }
      editorStore.selectNodes([...ids])
    } else {
      editorStore.selectNode(node.id)
    }

    nextTick(() => {
      moveableRef.value.dragStart(e)
    })
  }

  /**
   * 点击空白区域取消选中
   */
  function onClearSelected() {
    editorStore.clearSelectedNode()
  }

  // 选中结束
  function onSelectEnd(e) {
    const ids = e.selected.map((element) => element.getAttribute('data-node-id'))
    editorStore.selectNodes(ids)
  }

  return {
    selectedTarget,
    onSelect,
    onSelectEnd,
    onClearSelected,
  }
}
