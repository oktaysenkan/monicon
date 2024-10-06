<script lang="ts">
  import type { Icon } from "@monicon/core";
  import { getIconDetails } from "@monicon/icon-loader";

  export let name: string;
  export let size: number | undefined = undefined;
  export let color: string | undefined = undefined;

  let details: ReturnType<typeof getIconDetails> | null = null;

  const importIcons = () =>
    new Promise<Record<string, Icon> | null>(async (resolve) => {
      try {
        // @ts-ignore
        const iconsImport = await import("icon-runtime");
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

  $: name, size, color, loadIcons();
</script>

{#if details}
  <svg {...details.attributes}>
    {@html details.innerHtml}
  </svg>
{/if}
