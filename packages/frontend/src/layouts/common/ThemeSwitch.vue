<!--
 * @Author: HYI
 * @Date: 2024-09-14 15:02:57
 * @LastEditors: HYI
 * @LastEditTime: 2024-09-14 15:02:57
 * @Description: 主题
-->
<script setup lang="ts">
const appStore = useAppStore();
</script>

<template>
  <n-button text class="nav-tab-icon" @click="appStore.theme.changeState">
    <div class="text-25px" :class="{ 'i-majesticons:sun': appStore.theme.currentState === 1, 'i-majesticons:moon': appStore.theme.currentState === 2 }" />
  </n-button>
</template>
