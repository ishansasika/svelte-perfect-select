<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ControlConfig } from '$lib/types';

	export let label: string;
	export let value: any;
	export let description: string = '';
	export let config: ControlConfig;

	const dispatch = createEventDispatcher();

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		dispatch('change', target.value);
	}
</script>

<div class="control-item p-4 border border-gray-200 rounded-lg bg-white">
	<div class="mb-2">
		<label class="text-sm font-medium text-gray-700">{label}</label>
	</div>
	<select
		{value}
		on:change={handleChange}
		class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
	>
		{#if config.options}
			{#each config.options as option}
				{#if typeof option === 'string'}
					<option value={option}>{option}</option>
				{:else}
					<option value={option.value}>{option.label}</option>
				{/if}
			{/each}
		{/if}
	</select>
	{#if description}
		<p class="text-xs text-gray-500 mt-2">{description}</p>
	{/if}
</div>
