<script setup lang="ts">
const props = defineProps();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-bind="props">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M22 12h-4l-3 9L9 3l-3 9H2"
    />
  </svg>
</template>

<script lang="ts">
export default { name: "FeatherActivityIcon" };
</script>
