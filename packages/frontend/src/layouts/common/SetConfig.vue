<!--
 * @Author: HYI
 * @Date: 2024-09-14 15:02:57
 * @LastEditors: HYI
 * @LastEditTime: 2024-09-14 15:02:57
 * @Description: 设置
-->
<script setup lang="ts">
const active = ref(false)

const appStore = useAppStore();
const batteryUnit = '电池'
</script>

<template>
  <n-button text class="nav-tab-icon" @click="active = !active">
    <div class="text-21px i-majesticons:settings-cog" />
  </n-button>

  <n-drawer v-model:show="active" width="30vw" >
    <n-drawer-content title="设置" footer-class="p-0!">

      <!-- <n-divider class="mt-0!" dashed>基础</n-divider> -->
      <!-- ############## -->
      <n-divider title-placement="left" class="text-12px mt-0!">内容显示</n-divider>
      <n-space>
        <n-checkbox v-model:checked="appStore.sysConfig.showUsername">用户名</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showAvatar">头像</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showAvatarFrame">头像框</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showMedal">荣耀勋章</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showFanMedal">粉丝勋章</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showManagerMark">房管标记</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showNavyMark">大航海标记</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showRankMark">排行榜标记</n-checkbox>
      </n-space>
      <!-- ############## -->
      <n-divider title-placement="left" class="text-12px">消息通知</n-divider>
      <n-space>
        <n-checkbox v-model:checked="appStore.sysConfig.showDanMu">弹幕</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showGift">礼物</n-checkbox>
        <n-checkbox v-model:checked="appStore.sysConfig.showRedPacket">红包</n-checkbox>
        <PopCheck v-model:checked="appStore.sysConfig.showNavy" tip="上舰提醒（舰长、提督、总督）">大航海</PopCheck>
        <n-checkbox v-model:checked="appStore.sysConfig.showHighlightMessage">醒目留言</n-checkbox>
        <PopCheck v-model:checked="appStore.sysConfig.showFreeGifts" tip="免费礼物为银瓜子。">免费礼物</PopCheck>
        <PopCheck v-model:checked="appStore.sysConfig.showInteractionEvents" tip="互动事件包括 关注、分享、点赞。">互动事件</PopCheck>
        <PopCheck v-model:checked="appStore.sysConfig.showSystemMessages" tip="系统消息包括 用户禁言、直播间警告、直播间切断。<br/>关闭后页同时隐藏 [弹幕服务器连接提示]">系统消息</PopCheck>
        <n-checkbox v-model:checked="appStore.sysConfig.showUserEnter">用户进入直播间</n-checkbox>
      </n-space>
      <!-- ############## -->
      <n-divider title-placement="left" class="text-12px">显示条件</n-divider>
      <n-space>
        <div>
          <Pop trigger="hover">
            <template #pop>
              比例转换
            </template>
            用于将{{batteryUnit}}转为定义的单位，电池数或标识数为空将不转换。
          </Pop>
          <n-input-group >
            <n-input-number :show-button="false"  v-model:value="appStore.sysConfig.batteryToUnitConversion.battery" :placeholder="`请输入${batteryUnit}数`" />
            <n-input-group-label>({{ batteryUnit }})</n-input-group-label>
            <n-input-group-label>=</n-input-group-label>
            <n-input-number :show-button="false"  v-model:value="appStore.sysConfig.batteryToUnitConversion.conversionNumber" placeholder="请输入转换数" />
            <n-input-group-label>（</n-input-group-label>
            <n-input  :style="{ width: '33%' }"  v-model:value="appStore.sysConfig.batteryToUnitConversion.unit" placeholder="请输入标识" />
            <n-input-group-label>）</n-input-group-label>
          </n-input-group>
        </div>
        <div>
          <Pop trigger="hover">
            <template #pop>
              隐藏弹幕（荣耀等级）
            </template>
            隐藏低于设定荣耀等级的弹幕。
          </Pop>
          <n-input-group >
            <n-input-group-label>隐藏低于</n-input-group-label>
            <n-input-number :show-button="false" v-model:value="appStore.sysConfig.hideDanMuByMedal" :min="0" />
            <n-input-group-label>荣耀等级的弹幕</n-input-group-label>
          </n-input-group>
        </div>
        <div>
          <Pop trigger="hover">
            <template #pop>
              隐藏弹幕（粉丝等级）
            </template>
            隐藏低于设定粉丝等级的弹幕。
          </Pop>
          <n-input-group >
            <n-input-group-label>隐藏低于</n-input-group-label>
            <n-input-number :show-button="false" v-model:value="appStore.sysConfig.hideDanMuByFanMedal" :min="0" />
            <n-input-group-label>粉丝等级的弹幕</n-input-group-label>
          </n-input-group>
        </div>
        <div>
          <Pop trigger="hover">
              <template #pop>
                隐藏礼物
              </template>
              隐藏低于设定{{ batteryUnit }}的礼物，仅限付费礼物。
            </Pop>
          <n-input-group >
            <n-input-group-label>隐藏低于</n-input-group-label>
            <n-input-number :show-button="false" v-model:value="appStore.sysConfig.hideGiftsBelowBattery" :min="0" />
            <n-input-group-label>{{ batteryUnit }}的礼物</n-input-group-label>
          </n-input-group>
        </div>
      </n-space>
    </n-drawer-content>

  </n-drawer>

</template>
