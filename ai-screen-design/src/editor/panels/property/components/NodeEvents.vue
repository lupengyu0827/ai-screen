<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue'

import { deepClone } from '@/utils/index'
import { getMaterialEventOptions } from '@/materials/index'

import MonacoEditor from '@/components/MonacoEditor/index.vue'
import type { MaterialEvent } from '@/schema/material';
import { ElMessage } from 'element-plus';

defineComponent({
  name: 'NodeEvents',
})

const editorStore = useEditorStore()
const { selectedNode, nodes } = storeToRefs(editorStore)

/**
 * 深拷贝事件列表
 */
const data = ref(deepClone(selectedNode.value.events || []))

const dispatchEvent = ref()

const dispatchOptions = computed(() => {
  return nodes.value.map(node => {
    return {
      label: node.name,
      value: node.id,
      children: node.events?.map(event => {
        return {
          label: event.title,
          value: `${event.name}`
        }
      })
    }
  })
})

const eventOptions = computed(() => {
  return getMaterialEventOptions(selectedNode.value.type)
})

const activeEvent = ref()
function selectEvent(event: MaterialEvent) {
  activeEvent.value = event
}

function onAdd() {
  data.value.push({
    name: '',
    title: '未命名',
    type: '',
    code: ''
  })

  selectEvent(data.value.at(-1))
}

function removeEvent(name: string) {
  data.value = data.value.filter(item => item.name !== name)
  selectEvent(null)
}

defineExpose({
  save() {
    // 更新节点
    selectedNode.value.events = data.value

    editorStore.updateNode(selectedNode.value.id, {
      ...selectedNode.value,
      events: data.value
    })
  },
})

async function copyNodeId(id: string) {
  // 仅支持https 或者开发环境
  await navigator.clipboard.writeText(id)

  ElMessage.success('复制成功')
}

function insertDispatchCode(values: string[]) {
  console.log(values)
  const [id, name] = values

  const code = `\n$context.dispatch('${id}', '${name}')`

  activeEvent.value.code += code

  nextTick(() => {
    // 延后复制 否则会被级联选择器内部覆盖
    dispatchEvent.value = undefined
  })
}



</script>

<template>
  <div class="node-event-container">
    <div class="node-event-sidebar">
      <el-button type="primary" size="small" @click="onAdd">新增</el-button>
      <div class="node-event-item" :class="{ active: item.name === activeEvent?.name }" v-for="item in data"
        :key="item.name" @click="selectEvent(item)">
        <span>{{ item.title }}</span>
        <span @click.stop="removeEvent(item.name)">
          <Icon icon="mdi:remove"></Icon>
        </span>
      </div>
    </div>
    <div class="node-event-content">
      <el-form v-if="activeEvent">
        <div class="flex gap-20 mb-20">
          <el-select class="flex-1" placeholder="复制节点id" @change="copyNodeId">
            <el-option v-for="node in nodes" :key="node.id" :label="node.name" :value="node.id">
              {{ node.name }}
            </el-option>
          </el-select>
          <el-cascader class="flex-1" v-model="dispatchEvent" placeholder="触发事件" :options="dispatchOptions"
            @change="insertDispatchCode"></el-cascader>
        </div>
        <el-form-item label="标题">
          <el-input v-model="activeEvent.title"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="activeEvent.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="activeEvent.type" :options="eventOptions" placeholder="请选择事件名称" allow-create
            filterable></el-select>
        </el-form-item>
        <el-form-item label="函数体">
          <div class="function-content flex flex-col w-full bg-[#1e1e1e] pl-30">
            <div class="flex-none"> function {{ activeEvent.name }} ($context, $node, $payload) {</div>
            <MonacoEditor class="flex-1" v-model="activeEvent.code" lang="javascript"></MonacoEditor>
            <div class="flex-none pl-30"> }</div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.node-event-container {
  display: flex;
  gap: 20px;
  height: 600px;

  .node-event-sidebar {
    width: 200px;
    flex: none;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 10px;
    overflow: auto;

    .node-event-item {
      height: 40px;
      padding: 0 10px;
      margin-top: 10px;
      background-color: bg-mix(80);
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background: var(--el-color-primary);
      }

      &.active {
        background: var(--el-color-primary);
      }
    }
  }

  .node-event-content {
    flex: 1;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 10px;
    overflow: auto;
  }

  .function-content {
    font-family: 'Menlo, Monaco, "Courier New", monospace';
  }
}
</style>
