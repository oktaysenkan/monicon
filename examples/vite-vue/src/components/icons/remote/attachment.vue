<script setup lang="ts">
const props = defineProps();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-bind="props">
    <path
      fill="currentColor"
      d="m14.829 7.757l-5.657 5.657a1 1 0 1 0 1.414 1.414l5.657-5.656A3 3 0 0 0 12 4.929l-5.657 5.657a5 5 0 0 0 7.071 7.07L19.071 12l1.414 1.414l-5.656 5.657a7 7 0 0 1-9.9-9.9l5.657-5.656a5 5 0 0 1 7.071 7.07L12 16.244A3 3 0 0 1 7.758 12l5.656-5.657z"
    />
  </svg>
</template>

<script lang="ts">
export default { name: "RemoteAttachmentIcon" };
</script>
