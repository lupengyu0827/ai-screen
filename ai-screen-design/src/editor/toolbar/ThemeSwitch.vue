<script setup lang="ts">
import { ref } from 'vue'
import { THEMES, applyTheme, getInitialTheme } from '@/composables/useTheme'

const current = ref(getInitialTheme())

function onSelect(key: string) {
  applyTheme(key)
  current.value = key
}
</script>

<template>
  <el-tooltip content="主题配色" placement="bottom" :show-after="300">
    <el-dropdown trigger="click" @command="onSelect" class="theme-switch">
      <button
        class="flex h-28 w-28 items-center justify-center rounded-md border border-transparent text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--border-color-light)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
      >
        <Icon icon="solar:palette-round-bold" width="16" height="16" />
      </button>
      <template #dropdown>
        <el-dropdown-menu class="!bg-[var(--bg-elevated)]">
          <el-dropdown-item
            v-for="t in THEMES"
            :key="t.key"
            :command="t.key"
            class="!text-[var(--text-secondary)] hover:!bg-[var(--bg-hover)]"
          >
            <div class="flex items-center gap-10">
              <span
                class="h-14 w-14 rounded-full border border-[var(--border-color-light)]"
                :style="{ background: `linear-gradient(135deg, ${t.accent}, ${t.bg})` }"
              ></span>
              <span>{{ t.name }}</span>
              <Icon
                v-if="t.key === current"
                icon="solar:check-circle-bold"
                width="15"
                height="15"
                class="text-[var(--accent)]"
              />
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<style scoped lang="scss">
.theme-switch {
  outline: none;
}
</style>
