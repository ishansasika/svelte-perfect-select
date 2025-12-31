<script lang="ts">
	import type { PageData } from './$types';
	import ComponentPlayground from '$components/playground/ComponentPlayground.svelte';
	import SEO from '$components/common/SEO.svelte';

	export let data: PageData;
</script>

<SEO
	title="Playground - {data.metadata.name}"
	description="Interactive playground for {data.metadata.name} component"
	url="https://svelte-perfect-select-demo.vercel.app/playground/{data.metadata.id}"
/>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<ComponentPlayground metadata={data.metadata} />
</div>
