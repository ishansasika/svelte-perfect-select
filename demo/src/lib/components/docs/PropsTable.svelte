<script lang="ts">
	import type { PropDefinition } from '$lib/types';

	export let props: PropDefinition[];
</script>

<div class="overflow-x-auto">
	<table class="min-w-full bg-white border border-gray-200 rounded-lg">
		<thead class="bg-gray-50">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Prop
				</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Type
				</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Default
				</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					Description
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			{#each props as prop}
				<tr class="hover:bg-gray-50">
					<td class="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-600">
						{prop.name}
					</td>
					<td class="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-600">
						{prop.type}
					</td>
					<td class="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-500">
						{#if prop.defaultValue !== undefined}
							{JSON.stringify(prop.defaultValue)}
						{:else}
							-
						{/if}
					</td>
					<td class="px-6 py-4 text-sm text-gray-600">
						{prop.description}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
