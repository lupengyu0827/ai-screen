<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ElMessage } from 'element-plus';
import MonacoEditor from '@/components/MonacoEditor/index.vue'
import DataSourceManager from './components/DataSourceManager.vue'

import { publishPage } from '@/utils/publish'

import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router'

defineComponent({
  name: 'ToolbarRight',
})

const router = useRouter()

const editorStore = useEditorStore()
const { page } = storeToRefs(editorStore)
// 全局json抽屉
const visible = ref(false)
// 全局源弹窗
const dataSourceVisible = ref(false)
const jsonText = ref('')

const inputRef = useTemplateRef<HTMLElement>('inputRef')
const dataSourceManagerRef = useTemplateRef('dataSourceManagerRef')

function previewJson() {
  visible.value = true
  jsonText.value = JSON.stringify(page.value, null, 2)
}

function onConfirm() {
  const newPage = JSON.parse(jsonText.value)
  editorStore.setPage(newPage)
  visible.value = false
}

function onExport() {
  const json = JSON.stringify(page.value, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'screen-design.json'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 使用input type = file
function onImport() {
  inputRef.value.click()
}

async function onFileChange(event) {
  const file: File = event.target.files[0]
  if (file) return
  const text = await file.text()

  try {
    const newPage = JSON.parse(text)

    editorStore.setPage(newPage)
  } catch {
    ElMessage.error('JSON 格式错误')
  }
}

function openDataSource() {
  dataSourceVisible.value = true
}

function onSave() {
  // 调用保存方法
  dataSourceManagerRef.value.save()
  dataSourceVisible.value = false
}

function onPreview() {
  router.push('/preview')
}

function onPublish() {
  // 调用发布方法
  const id = publishPage(page.value)

  router.push('/screen?id=' + id)
}

function showAiPanel() {
  editorStore.panelVisible.ai = !editorStore.panelVisible.ai
}
</script>

<template>
  <div class="toolbar-right flex gap-20 justify-end">
    <span @click="showAiPanel">
      <Icon icon="mingcute:ai-fill"></Icon>
    </span>
    <span @click="onPreview">
      <Icon icon="fluent:preview-link-16-filled"></Icon>
    </span>
    <span @click="previewJson">
      <Icon icon="si:json-duotone"></Icon>
    </span>
    <span @click="onPublish">
      <Icon icon="entypo:publish"></Icon>
    </span>
    <span @click="openDataSource">
      <Icon icon="mdi:database"></Icon>
    </span>
    <span @click="onImport">
      <Icon icon="mdi:import"></Icon>
    </span>
    <span @click="onExport">
      <Icon icon="mdi:export"></Icon>
    </span>

    <input ref="inputRef" type="file" v-show="false" @change="onFileChange">

    <el-drawer :destroy-on-close="true" title="编辑 JSON" size="800" v-model="visible">
      <MonacoEditor v-model="jsonText" />
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </template>
    </el-drawer>

    <el-dialog title="数据源配置" v-model="dataSourceVisible" destroy-on-close width="800">
      <!-- 数据源管理 -->
      <DataSourceManager ref="dataSourceManagerRef"></DataSourceManager>
      <template #footer>
        <el-button @click="dataSourceVisible = false">取消</el-button>
        <el-button type="primary" @click="onSave">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.toolbar-right {
  span {
    padding: 4px;
    border: 1px solid #3b465b;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
