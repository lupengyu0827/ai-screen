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
  if (!file) return
  const text = await file.text()

  try {
    const newPage = JSON.parse(text)

    editorStore.setPage(newPage)
    ElMessage.success('导入成功')
  } catch {
    ElMessage.error('JSON 格式错误')
  } finally {
    // 重置 input，保证同一文件可重复导入
    event.target.value = ''
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
    <el-tooltip content="AI 助手" placement="bottom" :show-after="300">
      <span :class="{ active: editorStore.panelVisible.ai }" @click="showAiPanel">
        <Icon icon="mingcute:ai-fill"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="预览" placement="bottom" :show-after="300">
      <span @click="onPreview">
        <Icon icon="fluent:preview-link-16-filled"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="编辑 JSON" placement="bottom" :show-after="300">
      <span @click="previewJson">
        <Icon icon="si:json-duotone"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="发布" placement="bottom" :show-after="300">
      <span class="publish" @click="onPublish">
        <Icon icon="entypo:publish"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="数据源" placement="bottom" :show-after="300">
      <span @click="openDataSource">
        <Icon icon="mdi:database"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="导入" placement="bottom" :show-after="300">
      <span @click="onImport">
        <Icon icon="mdi:import"></Icon>
      </span>
    </el-tooltip>
    <el-tooltip content="导出" placement="bottom" :show-after="300">
      <span @click="onExport">
        <Icon icon="mdi:export"></Icon>
      </span>
    </el-tooltip>

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
  align-items: center;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 4px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--text-secondary);
    transition: all 180ms ease;

    &:hover {
      border-color: var(--border-color-light);
      color: var(--text-primary);
      background-color: var(--bg-hover);
    }

    &.active {
      border-color: var(--accent);
      color: var(--accent);
      background-color: rgba(var(--accent-rgb), 0.12);
    }

    &.publish {
      border-color: rgba(var(--accent-rgb), 0.5);
      color: var(--accent);

      &:hover {
        background-color: rgba(var(--accent-rgb), 0.12);
      }
    }
  }
}
</style>
