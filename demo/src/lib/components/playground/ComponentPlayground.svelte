<script lang="ts">
	import type { ComponentMetadata } from '$lib/types';
	import PreviewArea from './PreviewArea.svelte';
	import ControlsPanel from './ControlsPanel.svelte';
	import CodeDisplay from './CodeDisplay.svelte';
	import { generateFullExample } from '$utils/codeGenerator';

	export let metadata: ComponentMetadata;

	let props = { ...metadata.defaultProps };

	$: generatedCode = generateFullExample(metadata.name, props, { isMulti: props.isMulti });

	function updateProp(event: CustomEvent<{ name: string; value: any }>) {
		props = { ...props, [event.detail.name]: event.detail.value };
	}

	function resetProps() {
		props = { ...metadata.defaultProps };
	}
</script>

<div class="space-y-8">
	<!-- Component Info -->
	<div>
		<h1 class="text-3xl font-bold mb-2">{metadata.name}</h1>
		<p class="text-gray-600 text-lg">{metadata.description}</p>
	</div>

	<!-- Two-column layout: Preview + Controls -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Left: Preview -->
		<div class="space-y-4">
			<PreviewArea {metadata} {props} />
		</div>

		<!-- Right: Controls -->
		<div class="space-y-4">
			<ControlsPanel {metadata} {props} on:update={updateProp} on:reset={resetProps} />
		</div>
	</div>

	<!-- Examples Section -->
	{#if metadata.examples && metadata.examples.length > 0}
		<div class="space-y-4">
			<h3 class="text-lg font-semibold">Quick Examples</h3>
			<div class="flex flex-wrap gap-2">
				{#each metadata.examples.slice(0, 8) as example}
					<button
						on:click={() => (props = { ...metadata.defaultProps, ...example.props })}
						class="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-md transition-colors border border-blue-200"
					>
						{example.name}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Code Display (Full Width) -->
	<CodeDisplay code={generatedCode} />
</div>
