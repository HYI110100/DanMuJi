<!--
 * @Author: HYI
 * @Date: 2024-11-27 09:34:25
 * @LastEditors: HYI
 * @LastEditTime: 2024-11-27 09:34:25
 * @Description: 二维码登录
-->
<script setup lang="ts">
import { getLoginByQR, getLoginQR } from "~/config/biliApiFn";

const emits = defineEmits(['success', 'fail', 'error']);
type QR_STATE = 0 | 1 | 2 | 3 | 4 | 5 | -1;
const QrStateMap: Record<QR_STATE, string> = {
  "-1": "已登录",
  0: "加载中...",
  1: "加载失败",
  2: "二维码未扫描",
  3: "二维码已失效",
  4: "二维码已扫描未确认",
  5: "错误",
};
const currentQrState = ref<QR_STATE>(0);
const qrUrl = ref("");
const loginQR = getLoginQR();
const loginByQR = getLoginByQR();
let requestLoginInterval: number | null = null;
function start() {
  currentQrState.value = 0;
  let requestLoginNum = 0;
  loginQR
    .start()
    .then((res) => {
      qrUrl.value = res.url;
      currentQrState.value = 2;
      requestLoginInterval = setInterval(() => {
        requestLoginNum++;
        loginByQR.cancel();
        loginByQR
          .start(res.qrcode_key)
          .then((loginRes) => {
            requestLoginNum = 0;
            switch (loginRes.code) {
              case 0: // 已扫码登录
                clearLoginInterval();
                currentQrState.value = -1;
                emits('success')
                break;
              case 86038: // 二维码已失效
                clearLoginInterval();
                currentQrState.value = 3;
                emits('fail', '二维码已失效')
                break;
              case 86090: // 二维码已扫描未确认
                currentQrState.value = 4;
                break;
              case 86101: // 二维码未扫描
                currentQrState.value = 2;
                break;
              default:
                clearLoginInterval();
                currentQrState.value = 5;
                emits('fail', `未知状态 Code ${loginRes.code}}`)
                break;
            }
          })
          .catch(() => {
            if (requestLoginNum >= 3) {
              clearLoginInterval();
              currentQrState.value = 5;
              emits('error')
            }
          });
      }, 2000);
    })
    .catch(() => {
      currentQrState.value = 5;
      emits('error')
    });
}
function clearLoginInterval() {
  requestLoginInterval && clearInterval(requestLoginInterval);
  requestLoginInterval = null;
}
function handlingLoginsByTcy() {
  if (![1, 3, 4].includes(currentQrState.value)) {
    return;
  }
  start();
}
function cancel() {
  qrUrl.value = "";
  clearLoginInterval();
  loginQR.cancel();
  loginByQR.cancel();
}
defineExpose({ cancel, start });
</script>

<template>
  <div class="relative w-full h-full">
    <n-qr-code
      :size="260"
      class="p-0! position-center z-100"
      :value="qrUrl"
      error-correction-level="Q"
    />
    <div
      v-if="currentQrState !== 2"
      class="select-none relative h-full z-101 bg-#fff/60 text-stroke-sm text-shadow-md text-stroke-#fff/50 text-24px font-600 flex-center"
      :class="{
        'cursor-pointer': [1, 3, 4].includes(currentQrState),
      }"
      @click="handlingLoginsByTcy"
    >
      <div
        v-if="[1, 3, 4].includes(currentQrState)"
        class="i-majesticons:refresh-line text-38px"
      />
      {{ QrStateMap[currentQrState] }}
    </div>
  </div>
</template>
