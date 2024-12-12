<!--
 * @Author: HYI
 * @Date: 2024-11-05 17:32:32
 * @LastEditors: HYI
 * @LastEditTime: 2024-11-05 17:32:32
 * @Description: 首页
-->
<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import router from "~/router";
import { onlyAllowNumber } from "~/utils";

const { roomInfoData, loading, roomId, getRoomData } = useGetRoomInfo()
const roomIdClone = useStorage("IndexInputRoomId", "");
roomId.value = roomIdClone.value
function handlingStateChanges() {
  roomIdClone.value = roomId.value
  getRoomData()
}
function handleKeyUp(e: KeyboardEvent) {
  if (e.key === "Enter") {
    handlingStateChanges()
  }
}
function headerOpenBiliLive() {
  if (!roomId.value) {
    $message.warning('请输入房间号')
    return
  }
  window.open(`https://live.bilibili.com/${roomId.value}`, "_blank");
}
async function headerConnect() {
  if (!roomId.value) {
    $message.warning('请输入房间号')
    return
  }
  // if ("documentPictureInPicture" in window) {
  //   // 获取将要放入 PiP 窗口的 DOM 元素
  //   const pipContent = document.getElementById("pipContent");
  //   // 请求创建一个 PiP 窗口
  //   const pipWindow = await window.documentPictureInPicture.requestWindow({
  //     width: 200, // 设置窗口的宽度
  //     height: 300, // 设置窗口的高度
  //   });
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'src/styles/main.css';  // 引入外部 CSS 文件
  //   pipWindow.document.head.appendChild(link);
  //   // 将原始元素添加到 PiP 窗口中
  //   pipWindow.document.body.appendChild(pipContent);
  // } else {
  router.push(`/dashboard/${roomId.value}`);
  // }
}
// await getRoomData()
</script>

<template>
  <div class="w-full h-full flex-center">
    <div class="max-w-440px w-full px-20px">
      <n-input-group class="mb-20px">
        <n-input type="text" :allow-input="onlyAllowNumber" v-model:value="roomId"  @keyup="handleKeyUp" placeholder="请输入房间ID"
          :disabled="loading" />
        <n-button :loading="loading" @click="handlingStateChanges" type="info">
          <div class="i-majesticons:search-line text-22px" />
        </n-button>
      </n-input-group>
      <div v-if="roomInfoData">
        <n-card content-class="flex gap-10px flex-wrap items-center" :title="roomInfoData?.title || '-'">
          <template #cover>
            <img v-req-proxy :src="roomInfoData?.cover || ''" />
          </template>
          <UserAvatar :size="58" :avatar="roomInfoData?.info.face" :pendant="roomInfoData?.info.pendant" />
          <div>
            <span>{{ roomInfoData.info.uname }}</span>
            <span class="text-12px font-600">
              [UID: {{ roomInfoData.info.uid }}]</span>
            <div class="flex flex-wrap gap-8px mt-6px">
              <div v-if="roomInfoData.status === 1"
                class="px-4px bg-pink rounded leading-15px text-10px text-white flex items-center gap-5px">
                <img data-v-766b7086="" class="w-12px" src="/live.gif" alt="live" />
                直播中
              </div>
              <n-tag type="error" size="small" round :bordered="false"
                v-if="roomInfoData && roomInfoData.info.followerNum >= 0">
                {{ roomInfoData?.info.followerNum }}
                <template #icon>
                  <div class="i-majesticons:heart" />
                </template>
              </n-tag>
              <n-tag type="success" size="small" round :bordered="false" v-if="roomInfoData?.info.medalName">
                {{ roomInfoData?.info.medalName }}
                <template #icon>
                  <div class="i-majesticons:tag-line" />
                </template>
              </n-tag>
              <n-tag type="info" size="small" round :bordered="false" v-if="roomInfoData?.areaName">
                {{ roomInfoData?.areaName }}
                <template #icon>
                  <div class="i-majesticons:globe-grid" />
                </template>
              </n-tag>
            </div>
          </div>
          <template #action>
            公告： {{ roomInfoData?.announcement.content || "-" }}
          </template>
        </n-card>
      <div class="flex flex-wrap justify-end mt-10px gap-10px">
        <n-button dashed icon-placement="right" @click="headerOpenBiliLive">
          <template #icon>
            <span class="i-majesticons:logout-half-circle-line" /> </template>前往直播间
        </n-button>
        <n-button icon-placement="right" strong secondary @click="headerConnect">
          <template #icon>
            <span class="i-majesticons:link" />
          </template>
          连接到弹幕
        </n-button>
      </div>
      </div>
      <a target="_blank" href="https://link.bilibili.com/p/center/index#/my-room/start-live"
        class="flex items-center justify-end">
        <n-button type="error" text dashed icon-placement="right">
          <template #icon>
            <span class="i-majesticons:door-exit-line" /> </template>获取房间号
        </n-button>
      </a>
    </div>
  </div>

  <!-- <div id="pipContent" style="width: 100%; height: 100%;overflow: hidden;">
    <iframe id="pipFrame" width="100%" height="100%" :src="`/dashboard/${roomInfoData?.id}`" frameborder="0"></iframe>
  </div> -->
</template>
