import type { ComponentType } from 'svelte';

export type ControlType = 'number' | 'color' | 'select' | 'boolean' | 'range' | 'text' | 'array';

export interface ControlConfig {
	type: ControlType;
	min?: number;
	max?: number;
	step?: number;
	options?: string[] | { label: string; value: any }[];
}

export interface PropDefinition {
	name: string;
	type: string;
	control: ControlConfig;
	description: string;
	defaultValue?: any;
	category?: 'basic' | 'advanced' | 'styling' | 'async' | 'behavior';
}

export interface Example {
	name: string;
	description?: string;
	props: Record<string, any>;
	code?: string;
}

export interface ComponentMetadata {
	id: string;
	name: string;
	description: string;
	component: ComponentType;
	defaultProps: Record<string, any>;
	propDefinitions: PropDefinition[];
	examples: Example[];
	importPath: string;
}

export type Theme = 'light' | 'dark' | 'gray';

export interface CodeExample {
	title: string;
	code: string;
	language: 'svelte' | 'typescript' | 'bash';
}

export interface SEOConfig {
	title: string;
	description: string;
	url: string;
	image?: string;
	type?: string;
	keywords?: string[];
}
