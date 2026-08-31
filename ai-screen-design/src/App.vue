<script setup lang="ts">
/**
 * 两种模式 实现撤销编辑
 * 1.备忘录模式：存快照，深拷贝。缺点：内存占用大
 * 2.命令模式：存命令 保存修改的基础信息 => {target: 'app.vue',key: 15, value: 'a', oldValue: null}，执行命令。缺点：需要实现撤销命令
 */

</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
