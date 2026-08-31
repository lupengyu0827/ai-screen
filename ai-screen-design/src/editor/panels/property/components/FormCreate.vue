<script setup lang="ts">
import { getValue } from '@/utils/index'
import { useUndoRedo } from '@/composables/useUndoRedo';

import { ElInput, ElColorPicker, ElInputNumber, ElCheckbox, ElSelect } from 'element-plus';

defineComponent({
  name: 'FormCreate',
})

defineProps(['setters', 'formData'])

// 策略模式实现动态加载
const componentMap = {
  input: ElInput,
  // number: (props, {slots, attrs}) => h(ElInputNumber, { precision: 0, ...props }, slots),
  number: (props) => h(ElInputNumber, { precision: 0, ...props }),
  color: ElColorPicker,
  checkbox: ElCheckbox,
  select: ElSelect,
}

const { applyChange, startBatch, commitBatch } = useUndoRedo()
</script>

<template>
  <div>
    <el-form class="p-20" size="small" label-width="60">
      <el-row>
        <el-col v-for="item in setters" :key="item.key" :span="item.span || 24">
          <el-form-item :label="item.label">
            <component :is="componentMap[item.type]" :modelValue="getValue(formData, item.key)" v-bind="item.props"
              @update:modelValue="(val) => { applyChange(formData, item.key, val) }" @focus="startBatch"
              @blur="commitBatch"></component>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
