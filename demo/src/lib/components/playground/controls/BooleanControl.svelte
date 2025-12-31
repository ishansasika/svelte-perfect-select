<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: boolean;
	export let description: string = '';

	const dispatch = createEventDispatcher();

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch('change', target.checked);
	}
</script>

<div class="control-item p-4 border border-gray-200 rounded-lg bg-white">
	<div class="flex items-center justify-between mb-2">
		<label class="text-sm font-medium text-gray-700">{label}</label>
		<input
			type="checkbox"
			checked={value}
			on:change={handleChange}
			class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
		/>
	</div>
	{#if description}
		<p class="text-xs text-gray-500 mt-1">{description}</p>
	{/if}
</div>
