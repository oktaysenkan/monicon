<script setup lang="ts">
const props = defineProps();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-bind="props">
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4m0 4h.01" />
    </g>
  </svg>
</template>

<script lang="ts">
export default { name: "AlertCircleIcon" };
</script>
