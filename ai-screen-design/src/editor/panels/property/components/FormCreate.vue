<script setup lang="ts">
import { getValue } from '@/utils/index'
import { useUndoRedo } from '@/composables/useUndoRedo';

import { ElInput, ElColorPicker, ElInputNumber, ElCheckbox, ElSelect } from 'element-plus';

defineComponent({
  name: 'FormCreate',
})

const props = defineProps(['setters', 'formData'])

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

// 按 setter.group 分组渲染（无 group 的合并为一组，不显示标题）
const groupedSetters = computed(() => {
  const groups: { name: string | null; items: any[] }[] = []
  let current: { name: string | null; items: any[] } | null = null
  for (const item of props.setters || []) {
    if (item.group && item.group !== current?.name) {
      if (current?.items.length) groups.push(current)
      current = { name: item.group, items: [] }
    }
    if (!current) current = { name: null, items: [] }
    current.items.push(item)
  }
  if (current?.items.length) groups.push(current)
  return groups
})
</script>

<template>
  <div>
    <el-form class="p-16" size="small" label-width="64">
      <template v-for="(group, gi) in groupedSetters" :key="gi">
        <div v-if="group.name" class="form-group-title">
          <span class="group-line"></span>
          <span class="group-text">{{ group.name }}</span>
        </div>
        <el-row :gutter="8">
          <el-col v-for="item in group.items" :key="item.key" :span="item.span || 24">
            <el-form-item :label="item.label">
              <component :is="componentMap[item.type]" :modelValue="getValue(formData, item.key)" v-bind="item.props"
                @update:modelValue="(val) => { applyChange(formData, item.key, val) }" @focus="startBatch"
                @blur="commitBatch"></component>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.form-group-title {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);

  .group-line {
    width: 3px;
    height: 12px;
    border-radius: 2px;
    background: var(--accent);
  }

  .group-text {
    letter-spacing: 0.5px;
  }
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: var(--text-secondary);
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-input__wrapper),
:deep(.el-select__wrapper),
:deep(.el-input-number) .el-input__wrapper {
  min-height: 28px;
}

:deep(.el-color-picker__trigger) {
  height: 28px;
  width: 100%;
  border-radius: 4px;
}

:deep(.el-checkbox) {
  height: 28px;
  display: flex;
  align-items: center;
}
</style>
