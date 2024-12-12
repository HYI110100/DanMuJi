<!--
 * @Author: HYI
 * @Date: 2024-10-31 16:55:58
 * @LastEditors: HYI
 * @LastEditTime: 2024-10-31 16:55:58
 * @Description: 
-->
<script setup lang="ts">

</script>

<template>
<n-popover trigger="hover">
  <template #trigger>
    <span>
      <span>
        <slot name="pop" />
      </span><span class="i-majesticons:question-mark-circle text-12px text-gray" />
    </span>
  </template>
  <slot />
</n-popover>
</template>
