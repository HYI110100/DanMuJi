<!--
 * @Author: HYI
 * @Date: 2024-12-12 18:12:10
 * @LastEditors: HYI
 * @LastEditTime: 2024-12-12 18:12:10
 * @Description: 发送弹幕
-->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { postSendLiveMsg } from '~/config/biliApiFn';
import { toNumber } from '~/utils';

const route = useRoute();
const roomId = toNumber( `${route.params.id || 0}`)
const msg = ref('')
const sendLiveMsg = postSendLiveMsg()
const cookieValues = useCookie<'bili_jct'>()
const bili_jct = cookieValues.getCookie('bili_jct')
function headerSendLiveMsg() {
  sendLiveMsg.start({
      roomId,
      csrf: bili_jct || '',
      msg: msg.value,
  })
}
</script>

<template>
  <div class="p-3">
    <n-input v-model:value="msg" />
    <n-button @click="headerSendLiveMsg">发送弹幕</n-button>
  </div>
</template>
