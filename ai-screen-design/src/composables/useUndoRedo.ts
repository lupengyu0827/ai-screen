import { setValue, getValue } from '@/utils'

// 撤销栈最大层数
const MAX_HISTORY_LENGTH = 1000

// 撤销重做 避免直接操作数据，而是操作记录 shallowReactive:浅层的属性 只关注length 或者下标
const undoStack = shallowReactive([])
const redoStack = shallowReactive([])
export function useUndoRedo() {
  // 是否可以撤销
  const canUndo = computed(() => undoStack.length > 0)
  // 是否可以重做
  const canRedo = computed(() => redoStack.length > 0)

  let activeBatch = null
  // 开始批量处理
  function startBatch() {
    activeBatch = []
  }
  // 提交批量处理
  function commitBatch() {
    if (activeBatch?.length) {
      pushRecord(activeBatch)
    }
    activeBatch = null
  }

  // 设置最大存储数量超限制删除第一条
  function pushRecord(record) {
    undoStack.push(record)

    if (undoStack.length > MAX_HISTORY_LENGTH) {
      undoStack.shift()
    }
  }

  // 记录
  // target 是响应式对象，key 为取值路径（如 'layout'、'props.content'），newValue 为任意新值
  function applyChange<T>(target: T, key: string, newValue: any) {
    // 改变之前
    const oldValue = getValue(target, key)

    if (oldValue === newValue) return

    const record = {
      target,
      key,
      newValue,
      oldValue,
    }

    if (activeBatch) {
      // 如果有批量操作，则放入当前批次 如果是同一个key，则更新 代表之前改过 如果没改过添加进去
      const _record = activeBatch.find((item) => item.target === target && item.key === key)
      if (_record) {
        _record.newValue = newValue
      } else {
        activeBatch.push(record)
      }
    } else {
      pushRecord([record])
    }

    setValue(target, key, newValue)

    redoStack.length = 0
  }

  function undo() {
    const records = undoStack.pop()
    if (!records) return

    records.forEach((record) => {
      const { target, key, oldValue } = record
      // 撤销是退回老值
      setValue(target, key, oldValue)
    })

    // 撤销之后，放入重做栈
    redoStack.push(records)
  }
  function redo() {
    const records = redoStack.pop()
    if (!records) return

    // 重做是批量操作 reverse:反转数组会改变原数组所以浅拷贝一下  toReverses:返回新数组
    records.toReversed().forEach((record) => {
      const { target, key, newValue } = record
      // 重做是设置新值
      setValue(target, key, newValue)
    })

    // 重做之后，放入撤销栈
    pushRecord(records)
  }

  return {
    undo,
    redo,
    applyChange,
    canUndo,
    canRedo,
    startBatch,
    commitBatch,
  }
}
