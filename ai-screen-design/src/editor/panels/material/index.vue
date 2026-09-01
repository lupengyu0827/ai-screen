<script setup lang="ts">
import { getMaterialsByGroup, getMaterialGroups } from '@/materials';
import MaterialItem from './components/MaterialItem.vue'
defineComponent({
  name: 'MaterialPanel',
})

const activeGroup = ref('charts')

const groups = getMaterialGroups()

// 物料预览环境：提供空数据源注入，图表组件可正常渲染默认数据预览
provide('dataSources', ref([]))

const currentGroupMaterials = computed(() => {
  return getMaterialsByGroup(activeGroup.value)
})
</script>

<template>
  <div class="material-panel flex">
    <div class="nav">
      <div v-for="item in groups" :key="item.key" :class="{ 'active': activeGroup === item.key }"
        :title="item.name" @click="activeGroup = item.key">
        <span>
          <Icon :icon="item.icon" width="16"></Icon>
        </span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="material-list flex-1 p-10 overflow-auto">
      <div class="list-header">
        {{ groups.find((g) => g.key === activeGroup)?.name }}
        <span class="count">{{ currentGroupMaterials.length }}</span>
      </div>
      <MaterialItem class="mt-10" v-for="item in currentGroupMaterials" :key="item.name" :material="item">
      </MaterialItem>
    </div>
  </div>
</template>

<style scoped lang="scss">
.material-panel {
  background: var(--bg-panel);

  .nav {
    width: 52px;
    flex: none;
    border-right: 1px solid var(--border-color);
    cursor: pointer;

    div {
      height: 52px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      font-size: 11px;
      color: var(--text-secondary);
      transition: all 180ms ease;

      &:hover {
        color: var(--text-primary);
        background-color: var(--bg-hover);
      }

      &.active {
        color: var(--accent);
        background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.16), transparent);
        border-left: 2px solid var(--accent);
      }
    }
  }

  .material-list {
    background: var(--bg-panel);

    .list-header {
      height: 28px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);

      .count {
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        border-radius: 9px;
        background: var(--bg-elevated);
        color: var(--text-muted);
      }
    }
  }
}
</style>
