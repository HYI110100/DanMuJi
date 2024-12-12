<!--
 * @Author: HYI
 * @Date: 2024-10-29 10:45:06
 * @LastEditors: HYI
 * @LastEditTime: 2024-10-29 10:45:06
 * @Description: 全局加载
-->
<script setup lang="ts">
const props = defineProps<{
  show?:boolean
}>()
</script>

<template>
<div v-if="props.show" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>