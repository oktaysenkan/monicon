<script lang="ts">
  import type { Icon } from "@oktaytest/core";
  import { getIconDetails } from "@oktaytest/icon-loader";

  export let name: string;
  export let size: number | undefined = undefined;
  export let color: string | undefined = undefined;

  // @ts-ignore
  import icons from "oktay";

  $: details = getIconDetails(
    { name, color, size },
    icons as Record<string, Icon>
  );
</script>

<svg {...details.attributes}>
  {@html details.innerHtml}
</svg>
