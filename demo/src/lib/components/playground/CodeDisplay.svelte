<script lang="ts">
	import CodeBlock from '$components/common/CodeBlock.svelte';

	export let code: string;
</script>

<div class="space-y-4">
	<h3 class="text-lg font-semibold">Generated Code</h3>
	<CodeBlock {code} language="svelte" />
</div>
