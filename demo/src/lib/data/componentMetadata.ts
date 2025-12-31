import type { ComponentMetadata } from '$lib/types';
import Select from '@select/Select.svelte';

export const SELECT_METADATA: ComponentMetadata = {
	id: 'select',
	name: 'Select',
	description:
		'A modern, feature-rich select component with react-select API compatibility, color themes, and enhanced animations',
	component: Select,
	defaultProps: {
		options: [
			{ id: 'sl', label: 'Sri Lanka', value: 'sl' },
			{ id: 'ind', label: 'India', value: 'ind' },
			{ id: 'pak', label: 'Pakistan', value: 'pak' },
			{ id: 'usa', label: 'United States', value: 'usa' },
			{ id: 'uk', label: 'United Kingdom', value: 'uk' }
		],
		placeholder: 'Select...',
		isMulti: false,
		isSearchable: true,
		isClearable: true,
		isDisabled: false,
		isLoading: false,
		theme: 'blue',
		selectSize: 'medium',
		containerSize: 'md'
	},
	propDefinitions: [
		// Basic Props
		{
			name: 'placeholder',
			type: 'string',
			control: { type: 'text' },
			description: 'Placeholder text when no option is selected',
			defaultValue: 'Select...',
			category: 'basic'
		},
		{
			name: 'isMulti',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable multi-select mode',
			defaultValue: false,
			category: 'basic'
		},
		{
			name: 'isSearchable',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable search functionality',
			defaultValue: true,
			category: 'basic'
		},
		{
			name: 'isClearable',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show clear button',
			defaultValue: true,
			category: 'basic'
		},
		{
			name: 'isDisabled',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Disable the select',
			defaultValue: false,
			category: 'basic'
		},
		{
			name: 'isLoading',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show loading spinner',
			defaultValue: false,
			category: 'basic'
		},
		// Styling Props
		{
			name: 'theme',
			type: 'string',
			control: {
				type: 'select',
				options: ['blue', 'purple', 'green', 'red', 'orange', 'pink', 'dark']
			},
			description: 'Color theme',
			defaultValue: 'blue',
			category: 'styling'
		},
		{
			name: 'selectSize',
			type: 'string',
			control: {
				type: 'select',
				options: ['smaller', 'small', 'medium', 'large', 'larger']
			},
			description: 'Font size variant',
			defaultValue: 'medium',
			category: 'styling'
		},
		{
			name: 'containerSize',
			type: 'string',
			control: {
				type: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl']
			},
			description: 'Container physical size',
			defaultValue: 'md',
			category: 'styling'
		},
		{
			name: 'borderRadius',
			type: 'string',
			control: { type: 'text' },
			description: 'Border radius (CSS value)',
			defaultValue: '8px',
			category: 'styling'
		},
		// Advanced Props
		{
			name: 'showSelectAll',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show Select All option (multi-select)',
			defaultValue: false,
			category: 'advanced'
		},
		{
			name: 'isCreatable',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Allow creating new options',
			defaultValue: false,
			category: 'advanced'
		},
		{
			name: 'showOptionIcons',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable icon support',
			defaultValue: false,
			category: 'advanced'
		},
		{
			name: 'showOptionBadges',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable badge support',
			defaultValue: false,
			category: 'advanced'
		},
		{
			name: 'isGrouped',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable option grouping',
			defaultValue: false,
			category: 'advanced'
		},
		// Behavior Props
		{
			name: 'closeMenuOnSelect',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Close menu after selection',
			defaultValue: true,
			category: 'behavior'
		},
		{
			name: 'openMenuOnClick',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Open menu on container click',
			defaultValue: true,
			category: 'behavior'
		},
		{
			name: 'openMenuOnFocus',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Open menu when focused',
			defaultValue: false,
			category: 'behavior'
		},
		{
			name: 'hideSelectedOptions',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Hide selected options from menu',
			defaultValue: false,
			category: 'behavior'
		}
	],
	examples: [],
	importPath: "import Select from 'svelte-perfect-select';"
};
