/**
 * Format a value for display in the UI
 */
export function formatValue(value: any): string {
	if (value === null || value === undefined) {
		return 'null';
	}
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'boolean') {
		return value ? 'true' : 'false';
	}
	if (typeof value === 'number') {
		return value.toString();
	}
	if (Array.isArray(value)) {
		return `Array(${value.length})`;
	}
	if (typeof value === 'object') {
		return 'Object';
	}
	return String(value);
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(str: string): string {
	if (!str) return '';
	const result = str.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
}
