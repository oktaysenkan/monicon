<script lang="ts">
  import { parseSync, stringify } from "svgson";
  import { fallbackIcon } from "@oktaytest/core/constants";
  // @ts-ignore
  import icons from "oktay";

  export let name: string;
  export let size: number | undefined = undefined;
  export let color: string | undefined = undefined;

  $: icon = icons[name] || fallbackIcon;

  if (!icons[name]) {
    console.warn(
      `[Iconify] The icon "${name}" is missing from the configuration. To resolve this, ensure it is added to the 'icons' array within the Iconify plugin's configuration.`
    );
  }

  $: parsed = parseSync(icon.svg);

  $: children = parsed.children.map((child) => {
    if (child.name !== "path" || !child.attributes.fill || !color) return child;

    child.attributes.fill = color;
    return child;
  });

  $: html = stringify(children as any);

  $: ratio = icon.width / icon.height;

  $: height = size ? Number(size) : icon.height;

  $: width = size ? Number(size) * ratio : icon.width;

  $: attributes = {
    ...parsed.attributes,
    width,
    height,
  };
</script>

<svg {...attributes}>
  {@html html}
</svg>
