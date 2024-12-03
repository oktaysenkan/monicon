<script>
	import { Monicon } from '@monicon/svelte';
</script>

<main>
	<Monicon name="mdi:home" size={24} />
	<Monicon name="logos:active-campaign" />
	<Monicon name="logos:apache-superset-icon" />
	<Monicon name="invalid:icon" color="red" />
</main>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #242424;
		color: rgba(255, 255, 255, 0.87);
	}
</style>
