<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import {
  getIconDetails,
  IconDetails,
  MoniconProps,
} from "@monicon/icon-loader";

const props = defineProps<MoniconProps>();

const details = ref<IconDetails | null>(null);

const loadIcons = () => {
  details.value = getIconDetails({
    name: props.name,
    size: props.size,
    color: props.color,
    strokeWidth: props.strokeWidth,
  });
};

watch(props, loadIcons, { immediate: true });
</script>

<template>
  <svg
    v-if="details"
    v-html="details.innerHtml"
    v-bind="details.attributes"
  ></svg>
</template>
