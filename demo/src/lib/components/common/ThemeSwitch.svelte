<script lang="ts">
	import { theme, THEME_COLORS } from '$stores/theme';
	import type { Theme } from '$lib/types';

	const themes: { value: Theme; label: string; icon: string }[] = [
		{ value: 'light', label: 'Light', icon: '☀️' },
		{ value: 'dark', label: 'Dark', icon: '🌙' },
		{ value: 'gray', label: 'Gray', icon: '◐' }
	];
</script>

<div class="flex items-center gap-2">
	<span class="text-sm font-medium text-gray-700">Background:</span>
	<div class="flex gap-2">
		{#each themes as t}
			<button
				on:click={() => theme.set(t.value)}
				class="px-3 py-1.5 text-sm rounded-md border transition-all"
				class:bg-blue-100={$theme === t.value}
				class:border-blue-500={$theme === t.value}
				class:text-blue-700={$theme === t.value}
				class:border-gray-300={$theme !== t.value}
				class:hover:border-blue-400={$theme !== t.value}
				aria-label={`Switch to ${t.label} theme`}
			>
				<span class="mr-1">{t.icon}</span>
				{t.label}
			</button>
		{/each}
	</div>
</div>
