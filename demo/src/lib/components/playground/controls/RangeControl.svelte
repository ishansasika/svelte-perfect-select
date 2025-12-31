<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ControlConfig } from '$lib/types';

	export let label: string;
	export let value: number;
	export let description: string = '';
	export let config: ControlConfig;

	const dispatch = createEventDispatcher();

	const min = config.min ?? 0;
	const max = config.max ?? 100;
	const step = config.step ?? 1;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch('change', Number(target.value));
	}
</script>

<div class="control-item p-4 border border-gray-200 rounded-lg bg-white">
	<div class="flex justify-between items-center mb-2">
		<label class="text-sm font-medium text-gray-700">{label}</label>
		<span class="text-sm text-gray-600 font-mono">{value}</span>
	</div>
	<input
		type="range"
		{min}
		{max}
		{step}
		{value}
		on:input={handleInput}
		class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
	/>
	{#if description}
		<p class="text-xs text-gray-500 mt-2">{description}</p>
	{/if}
</div>
