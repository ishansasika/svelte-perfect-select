import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Theme } from '$lib/types';

const THEME_KEY = 'svelte-perfect-select-theme';

function createThemeStore() {
	const storedTheme = browser ? localStorage.getItem(THEME_KEY) : null;
	const initialTheme: Theme = (storedTheme as Theme) || 'light';

	const { subscribe, set, update } = writable<Theme>(initialTheme);

	return {
		subscribe,
		set: (value: Theme) => {
			if (browser) {
				localStorage.setItem(THEME_KEY, value);
			}
			set(value);
		},
		toggle: () => {
			update((current) => {
				const themes: Theme[] = ['light', 'dark', 'gray'];
				const currentIndex = themes.indexOf(current);
				const nextTheme = themes[(currentIndex + 1) % themes.length];
				if (browser) {
					localStorage.setItem(THEME_KEY, nextTheme);
				}
				return nextTheme;
			});
		}
	};
}

export const theme = createThemeStore();

export const THEME_COLORS: Record<Theme, string> = {
	light: '#ffffff',
	dark: '#1f2937',
	gray: '#f3f4f6'
};
