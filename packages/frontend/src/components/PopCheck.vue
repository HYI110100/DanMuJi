<!--
 * @Author: HYI
 * @Date: 2024-10-30 14:19:11
 * @LastEditors: HYI
 * @LastEditTime: 2024-10-30 14:19:11
 * @Description: 带移入提示的复选框
-->
<script setup lang="ts">
import { defineProps, useSlots } from "vue";

const props = defineProps<{
  tip?: string | number;
}>();

const slots = useSlots();
</script>

<template>
  <n-checkbox>
    <template v-if="props.tip || slots.popover">
      <Pop trigger="hover">
        <template #pop>
          <slot />
        </template>
          <slot name="popover">
            <div v-html="props.tip" />
          </slot> 
      </Pop>
    </template>
    <template v-else>
      <slot />
    </template>
  </n-checkbox>
</template>
