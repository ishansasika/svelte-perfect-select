<script lang="ts">
	import Select from '@select/Select.svelte';

	let demoValue: any = null;
	const demoOptions = [
		{ id: 'react', label: 'React', value: 'react' },
		{ id: 'vue', label: 'Vue', value: 'vue' },
		{ id: 'svelte', label: 'Svelte', value: 'svelte' },
		{ id: 'angular', label: 'Angular', value: 'angular' }
	];

	const features = [
		{
			icon: '🎨',
			title: '7 Color Themes',
			description: 'Beautiful pre-built themes: blue, purple, green, red, orange, pink, dark'
		},
		{
			icon: '⚡',
			title: 'React-Select Compatible',
			description: 'Familiar API for developers coming from React ecosystem'
		},
		{
			icon: '🔍',
			title: 'Smart Search',
			description: 'Built-in search with custom filter support'
		},
		{
			icon: '🎯',
			title: 'Multi-Select',
			description: 'Select multiple options with animated tag chips'
		},
		{
			icon: '🌐',
			title: 'Async Loading',
			description: 'Load options dynamically with caching'
		},
		{
			icon: '✨',
			title: 'Creatable',
			description: 'Allow users to create new options'
		},
		{
			icon: '📦',
			title: 'Grouping & Badges',
			description: 'Organize options with groups, icons, and badges'
		},
		{
			icon: '♿',
			title: 'Fully Accessible',
			description: 'ARIA labels, keyboard navigation, screen reader support'
		},
		{
			icon: '🚀',
			title: 'Max Selection Limit',
			description: 'Limit selections in multi-select with warnings (v2.2.0)',
			isNew: true
		},
		{
			icon: '✅',
			title: 'Validation States',
			description: 'Built-in error, success, warning states (v2.2.0)',
			isNew: true
		},
		{
			icon: '🎪',
			title: 'Portal Rendering',
			description: 'Solve z-index issues with portal mode (v2.2.0)',
			isNew: true
		},
		{
			icon: '∞',
			title: 'Infinite Scroll',
			description: 'Load more options on scroll for pagination (v2.2.0)',
			isNew: true
		}
	];
</script>

<svelte:head>
	<title>Svelte Perfect Select - Modern Select Component</title>
	<meta
		name="description"
		content="A feature-rich, accessible select component for Svelte with react-select compatibility, themes, and animations"
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h1 class="text-4xl md:text-5xl font-bold mb-6">Svelte Perfect Select</h1>
		<p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
			A modern, feature-rich select component for Svelte applications. React-select compatible with
			enhanced animations and 7 beautiful themes.
		</p>

		<!-- Live Demo -->
		<div class="max-w-md mx-auto bg-white rounded-lg p-6 shadow-xl">
			<Select options={demoOptions} bind:value={demoValue} theme="purple" placeholder="Try me out..." />
		</div>

		<div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
			<a
				href="/playground"
				class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
			>
				Try Playground
			</a>
			<a
				href="/docs"
				class="px-6 py-3 bg-blue-500 hover:bg-blue-400 font-semibold rounded-lg transition-colors"
			>
				Documentation
			</a>
		</div>
	</div>
</section>

<!-- Features Grid -->
<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-bold text-center mb-12">Features</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature}
				<div
					class="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow relative"
					class:border-purple-300={feature.isNew}
					class:bg-purple-50={feature.isNew}
				>
					{#if feature.isNew}
						<span
							class="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold"
						>
							NEW
						</span>
					{/if}
					<div class="text-4xl mb-4">{feature.icon}</div>
					<h3 class="text-lg font-semibold mb-2">{feature.title}</h3>
					<p class="text-gray-600 text-sm">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Installation Section -->
<section class="py-20 bg-gray-50">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-bold text-center mb-8">Quick Start</h2>

		<div class="space-y-8">
			<div>
				<h3 class="text-xl font-semibold mb-4">Installation</h3>
				<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
					<code class="text-sm">npm install svelte-perfect-select</code>
				</div>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-4">Basic Usage</h3>
				<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
					<pre class="text-sm">{@html `<code>&lt;script&gt;
  import Select from 'svelte-perfect-select';

  let value = null;
  let options = [
    { id: 'opt1', label: 'Option 1', value: 'opt1' },
    { id: 'opt2', label: 'Option 2', value: 'opt2' },
  ];
&lt;/script&gt;

&lt;Select {options} bind:value /&gt;</code>`}</pre>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-blue-600 text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl font-bold mb-6">Ready to get started?</h2>
		<p class="text-xl mb-8">Explore the playground and see all features in action</p>
		<a
			href="/playground"
			class="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
		>
			Open Playground
		</a>
	</div>
</section>
