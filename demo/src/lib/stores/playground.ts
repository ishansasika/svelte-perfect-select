import { writable } from 'svelte/store';

interface PlaygroundState {
	currentProps: Record<string, any>;
	componentId: string;
}

function createPlaygroundStore() {
	const { subscribe, set, update } = writable<PlaygroundState>({
		currentProps: {},
		componentId: 'select'
	});

	return {
		subscribe,
		setProps: (props: Record<string, any>) => {
			update((state) => ({ ...state, currentProps: props }));
		},
		updateProp: (key: string, value: any) => {
			update((state) => ({
				...state,
				currentProps: { ...state.currentProps, [key]: value }
			}));
		},
		reset: (defaultProps: Record<string, any>) => {
			update((state) => ({ ...state, currentProps: defaultProps }));
		}
	};
}

export const playgroundState = createPlaygroundStore();
