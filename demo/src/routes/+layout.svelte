<script lang="ts">
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import MobileMenu from '$components/layout/MobileMenu.svelte';
	import { sidebarOpen } from '$stores/sidebar';
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
	<Header />

	<main class="flex-1">
		<slot />
	</main>

	<Footer />

	{#if $sidebarOpen}
		<MobileMenu />
	{/if}
</div>
