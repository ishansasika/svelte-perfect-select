<script lang="ts">
	import type { ComponentMetadata } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import BooleanControl from './controls/BooleanControl.svelte';
	import RangeControl from './controls/RangeControl.svelte';
	import SelectControl from './controls/SelectControl.svelte';
	import TextControl from './controls/TextControl.svelte';
	import NumberControl from './controls/NumberControl.svelte';
	import ColorControl from './controls/ColorControl.svelte';

	export let metadata: ComponentMetadata;
	export let props: Record<string, any>;

	const dispatch = createEventDispatcher();

	function handleUpdate(propName: string, value: any) {
		dispatch('update', { name: propName, value });
	}

	function handleReset() {
		dispatch('reset');
	}

	// Group props by category
	const categories = ['basic', 'styling', 'advanced', 'behavior'] as const;
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-semibold">Controls</h3>
		<button
			on:click={handleReset}
			class="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
		>
			Reset
		</button>
	</div>

	<div class="space-y-6 max-h-[600px] overflow-y-auto pr-2">
		{#each categories as category}
			{@const categoryProps = metadata.propDefinitions.filter((p) => p.category === category)}
			{#if categoryProps.length > 0}
				<div>
					<h4 class="text-sm font-semibold text-gray-700 uppercase mb-3 capitalize">{category}</h4>
					<div class="space-y-3">
						{#each categoryProps as propDef}
							{#if propDef.control.type === 'boolean'}
								<BooleanControl
									label={propDef.name}
									value={props[propDef.name]}
									description={propDef.description}
									on:change={(e) => handleUpdate(propDef.name, e.detail)}
								/>
							{:else if propDef.control.type === 'range'}
								<RangeControl
									label={propDef.name}
									value={props[propDef.name]}
									description={propDef.description}
									config={propDef.control}
									on:change={(e) => handleUpdate(propDef.name, e.detail)}
								/>
							{:else if propDef.control.type === 'select'}
								<SelectControl
									label={propDef.name}
									value={props[propDef.name]}
									description={propDef.description}
									config={propDef.control}
									on:change={(e) => handleUpdate(propDef.name, e.detail)}
								/>
							{:else if propDef.control.type === 'text'}
								<TextControl
									label={propDef.name}
									value={props[propDef.name]}
									description={propDef.description}
									on:change={(e) => handleUpdate(propDef.name, e.detail)}
								/>
							{:else if propDef.control.type === 'number'}
								<NumberControl
									label={propDef.name}
									value={props[propDef.name]}
									description={propDef.description}
									config={propDef.control}
									on:change={(e) => handleUpdate(propDef.name, e.detail)}
								/>
							{:else if propDef.control.type === 'color'}
								<ColorControl
									label={propDef.name}
									value={props[propDef.name]}
									description={propDef.description}
									on:change={(e) => handleUpdate(propDef.name, e.detail)}
								/>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
