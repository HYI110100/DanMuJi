<!--
 * @Author: HYI
 * @Date: 2024-11-19 10:28:26
 * @LastEditors: HYI
 * @LastEditTime: 2024-11-19 10:28:26
 * @Description: 登录
-->
<script setup lang="tsx">
import QRCodeLogin from "~/components/Login/QRCodeLogin.vue";
import CodeEditor from "~/components/CodeEditor.vue";
import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
const userStore = useUserStore();
// 登录
const showLoginModal = ref(false);
const qrCodeLoginRef = ref<InstanceType<typeof QRCodeLogin> | null>(null);
function headerLogin() {
  showLoginModal.value = true;
  nextTick(() => {
    qrCodeLoginRef.value?.start();
  });
}
const codeEditorRef = ref<InstanceType<typeof CodeEditor> | null>(null);
function headerLoginSuccess() {
  $message.success("登录成功");
  showLoginModal.value = false;
  userStore.getUserInfo()
}
function headerLoginFail(msg: string) {
  $message.warning("登录失败：" + msg);
}
function headerLoginError() {
  $message.error("登录错误");
}
function headerLoginModalShow(v: boolean) {
  if (!v) {
    qrCodeLoginRef.value?.cancel();
  }
}
// 个人信息
const infoDrawer = ref(false);
function headerInfoDrawerShow() {
  infoDrawer.value = true
}
const options: DropdownMixedOption[] = [
  {
    label: "个人信息",
    key: "info",
    icon: () => {
      return <i class="i-majesticons:user-line" />
    }
  },
  {
    label: "退出登录",
    key: "logout",
    icon: () => {
      return <i class="i-majesticons:logout-line" />
    }
  }
]
function handleSelect(key: string | number) {
  switch (key) {
    case "info":
      headerInfoDrawerShow()
      break;
    case "logout":
      userStore.logout()
      break;
  }
}
</script>

<template>
  <n-dropdown v-if="userStore.userInfo" @select="handleSelect" :options="options">
    <UserAvatar :size="26" :avatar="userStore.userInfo?.avatar?.face || ''"
      :pendant="userStore.userInfo?.avatar?.pendant?.image" />
  </n-dropdown>

  <n-button v-else text class="nav-tab-icon" @click="headerLogin">
    <div class="text-21px i-majesticons:user" />
  </n-button>

  <n-modal v-model:show="showLoginModal" @update:show="headerLoginModalShow">
    <n-card class="w-320px h-320px" :bordered="false" size="small">
      <QRCodeLogin @error="headerLoginError" @success="headerLoginSuccess" @fail="headerLoginFail"
        ref="qrCodeLoginRef" />
    </n-card>
  </n-modal>

  <n-drawer v-model:show="infoDrawer" width="30vw">
    <n-drawer-content title="个人信息" footer-class="p-0!">
      <div>TODO: 个人信息UI</div>
      <CodeEditor ref="codeEditorRef" :value="JSON.stringify(userStore.userInfo || '')" language="json" />
    </n-drawer-content>
  </n-drawer>
</template>
