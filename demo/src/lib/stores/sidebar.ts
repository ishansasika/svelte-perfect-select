import { writable } from 'svelte/store';

function createSidebarStore() {
	const { subscribe, set, update } = writable<boolean>(false);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false),
		toggle: () => update((state) => !state)
	};
}

export const sidebarOpen = createSidebarStore();
