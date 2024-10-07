<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from "vue";
import {
  getIconDetails,
  IconDetails,
  MoniconProps,
} from "@monicon/icon-loader";

const props = defineProps<MoniconProps>();

const details = ref<IconDetails | null>(null);

const loadIcons = async () => {
  details.value = await getIconDetails({
    name: props.name,
    size: props.size,
    color: props.color,
    strokeWidth: props.strokeWidth,
  });
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
