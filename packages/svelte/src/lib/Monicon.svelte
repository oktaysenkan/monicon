<script lang="ts">
  import {
    getIconDetails,
    type IconDetails,
    type MoniconProps,
  } from "@monicon/icon-loader";

  interface $$Props extends MoniconProps {}

  export let name: MoniconProps["name"];
  export let size: MoniconProps["size"] = undefined;
  export let color: MoniconProps["color"] = undefined;

  let details: IconDetails | null = null;

  const loadIcons = async () => {
    details = await getIconDetails({ name, color, size });
  };

  $: $$props, loadIcons();
</script>

{#if details}
  <svg {...details.attributes} {...$$props}>
    {@html details.innerHtml}
  </svg>
{/if}
