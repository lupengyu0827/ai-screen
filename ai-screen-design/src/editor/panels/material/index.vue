<script setup lang="ts">
import { getMaterialsByGroup, getMaterialGroups } from '@/materials';
import MaterialItem from './components/MaterialItem.vue'
defineComponent({
  name: 'MaterialPanel',
})

const activeGroup = ref('charts')

const groups = getMaterialGroups()

const currentGroupMaterials = computed(() => {
  return getMaterialsByGroup(activeGroup.value)
})
</script>

<template>
  <div class="material-panel flex">
    <div class="nav w-50">
      <div v-for="item in groups" :key="item.key" :class="{ 'active': activeGroup === item.key }"
        @click="activeGroup = item.key">
        <span>
          <Icon :icon="item.icon" width="16"></Icon>
        </span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="material-list flex-1 p-10 overflow-auto">
      <MaterialItem class="mt-10" v-for="item in currentGroupMaterials" :key="item.name" :material="item">
      </MaterialItem>
    </div>
  </div>
</template>

<style scoped lang="scss">
.material-panel {
  background: bg-mix(20);

  .nav {
    border-right: 1px solid var(--border-color);
    cursor: pointer;

    div {
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;

      &.active {
        background-color: bg-mix(70);
        cursor: pointer;
      }
    }

  }
}
</style>
