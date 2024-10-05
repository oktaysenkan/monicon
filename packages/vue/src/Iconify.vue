<script setup lang="ts">
import { defineProps, computed } from "vue";
import { getIconDetails, IconifyProps } from "@oktaytest/icon-loader";

// @ts-ignore
import icons from "oktay";

const props = defineProps<IconifyProps>();

const details = computed(() => getIconDetails(props, icons));
</script>

<template>
  <svg v-html="details.innerHtml" v-bind="details.attributes"></svg>
</template>
