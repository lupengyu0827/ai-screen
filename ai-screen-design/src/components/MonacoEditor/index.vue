<script setup lang="ts">

import { editor } from 'monaco-editor'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

defineComponent({
  name: 'MonacoEditor',
})

// 放入webWorker中运行提升性能
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') return new JsonWorker()
    if (label === 'javascript' || label === 'typescript') return new TsWorker()

    return new EditorWorker()
  }
}

const props = defineProps<{ lang?: string }>()

// 自定义双向数据绑定
const modelValue = defineModel<string>()

const editorElement = ref()

let instance
onMounted(() => {
  instance = editor.create(editorElement.value, {
    value: modelValue.value,
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 2,
    language: props.lang || 'json',
    // 自适应父节点宽高
    automaticLayout: true,
  })
  instance.onDidChangeModelContent(() => {
    modelValue.value = instance.getValue()
  })

  onBeforeUnmount(() => {
    instance.dispose()
  })
})

// 切换自动更新
watch(modelValue, (newVal) => {
  if (newVal === instance.getValue()) return
  instance.setValue(newVal)
})
</script>

<template>
  <div class="editor-container" ref="editorElement"></div>
</template>

<style scoped lang="scss">
.editor-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
