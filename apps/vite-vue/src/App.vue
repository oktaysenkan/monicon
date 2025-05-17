<script setup lang="ts">
import ActivityIcon from "./components/icons/feather/activity.vue";
import AlertCircleIcon from "./components/icons/feather/alert-circle.vue";
import CloudDownloadIcon from "./components/icons/lucide/cloud-download.vue";
import AttachmentIcon from "./components/icons/remote/attachment.vue";
import FolderIcon from "./components/icons/local/folder.vue";
import NetworkIcon from "./components/icons/json/network.vue";
</script>

<template>
  <main>
    <ActivityIcon height="48" width="48" color="skyblue" />
    <AlertCircleIcon height="48" color="red" />
    <CloudDownloadIcon height="48" color="green" />
    <AttachmentIcon height="48" width="48" color="blue" />
    <FolderIcon height="48" color="purple" />
    <NetworkIcon height="48" color="orange" />
  </main>
</template>
