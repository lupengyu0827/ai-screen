<script setup lang="ts">
import MessageList from './components/MessageList.vue'
import { useStream } from '@langchain/vue'
import { getMaterialsConfigSchema } from '@/materials/index.ts'
import { CanvasSchema } from '@/editor/schema/common'



import {
  getThreadId,
  setThreadId,
  deleteThreadId,
} from '@/editor/panels/ai/thread-storage.ts'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor.ts'

defineOptions({
  name: 'AiPanel',
})
const message = ref('')

const { page, selectedNodeIds } = storeToRefs(useEditorStore())

const { messages, submit, isLoading, stop, client } = useStream({
  apiUrl: 'http://localhost:2024',
  assistantId: 'screen_design_agent',
  transport: 'sse',
  threadId: getThreadId(),
  onThreadId: setThreadId,
})

function onStop() {
  stop()
}

function onSubmit() {
  if (isLoading.value || !message.value) return
  // 提交对话的代码
  submit({
    messages: [
      {
        type: 'human',
        content: message.value,
      },
    ],
    page: page.value,
    selectedNodeIds: selectedNodeIds.value,
    // 保存所有的 schema
    schema: {
      canvas: CanvasSchema.toJSONSchema(),
      material: getMaterialsConfigSchema(),
    },
  })
  message.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.shiftKey || e.isComposing) return

  e.preventDefault()
  onSubmit()
}

async function onDelete() {
  const id = getThreadId()
  await client.threads.delete(id)
  deleteThreadId()
  location.reload()
}
</script>

<template>
  <div class="ai-panel h-full">
    <div class="p-20 h-full flex flex-col">
      <span class="cursor-pointer translate-z-1" @click="onDelete">
        <Icon icon="ant-design:delete-outlined"></Icon>
      </span>
      <!-- <MessageList class="message-list flex-1" :messages="messages"></MessageList> -->
      <MessageList class="message-list flex-1" :messages="messages" :is-loading="isLoading" />
      <footer class="flex flex-col flex-none gap-10">
        <el-input type="textarea" :rows="4" v-model="message" @keydown.enter="onKeydown"></el-input>
        <el-button v-if="!isLoading" type="primary" @click="onSubmit">发送</el-button>
        <el-button v-else type="danger" @click="onStop">停止</el-button>

      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ai-panel {
  background: bg-mix(40);
}
</style>
