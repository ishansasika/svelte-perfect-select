import type { PageLoad } from './$types';
import { SELECT_METADATA } from '$data/componentMetadata';
import { SELECT_EXAMPLES } from '$data/examples';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const { componentId } = params;

	// For now we only have one component
	if (componentId !== 'select') {
		throw error(404, 'Component not found');
	}

	return {
		metadata: {
			...SELECT_METADATA,
			examples: SELECT_EXAMPLES
		}
	};
};
