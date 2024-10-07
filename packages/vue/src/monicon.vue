<script setup lang="ts">
import { defineProps, ref, watch, onMounted } from "vue";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";
import { Icon } from "@monicon/core";

const props = defineProps<MoniconProps>();

const details = ref<ReturnType<typeof getIconDetails> | null>(null);

const importIcons = () =>
  new Promise<Record<string, Icon> | null>(async (resolve) => {
    try {
      // @ts-ignore
      const iconsImport = await import("@monicon/runtime");
      const icons = iconsImport.default ?? iconsImport;

      return resolve(icons);
    } catch (error) {
      return resolve(null);
    }
  });

const loadIcons = async () => {
  const icons = await importIcons();

  details.value = getIconDetails(
    { name: props.name, size: props.size, color: props.color },
    icons ?? {}
  );
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
