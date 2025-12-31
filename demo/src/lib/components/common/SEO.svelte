<script lang="ts">
	export let title: string;
	export let description: string;
	export let url: string;
	export let image: string = '/og-image.png';
	export let type: string = 'website';
	export let keywords: string[] = [];

	const fullTitle = `${title} | Svelte Perfect Select`;
	const keywordsString = [
		'svelte',
		'select',
		'dropdown',
		'component',
		'react-select',
		'multi-select',
		...keywords
	].join(', ');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywordsString} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={image} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />
</svelte:head>
