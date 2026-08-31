<script setup lang="ts">
import type { MaterialSchema } from '@/schema/material.ts'
import type { PageSchema } from '@/schema/page'

import { getMaterialComponent } from '@/materials/index'
import { createRuntimeContext } from '@/runtime/context';
import { runSandbox } from '@/runtime/sandbox';

defineComponent({
  name: 'ScreenRenderer',
})

const props = defineProps<{ page: PageSchema }>()

const runtimePage = ref(props.page)
const context = createRuntimeContext(runtimePage)

const canvas = computed(() => {
  return runtimePage.value.canvas
})

const dataSources = computed(() => {
  return runtimePage.value.dataSources
})

const nodes = computed(() => {
  return runtimePage.value.nodes
})

const scale = ref(1)
const left = ref(0)
const top = ref(0)

// 后代组件注入
provide('dataSources', dataSources)

const canvasStyle = computed(() => {
  return {
    width: `${canvas.value.width}px`,
    height: `${canvas.value.height}px`,
    backgroundColor: canvas.value.backgroundColor,
    transform: `translate(${left.value}px, ${top.value}px) scale(${scale.value})`,
    transformOrigin: 'top left',
  }
})

/**
 * 移动修改css属性
 */
function getNodeStyle(node: MaterialSchema, index: number) {
  return {
    width: node.layout.width + 'px',
    height: node.layout.height + 'px',
    left: node.layout.x + 'px',
    top: node.layout.y + 'px',
    zIndex: index + 1,
  }
}

function init() {
  // 缩放比例居中
  const Y = window.innerHeight / canvas.value.height
  const X = window.innerWidth / canvas.value.width
  scale.value = Math.min(X, Y)

  // 居中显示
  left.value = (window.innerWidth - canvas.value.width * scale.value) / 2
  top.value = (window.innerHeight - canvas.value.height * scale.value) / 2
}

/**
 * 创建组件绑定事件函数
 * @param node
 */
function createEvents(node: MaterialSchema) {
  const listeners = {}
  const events = node.events || []

  // {
  //   type: 'click',
  //   name: 'fn',
  //   code: 'console.log("click")',
  // },
  // const context = createRuntimeContext(runtimePage)
  events.forEach(event => {
    if (event.handler) {
      listeners[event.type] = event.handler
      return
    }

    event.handler = listeners[event.type] = (payload) => {
      // 执行沙箱中的代码
      runSandbox(event.code, { $context: context, $node: node, $payload: payload })
    }
  })
  return listeners
}

function registerNodeInstance() {
  const refs = {}

  for (const key in vm.refs) {
    refs[key] = vm.refs[key]
  }

  context.registerNodeInstance(refs)
}

const vm = getCurrentInstance()

onMounted(() => {
  registerNodeInstance()

  init()

  addEventListener('resize', init)

  onBeforeUnmount(() => {
    removeEventListener('resize', init)
  })
})
</script>

<template>
  <div class="preview-container">
    <div class="canvas-root" :style="canvasStyle">
      <div class="canvas-node" v-for="(node, index) in nodes" :key="node.id" :style="getNodeStyle(node, index)">
        <component :ref="node.id" :is="getMaterialComponent(node.type)" :schema="node" :index="index"
          v-on="createEvents(node)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-container {
  width: 100vw;
  height: 100vh;

  .canvas-root {
    position: relative;

    .canvas-node {
      position: absolute;
    }
  }
}
</style>
