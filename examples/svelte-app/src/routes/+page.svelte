<script>
	import BadgeCheckIcon from '$lib/components/icons/feather/activity.svelte';
	import CloudDownloadIcon from '$lib/components/icons/lucide/cloud-download.svelte';
	import AccountIcon from '$lib/components/icons/mdi/account.svelte';
	import HomeIcon from '$lib/components/icons/mdi/home.svelte';
	import AtomIcon from '$lib/components/icons/logos/atom-icon.svelte';
	import ApacheLogo from '$lib/components/icons/logos/apache.svelte';
</script>

<main>
	<BadgeCheckIcon height={50} />
	<CloudDownloadIcon height={50} />
	<AccountIcon height={50} />
	<HomeIcon height={50} />
	<AtomIcon height={50} />
	<ApacheLogo height={50} />
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
		gap: 20px;
	}
</style>
