<script lang="ts">
	import { getIconDetails, type MoniconProps } from '@monicon/icon-loader';

	let { name, color, strokeWidth, size, ...props }: MoniconProps = $props();
	let details = $derived(getIconDetails({ name, color, strokeWidth, size }));
</script>

{#if details}
	<svg {...details.attributes} {...props}>
		{@html details.innerHtml}
	</svg>
{/if}
