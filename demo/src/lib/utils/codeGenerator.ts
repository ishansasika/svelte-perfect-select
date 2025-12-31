/**
 * Generate Svelte code from component name and props
 */
export function generateComponentCode(
	componentName: string,
	props: Record<string, any>,
	options: { isMulti?: boolean; hasBindings?: boolean } = {}
): string {
	const propEntries = Object.entries(props)
		.filter(([key, value]) => {
			// Filter out undefined, null, and options array (too verbose)
			if (value === undefined || value === null) return false;
			if (key === 'options' || key === 'value') return false;
			return true;
		})
		.map(([key, value]) => {
			if (typeof value === 'string') {
				return `  ${key}="${value}"`;
			} else if (typeof value === 'number') {
				return `  ${key}={${value}}`;
			} else if (typeof value === 'boolean') {
				return value ? `  ${key}={true}` : `  ${key}={false}`;
			} else if (Array.isArray(value)) {
				return `  ${key}={${JSON.stringify(value)}}`;
			} else {
				return `  ${key}={${JSON.stringify(value)}}`;
			}
		});

	// Add bind:value directive
	if (options.hasBindings !== false) {
		propEntries.unshift('  bind:value');
	}

	// Add options prop
	propEntries.unshift('  {options}');

	const propsString = propEntries.length > 0 ? '\n' + propEntries.join('\n') + '\n' : '';

	return `<${componentName}${propsString}/>`;
}

/**
 * Generate import statement
 */
export function generateImportStatement(
	components: string[],
	source: string = 'svelte-perfect-select'
): string {
	return `import ${components.join(', ')} from '${source}';`;
}

/**
 * Generate full Svelte component example
 */
export function generateFullExample(
	componentName: string,
	props: Record<string, any>,
	options: { isMulti?: boolean } = {}
): string {
	const importStatement = generateImportStatement([componentName]);
	const componentCode = generateComponentCode(componentName, props, options);

	const valueType = options.isMulti ? '[]' : 'null';

	return `<script>
  ${importStatement}

  let value = ${valueType};
  let options = [
    { id: 'opt1', label: 'Option 1', value: 'opt1' },
    { id: 'opt2', label: 'Option 2', value: 'opt2' },
    { id: 'opt3', label: 'Option 3', value: 'opt3' },
  ];
</script>

${componentCode}`;
}

/**
 * Format prop value for display
 */
export function formatPropValue(value: any): string {
	if (typeof value === 'string') {
		return `"${value}"`;
	} else if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	} else if (Array.isArray(value)) {
		return `[${value.map(formatPropValue).join(', ')}]`;
	} else if (typeof value === 'object' && value !== null) {
		return JSON.stringify(value, null, 2);
	}
	return String(value);
}
