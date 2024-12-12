<!--
 * @Author: HYI
 * @Date: 2024-10-29 09:43:46
 * @LastEditors: HYI
 * @LastEditTime: 2024-10-29 09:43:46
 * @Description: 布局
-->
<script setup lang="ts">
import SetConfig from './common/SetConfig.vue'
import ThemeSwitch from './common/ThemeSwitch.vue'
import UserInfo from './common/UserInfo.vue'
</script>

<template>
  <n-layout  class="w-full h-full">
    <n-layout-header>
      <div class="flex justify-between items-center py-10px px-15px">
        <div>
          <VersionDisplay />
        </div>
        <div class="gap-10px flex-center">
          <slot name="header" />
          <ThemeSwitch />
          <SetConfig />
          <UserInfo />
        </div>
      </div>
    </n-layout-header>
    <n-layout-content class="w-full h-[calc(100%-50px)]">
      <RouterView />
    </n-layout-content>
  </n-layout>
</template>
