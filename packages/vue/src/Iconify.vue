<script setup lang="ts">
import { defineProps, computed } from "vue";
import { parseSync, stringify } from "svgson";
// @ts-ignore
import icons from "oktay";
// @ts-ignore
import { fallbackIcon } from "@oktaytest/core/constants";

export type IconifyProps = {
  name: string;
  size?: number;
  color?: string;
};

const props = defineProps<IconifyProps>();

const icon = computed(() => {
  const foundIcon = icons[props.name];

  if (!foundIcon) {
    console.warn(
      `[Iconify] The icon "${props.name}" is missing from the configuration. To resolve this, ensure it is added to the 'icons' array within the Iconify plugin's configuration.`
    );

    return fallbackIcon;
  }

  return foundIcon;
});

const parsed = computed(() => parseSync(icon.value.svg));

const children = computed(() =>
  parsed.value.children.map((child) => {
    if (child.name !== "path" || !child.attributes.fill || !props.color)
      return child;

    child.attributes.fill = props.color;

    return child;
  })
);

// @ts-ignore
const html = computed(() => stringify(children.value));

const ratio = computed(() => icon.value.width / icon.value.height);

const height = computed(() =>
  props.size ? Number(props.size) : icon.value.height
);

const width = computed(() =>
  props.size ? Number(props.size) * ratio.value : icon.value.width
);

const attributes = computed(() => {
  return {
    ...parsed.value.attributes,
    width: width.value,
    height: height.value,
  };
});
</script>

<template>
  <svg v-html="html" v-bind="attributes"></svg>
</template>
