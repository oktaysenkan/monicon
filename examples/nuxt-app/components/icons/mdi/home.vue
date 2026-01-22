<script setup lang="ts">
const props = defineProps();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-bind="props">
    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
  </svg>
</template>

<script lang="ts">
export default { name: "MdiHomeIcon" };
</script>
