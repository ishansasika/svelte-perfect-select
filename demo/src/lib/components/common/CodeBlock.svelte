<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	export let code: string;
	export let language: string = 'svelte';
	export let showCopy: boolean = true;
</script>

<div class="relative">
	{#if showCopy}
		<div class="absolute top-4 right-4 z-10">
			<CopyButton text={code} />
		</div>
	{/if}

	<pre
		class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto"><code class="text-sm">{code}</code></pre>
</div>

<style>
	pre {
		font-family: 'Fira Code', 'Courier New', monospace;
		line-height: 1.5;
	}
</style>
