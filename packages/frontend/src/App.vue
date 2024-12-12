<script setup lang="ts">
import { darkTheme, dateZhCN, GlobalThemeOverrides, zhCN } from "naive-ui";
import { applyCss } from "./utils";
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    textColor2: "#151515",
  },
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    textColor2: "#fff",
  },
};

const appStore = useAppStore()
applyCss(appStore.customCss)
</script>

<template>
  <n-config-provider
    :theme="appStore.theme.currentState === 2 ? darkTheme : null"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="w-full h-full"
    :theme-overrides="
      appStore.theme.currentState === 2
        ? darkThemeOverrides
        : lightThemeOverrides
    "
  >
    <Loading :show="appStore.loading" />
    <RouterView />
  </n-config-provider>
</template>
