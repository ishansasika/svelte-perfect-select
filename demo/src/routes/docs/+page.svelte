<script lang="ts">
	import PropsTable from '$components/docs/PropsTable.svelte';
	import CodeBlock from '$components/common/CodeBlock.svelte';
	import SEO from '$components/common/SEO.svelte';
	import { SELECT_METADATA } from '$data/componentMetadata';

	const installCode = 'npm install svelte-perfect-select';

	const basicUsageCode = `<` + `script>
  import Select from 'svelte-perfect-select';

  let value = null;
  let options = [
    { id: 'opt1', label: 'Option 1', value: 'opt1' },
    { id: 'opt2', label: 'Option 2', value: 'opt2' },
  ];
</` + `script>

<Select {options} bind:value />`;

	const multiSelectCode = `<` + `script>
  import Select from 'svelte-perfect-select';

  let values = [];
  let options = [
    { id: 'opt1', label: 'Option 1', value: 'opt1' },
    { id: 'opt2', label: 'Option 2', value: 'opt2' },
    { id: 'opt3', label: 'Option 3', value: 'opt3' },
  ];
</` + `script>

<Select {options} bind:value={values} isMulti={true} />`;

	const propCategories = ['basic', 'styling', 'advanced', 'behavior'] as const;
</script>

<SEO
	title="Documentation"
	description="Complete API reference and documentation for Svelte Perfect Select"
	url="https://svelte-perfect-select-demo.vercel.app/docs"
/>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Table of Contents -->
	<nav class="mb-12 p-6 bg-blue-50 rounded-lg">
		<h2 class="text-lg font-semibold mb-4">Table of Contents</h2>
		<ul class="space-y-2">
			<li><a href="#installation" class="text-blue-600 hover:underline">Installation</a></li>
			<li><a href="#basic-usage" class="text-blue-600 hover:underline">Basic Usage</a></li>
			<li><a href="#props" class="text-blue-600 hover:underline">Props</a></li>
			<li><a href="#events" class="text-blue-600 hover:underline">Events</a></li>
			<li><a href="#examples" class="text-blue-600 hover:underline">Examples</a></li>
		</ul>
	</nav>

	<!-- Installation -->
	<section id="installation" class="mb-12">
		<h2 class="text-3xl font-bold mb-4">Installation</h2>
		<CodeBlock code={installCode} language="bash" />
	</section>

	<!-- Basic Usage -->
	<section id="basic-usage" class="mb-12">
		<h2 class="text-3xl font-bold mb-4">Basic Usage</h2>
		<p class="text-gray-600 mb-4">
			Import the Select component and bind it to a value. The component requires an options array
			with objects containing id, label, and value properties.
		</p>
		<CodeBlock code={basicUsageCode} language="svelte" />
	</section>

	<!-- Props -->
	<section id="props" class="mb-12">
		<h2 class="text-3xl font-bold mb-6">Props</h2>

		{#each propCategories as category}
			{@const categoryProps = SELECT_METADATA.propDefinitions.filter((p) => p.category === category)}
			{#if categoryProps.length > 0}
				<div class="mb-8">
					<h3 class="text-2xl font-semibold mb-4 capitalize">{category} Props</h3>
					<PropsTable props={categoryProps} />
				</div>
			{/if}
		{/each}
	</section>

	<!-- Events -->
	<section id="events" class="mb-12">
		<h2 class="text-3xl font-bold mb-4">Events</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full bg-white border border-gray-200 rounded-lg">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Event
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Detail
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Description
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					<tr>
						<td class="px-6 py-4 font-mono text-sm text-blue-600">change</td>
						<td class="px-6 py-4 font-mono text-sm text-gray-600">{'{ value, option }'}</td>
						<td class="px-6 py-4 text-sm text-gray-600">Fired when selection changes</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-sm text-blue-600">clear</td>
						<td class="px-6 py-4 font-mono text-sm text-gray-600">-</td>
						<td class="px-6 py-4 text-sm text-gray-600">Fired when selection is cleared</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-sm text-blue-600">focus</td>
						<td class="px-6 py-4 font-mono text-sm text-gray-600">-</td>
						<td class="px-6 py-4 text-sm text-gray-600">Fired when select gains focus</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-sm text-blue-600">blur</td>
						<td class="px-6 py-4 font-mono text-sm text-gray-600">-</td>
						<td class="px-6 py-4 text-sm text-gray-600">Fired when select loses focus</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-sm text-blue-600">createOption</td>
						<td class="px-6 py-4 font-mono text-sm text-gray-600">{'{ option }'}</td>
						<td class="px-6 py-4 text-sm text-gray-600"
							>Fired when new option is created (creatable mode)</td
						>
					</tr>
					<tr>
						<td class="px-6 py-4 font-mono text-sm text-blue-600">optionsLoaded</td>
						<td class="px-6 py-4 font-mono text-sm text-gray-600">{'{ options }'}</td>
						<td class="px-6 py-4 text-sm text-gray-600">Fired when async options are loaded</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Examples -->
	<section id="examples" class="mb-12">
		<h2 class="text-3xl font-bold mb-4">Examples</h2>

		<div class="space-y-8">
			<div>
				<h3 class="text-xl font-semibold mb-4">Multi-Select</h3>
				<CodeBlock code={multiSelectCode} language="svelte" />
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-4">With Theme</h3>
				<CodeBlock
					code={`<Select {options} bind:value theme="purple" />`}
					language="svelte"
				/>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-4">Creatable</h3>
				<CodeBlock
					code={`<Select {options} bind:value isCreatable={true} on:createOption={handleCreate} />`}
					language="svelte"
				/>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-4">Async Loading</h3>
				<CodeBlock
					code={`<Select bind:value loadOptions={loadCountries} />`}
					language="svelte"
				/>
			</div>
		</div>

		<div class="mt-8 p-6 bg-blue-50 rounded-lg">
			<p class="text-gray-700">
				For more examples, try the
				<a href="/playground" class="text-blue-600 hover:underline">Interactive Playground</a>
				with live prop controls and code generation.
			</p>
		</div>
	</section>
</div>
