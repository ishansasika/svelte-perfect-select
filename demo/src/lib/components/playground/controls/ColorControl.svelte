<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: string;
	export let description: string = '';

	const dispatch = createEventDispatcher();

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch('change', target.value);
	}
</script>

<div class="control-item p-4 border border-gray-200 rounded-lg bg-white">
	<div class="mb-2">
		<label class="text-sm font-medium text-gray-700">{label}</label>
	</div>
	<div class="flex items-center gap-3">
		<input
			type="color"
			{value}
			on:input={handleInput}
			class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
		/>
		<input
			type="text"
			{value}
			on:input={handleInput}
			class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
			placeholder="#000000"
		/>
	</div>
	{#if description}
		<p class="text-xs text-gray-500 mt-2">{description}</p>
	{/if}
</div>
