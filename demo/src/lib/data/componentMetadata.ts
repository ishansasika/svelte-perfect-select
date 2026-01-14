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
		},
		// v3.0.0 Features
		{
			name: 'enableVirtualScroll',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable virtual scrolling for large datasets (v3.0.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		{
			name: 'enableDragDrop',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable drag & drop tag reordering (v3.0.0)',
			defaultValue: false,
			category: 'v3-features'
		},
		{
			name: 'commandPaletteMode',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable command palette mode (Cmd+K) (v3.0.0)',
			defaultValue: false,
			category: 'v3-features'
		},
		{
			name: 'enableFuzzySearch',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable fuzzy search algorithm (v3.0.0)',
			defaultValue: false,
			category: 'v3-features'
		},
		{
			name: 'fuzzySearchThreshold',
			type: 'number',
			control: { type: 'range', min: 0, max: 1, step: 0.1 },
			description: 'Fuzzy match threshold (0-1) (v3.0.0)',
			defaultValue: 0.6,
			category: 'v3-features'
		},
		{
			name: 'enableCopyPaste',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable copy/paste for multi-select (v3.0.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		{
			name: 'touchOptimized',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable touch optimizations (v3.0.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		{
			name: 'swipeToRemove',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Swipe tags to remove on mobile (v3.0.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		{
			name: 'collapsibleGroups',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Enable collapsible option groups (v3.0.0)',
			defaultValue: false,
			category: 'v3-features'
		},
		{
			name: 'useSpringAnimations',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Use spring physics animations (v3.0.0)',
			defaultValue: false,
			category: 'v3-features'
		},
		{
			name: 'enhancedAccessibility',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'WCAG AAA accessibility features (v3.0.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		{
			name: 'announceChanges',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Screen reader announcements (v3.0.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		// v3.1.0 Features
		{
			name: 'highlightSearchMatch',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Highlight matched text in options (v3.1.0)',
			defaultValue: true,
			category: 'v3-features'
		},
		{
			name: 'highlightClassName',
			type: 'string',
			control: { type: 'text' },
			description: 'CSS class for highlighted text (v3.1.0)',
			defaultValue: 'search-highlight',
			category: 'v3-features'
		},
		{
			name: 'showOptionDescriptions',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show option descriptions (v3.1.0)',
			defaultValue: true,
			category: 'v3-features'
		}
	],
	examples: [],
	importPath: "import Select from 'svelte-perfect-select';"
};
