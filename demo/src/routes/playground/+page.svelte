<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/playground/select', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Playground - Svelte Perfect Select</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<p class="text-center text-gray-600">Redirecting to playground...</p>
</div>
