export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return true;
		} else {
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				textArea.remove();
				return true;
			} catch (error) {
				console.error('Fallback: Could not copy text', error);
				textArea.remove();
				return false;
			}
		}
	} catch (error) {
		console.error('Failed to copy text to clipboard', error);
		return false;
	}
}
