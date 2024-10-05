<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from "vue";
import { getIconDetails, IconifyProps } from "@oktaytest/icon-loader";

const props = defineProps<IconifyProps>();

const details = ref<ReturnType<typeof getIconDetails> | null>(null);

const loadIcons = async () => {
  // @ts-ignore
  const iconsImport = await import("oktay");
  const icons = iconsImport.default ?? iconsImport;
  details.value = getIconDetails(props, icons);
};

watch(props, loadIcons);
onMounted(loadIcons);
</script>

<template>
  <svg
    v-if="details"
    v-html="details.innerHtml"
    v-bind="details.attributes"
  ></svg>
</template>
