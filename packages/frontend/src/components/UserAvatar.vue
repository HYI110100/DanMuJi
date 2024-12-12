<!--
 * @Author: HYI
 * @Date: 2024-10-28 17:04:48
 * @LastEditors: HYI
 * @LastEditTime: 2024-10-28 17:04:48
 * @Description: 头像
-->
<script setup lang="ts">
import { getImageUrl } from "~/utils";
const props = defineProps<{
  size?: number;
  avatar: string;
  pendant?: string;
}>();
const s = props.size || 30;
</script>

<template>
  <div
    class="relative flex-center"
    :style="{ width: `${s}px`, height: `${s}px` }"
  >
    <n-avatar
      round
      :size="props.pendant ? s * 0.67 : s"
      :src="`${
        props.avatar ? getImageUrl(props.avatar) : '/userDefaultAvatar.png'
      }`"
      fallback-src="/userDefaultAvatar.png"
    />
    <div
      class="bg-center bg-no-repeat bg-contain w-full h-full absolute top-0 left-0"
      :style="{
        backgroundImage: props.pendant
          ? `url(${getImageUrl(props.pendant)})`
          : '',
      }"
    />
  </div>
</template>
