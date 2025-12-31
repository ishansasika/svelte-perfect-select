import type { Example } from '$lib/types';

export const SELECT_EXAMPLES: Example[] = [
	{
		name: 'Basic Single Select',
		description: 'Simple single selection',
		props: {
			placeholder: 'Choose a country...'
		}
	},
	{
		name: 'Multi-Select',
		description: 'Select multiple options with tags',
		props: {
			isMulti: true,
			placeholder: 'Select multiple countries...'
		}
	},
	{
		name: 'Purple Theme',
		description: 'Beautiful purple color scheme',
		props: {
			theme: 'purple',
			placeholder: 'Purple themed select...'
		}
	},
	{
		name: 'Green Theme',
		description: 'Fresh green color scheme',
		props: {
			theme: 'green',
			placeholder: 'Green themed select...'
		}
	},
	{
		name: 'Red Theme',
		description: 'Bold red color scheme',
		props: {
			theme: 'red',
			placeholder: 'Red themed select...'
		}
	},
	{
		name: 'Dark Theme',
		description: 'Sleek dark color scheme',
		props: {
			theme: 'dark',
			placeholder: 'Dark themed select...'
		}
	},
	{
		name: 'Large Size',
		description: 'Larger font and container',
		props: {
			selectSize: 'large',
			containerSize: 'lg',
			placeholder: 'Large select...'
		}
	},
	{
		name: 'Small Size',
		description: 'Smaller font and container',
		props: {
			selectSize: 'small',
			containerSize: 'sm',
			placeholder: 'Small select...'
		}
	},
	{
		name: 'Creatable',
		description: 'Create new options on the fly',
		props: {
			isCreatable: true,
			placeholder: 'Select or create...'
		}
	},
	{
		name: 'With Select All',
		description: 'Quick select/deselect all options',
		props: {
			isMulti: true,
			showSelectAll: true,
			placeholder: 'Multi-select with Select All...'
		}
	},
	{
		name: 'Loading State',
		description: 'Show loading indicator',
		props: {
			isLoading: true,
			placeholder: 'Loading...'
		}
	},
	{
		name: 'Disabled',
		description: 'Disabled select component',
		props: {
			isDisabled: true,
			placeholder: 'Disabled select...'
		}
	},
	{
		name: 'No Search',
		description: 'Simple dropdown without search',
		props: {
			isSearchable: false,
			placeholder: 'Select without search...'
		}
	},
	{
		name: 'Not Clearable',
		description: 'No clear button',
		props: {
			isClearable: false,
			placeholder: 'Cannot clear selection...'
		}
	},
	{
		name: 'Green Multi-Select',
		description: 'Multi-select with green theme',
		props: {
			isMulti: true,
			theme: 'green',
			placeholder: 'Green multi-select...'
		}
	},
	{
		name: 'Purple Multi-Select Large',
		description: 'Large multi-select with purple theme',
		props: {
			isMulti: true,
			theme: 'purple',
			selectSize: 'large',
			containerSize: 'lg',
			placeholder: 'Large purple multi-select...'
		}
	},
	{
		name: 'Orange Theme Small',
		description: 'Small select with orange theme',
		props: {
			theme: 'orange',
			selectSize: 'small',
			containerSize: 'sm',
			placeholder: 'Small orange select...'
		}
	},
	{
		name: 'Pink Theme Creatable',
		description: 'Creatable select with pink theme',
		props: {
			theme: 'pink',
			isCreatable: true,
			placeholder: 'Create with pink theme...'
		}
	}
];
