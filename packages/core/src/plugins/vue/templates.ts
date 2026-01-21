const tsTemplate = `<script setup lang="ts">
const props = defineProps()
</script>

<template>
  <%= it.code %>
</template>

<script lang="ts">
export default { name: "<%= it.name %>" };
</script>
`;

const jsTemplate = `<script setup>
const props = defineProps();
</script>

<template>
  <%= it.code %>
</template>

<script lang="ts">
export default { name: "<%= it.name %>" };
</script>
`;

const templates = {
  js: jsTemplate,
  ts: tsTemplate,
};

export default templates;
