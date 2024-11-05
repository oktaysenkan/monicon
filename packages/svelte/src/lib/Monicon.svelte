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
  export let strokeWidth: MoniconProps["strokeWidth"] = undefined;

  $: details = getIconDetails({ name, color, size, strokeWidth });
</script>

{#if details}
  <svg {...details.attributes} {...$$props}>
    {@html details.innerHtml}
  </svg>
{/if}
