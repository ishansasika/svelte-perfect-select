<script lang="ts">
	import type { ComponentMetadata } from '$lib/types';
	import { theme, THEME_COLORS } from '$stores/theme';
	import ThemeSwitch from '$components/common/ThemeSwitch.svelte';
	import Select from '@select/Select.svelte';

	export let metadata: ComponentMetadata;
	export let props: Record<string, any>;

	let value: any = props.isMulti ? [] : null;

	// Default options for the select
	const defaultOptions = [
		{ id: 'sl', label: 'Sri Lanka', value: 'sl' },
		{ id: 'ind', label: 'India', value: 'ind' },
		{ id: 'pak', label: 'Pakistan', value: 'pak' },
		{ id: 'usa', label: 'United States', value: 'usa' },
		{ id: 'uk', label: 'United Kingdom', value: 'uk' },
		{ id: 'can', label: 'Canada', value: 'can' },
		{ id: 'aus', label: 'Australia', value: 'aus' }
	];
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-semibold">Preview</h3>
		<ThemeSwitch />
	</div>

	<div
		class="p-8 rounded-lg border-2 border-gray-200 min-h-[200px] flex items-center justify-center transition-colors"
		style="background-color: {THEME_COLORS[$theme]}"
	>
		<div class="w-full max-w-md">
			<Select options={defaultOptions} bind:value {...props} />
		</div>
	</div>

	{#if value}
		<div class="text-sm text-gray-600">
			<strong>Selected value:</strong>
			<code class="ml-2 px-2 py-1 bg-gray-100 rounded">{JSON.stringify(value)}</code>
		</div>
	{/if}
</div>
