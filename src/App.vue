<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-dialog-provider>
          <n-notification-provider>
              <n-message-provider>
                  <router-view></router-view>
              </n-message-provider>
          </n-notification-provider>
      </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN } from "naive-ui";
import { NNotificationProvider, NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui';

</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
