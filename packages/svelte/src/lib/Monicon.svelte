<script lang="ts">
  import type { Icon } from "@monicon/core";
  import type { SVGAttributes } from "svelte/elements";
  import { getIconDetails, type MoniconProps } from "@monicon/icon-loader";

  interface $$Props extends Omit<SVGAttributes<any>, "name">, MoniconProps {
    name: string;
    size?: number;
    color?: string;
  }

  export let name: MoniconProps["name"];
  export let size: MoniconProps["size"] = undefined;
  export let color: MoniconProps["color"] = undefined;

  let details: ReturnType<typeof getIconDetails> | null = null;

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

    details = getIconDetails({ name, color, size }, icons ?? {});
  };

  $: $$props, loadIcons();
</script>

{#if details}
  <svg
    role="button"
    tabindex="0"
    {...details.attributes}
    {...$$props}
    on:click
    on:dblclick
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
    on:mouseenter
    on:mouseleave
    on:mouseover
    on:mouseout
    on:mousemove
    on:mousedown
    on:mouseup
    on:select
  >
    {@html details.innerHtml}
  </svg>
{/if}
