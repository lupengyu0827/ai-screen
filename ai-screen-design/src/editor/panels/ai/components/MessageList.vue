<script setup lang="ts">
import MarkdownRender from 'markstream-vue'
import 'markstream-vue/index.css'

defineOptions({
  name: 'MessageList',
})

const props = defineProps(['messages', 'isLoading'])

const visibleMessages = computed(() => {
  const lastMessageIndex = props.messages.length - 1
  // 仅显示有内容的消息，或者最后一条正在等待回复的 AI 消息
  return props.messages.filter(
    (message, index) =>
      message.text || (props.isLoading && message.type === 'ai' && index === lastMessageIndex),
  )
})

const target = useTemplateRef('messageList')
const messageContainerRef = useTemplateRef('messageContainer')

let isScroll = true

function scrollBottom() {
  const container = messageContainerRef.value
  if (!container) return

  container.scrollTop = container.scrollHeight
}

function onScroll() {
  const container = messageContainerRef.value
  if (!container) return

  isScroll = container.scrollHeight - container.scrollTop - container.clientHeight <= 50
}

onMounted(() => {
  const resizeObserver = new ResizeObserver(() => {
    if (isScroll) scrollBottom()
  })

  if (target.value) resizeObserver.observe(target.value)

  onUnmounted(() => {
    resizeObserver.disconnect()
  })
})
</script>

<template>
  <!-- 消息内容 -->
  <div ref="messageContainer" class="message-container overflow-auto -m-20 p-20" @scroll="onScroll">
    <div ref="messageList" class="flex flex-col gap-10 py-10">
      <div v-for="message in visibleMessages" :key="message.id" class="message-box flex gap-10"
        :class="`message-box-${message.type}`">
        <!--   头像   -->
        <el-avatar :size="28">
          {{ message.type === 'ai' ? 'AI' : '我' }}
        </el-avatar>
        <!--   消息内容   -->
        <div class="message-content">
          <MarkdownRender v-if="message.text" :render-code-blocks-as-pre="false"
            :code-block-props="{ showCopyButton: true }" :content="message.text" mode="chat" html-policy="escape"
            :final="true" />
          <span v-else class="typing">...</span>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-box {
  .message-content {
    max-width: 85%;
    background: #1b3039;
    padding: 8px 10px;
    border-radius: 4px 12px 12px 12px;
  }

  &-human {
    flex-direction: row-reverse;

    .message-content {
      border-radius: 12px 4px 12px 12px;
    }
  }

  .typing {
    animation: typing-animation 1s infinite;
  }

  @keyframes typing-animation {

    0%,
    100% {
      opacity: 0.3;
    }

    50% {
      opacity: 1;
    }
  }
}
</style>
