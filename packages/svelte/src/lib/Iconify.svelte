<script lang="ts">
  import { getIconDetails } from "@oktaytest/icon-loader";

  export let name: string;
  export let size: number | undefined = undefined;
  export let color: string | undefined = undefined;

  let details: ReturnType<typeof getIconDetails> | null = null;

  const loadIcons = async () => {
    // @ts-ignore
    const iconsImport = await import("oktay");

    const icons = iconsImport.default ?? iconsImport;

    details = getIconDetails({ name, color, size }, icons);
  };

  $: name, size, color, loadIcons();
</script>

{#if details}
  <svg {...details.attributes}>
    {@html details.innerHtml}
  </svg>
{/if}
