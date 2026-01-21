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
    <ActivityIcon class="size-10" />
    <AlertCircleIcon height="40" color="red" />
    <CloudDownloadIcon class="size-10" />
    <AttachmentIcon class="size-10" />
    <FolderIcon class="size-10" />
    <NetworkIcon width="40" height="40" />
  </main>
</template>
