<script>
  import Select from '../../../src/lib/Select.svelte';

  let demoValue = $state(null);
  const demoOptions = [
    { id: 'react', label: 'React', value: 'react' },
    { id: 'vue', label: 'Vue', value: 'vue' },
    { id: 'svelte', label: 'Svelte', value: 'svelte' },
    { id: 'angular', label: 'Angular', value: 'angular' }
  ];

  const v3Features = [
    {
      icon: '⚡',
      title: 'Virtual Scrolling',
      description: 'Handle 10,000+ options smoothly with true virtualization',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '🎯',
      title: 'Drag & Drop',
      description: 'Reorder multi-select tags with visual feedback',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '⌨️',
      title: 'Command Palette',
      description: 'Cmd/Ctrl+K style centered modal interface',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '🔍',
      title: 'Fuzzy Search',
      description: 'Smart approximate matching algorithm',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '📋',
      title: 'Copy/Paste',
      description: 'Clipboard integration for multi-select',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '📱',
      title: 'Touch Gestures',
      description: 'Swipe-to-remove tags on mobile',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '📁',
      title: 'Collapsible Groups',
      description: 'Click to expand/collapse option groups',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '🎨',
      title: 'Custom Templates',
      description: 'Render Svelte 5 snippets for options',
      version: 'v3.0.0',
      highlight: true
    },
    {
      icon: '♿',
      title: 'WCAG AAA',
      description: 'Enhanced accessibility with live regions',
      version: 'v3.0.0',
      highlight: true
    },
    // v3.1.0 Features
    {
      icon: '🔍',
      title: 'Search Highlighting',
      description: 'Matched text highlighted in yellow as you type',
      version: 'v3.1.0',
      highlight: true
    },
    {
      icon: '📍',
      title: 'Auto Position',
      description: 'Smart dropdown positioning based on viewport',
      version: 'v3.1.0',
      highlight: true
    },
    {
      icon: '📝',
      title: 'Option Descriptions',
      description: 'Show subtitle descriptions for options',
      version: 'v3.1.0',
      highlight: true
    },
    // v3.2.0 Features
    {
      icon: '☑️',
      title: 'Group Selection',
      description: 'Select or deselect entire groups with a single click',
      version: 'v3.2.0',
      highlight: true
    },
    {
      icon: '👤',
      title: 'Native Avatars',
      description: 'Display circular avatars in options and tags',
      version: 'v3.2.0',
      highlight: true
    },
    {
      icon: '🏷️',
      title: 'Floating Label',
      description: 'Material Design-style animated placeholder',
      version: 'v3.2.0',
      highlight: true
    }
  ];

  const coreFeatures = [
    {
      icon: '🎨',
      title: '7 Color Themes',
      description: 'Beautiful pre-built themes: blue, purple, green, red, orange, pink, dark'
    },
    {
      icon: '🔄',
      title: 'React-Select Compatible',
      description: 'Familiar API for developers coming from React ecosystem'
    },
    {
      icon: '🌐',
      title: 'Async Loading',
      description: 'Load options dynamically with caching'
    },
    {
      icon: '✨',
      title: 'Creatable',
      description: 'Allow users to create new options'
    },
    {
      icon: '📦',
      title: 'Grouping & Badges',
      description: 'Organize options with groups, icons, and badges'
    },
    {
      icon: '🚀',
      title: 'Max Selection',
      description: 'Limit selections in multi-select mode'
    },
    {
      icon: '✅',
      title: 'Validation States',
      description: 'Built-in error, success, warning states'
    },
    {
      icon: '🎪',
      title: 'Portal Rendering',
      description: 'Solve z-index issues with portal mode'
    },
    {
      icon: '∞',
      title: 'Infinite Scroll',
      description: 'Load more options on scroll for pagination'
    }
  ];
</script>

<svelte:head>
  <title>Svelte Perfect Select - Modern Select Component for Svelte 5</title>
  <meta
    name="description"
    content="A feature-rich, accessible select component for Svelte 5 with virtual scrolling, drag-drop, fuzzy search, and WCAG AAA accessibility"
  />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
      ✨ Now with Svelte 5 Runes
    </div>
    <h1 class="text-5xl md:text-6xl font-bold mb-6">
      Svelte Perfect Select <span class="text-yellow-300">v3.2.0</span>
    </h1>
    <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
      The most advanced select component for Svelte 5. Virtual scrolling, drag-drop, fuzzy search,
      group selection, avatar support, and WCAG AAA accessibility. Zero dependencies, 100% customizable.
    </p>

    <!-- Live Demo -->
    <div class="max-w-md mx-auto bg-white rounded-lg p-6 shadow-2xl">
      <Select
        options={demoOptions}
        bind:value={demoValue}
        theme="purple"
        placeholder="Try me out..."
      />
      {#if demoValue}
        <p class="mt-4 text-sm text-gray-600">You selected: <strong>{demoValue}</strong></p>
      {/if}
    </div>

    <div class="mt-8 flex flex-wrap gap-4 justify-center">
      <a
        href="/v3-features"
        class="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
      >
        🚀 Explore v3.x Features
      </a>
      <a
        href="https://github.com/ishansasika/svelte-perfect-select"
        target="_blank"
        rel="noopener noreferrer"
        class="px-8 py-3 bg-purple-800 text-white rounded-lg font-semibold hover:bg-purple-900 transition-all"
      >
        ⭐ GitHub
      </a>
      <a
        href="https://www.npmjs.com/package/svelte-perfect-select"
        target="_blank"
        rel="noopener noreferrer"
        class="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
      >
        📦 npm
      </a>
    </div>
  </div>
</section>

<!-- What's New in v3.x -->
<section class="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        What's New in v3.x 🎉
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        The biggest release ever with 12 major new features
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each v3Features as feature}
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-300">
          <div class="flex items-start gap-3">
            <span class="text-4xl">{feature.icon}</span>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-lg font-bold text-gray-800">{feature.title}</h3>
                <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                  {feature.version}
                </span>
              </div>
              <p class="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="text-center mt-12">
      <a
        href="/v3-features"
        class="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
      >
        View Live Demos →
      </a>
    </div>
  </div>
</section>

<!-- Installation -->
<section class="py-16 bg-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Quick Start</h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">1. Install</h3>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>npm install svelte-perfect-select</code></pre>
        <p class="mt-2 text-sm text-gray-600">
          ⚠️ Requires Svelte 5.0.0 or later. For Svelte 4, use v2.2.1.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">2. Use in your Svelte 5 app</h3>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>&lt;script&gt;
  import Select from 'svelte-perfect-select';

  let value = $state(null);
  let options = [
    {'{'} id: '1', label: 'Option 1', value: '1' {'}'},
    {'{'} id: '2', label: 'Option 2', value: '2' {'}'}
  ];
&lt;/script&gt;

&lt;Select {'{'}options{'}'} bind:value placeholder="Select..." /&gt;</code></pre>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">3. Enjoy! 🎉</h3>
        <p class="text-gray-600">
          Check out the <a href="/v3-features" class="text-purple-600 font-semibold hover:underline">v3.0.0 features page</a> for advanced examples.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Core Features -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center">Core Features</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each coreFeatures as feature}
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start gap-3">
            <span class="text-3xl">{feature.icon}</span>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p class="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Migration Guide -->
<section class="py-16 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8 text-center">Migrating from v2.x?</h2>
    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
      <div>
        <h3 class="font-semibold text-lg mb-2">Update Dependencies</h3>
        <pre class="bg-black/30 p-3 rounded text-sm overflow-x-auto"><code>npm install svelte@^5 @sveltejs/vite-plugin-svelte@^5 vite@^6</code></pre>
      </div>
      <div>
        <h3 class="font-semibold text-lg mb-2">Update Event Handlers</h3>
        <pre class="bg-black/30 p-3 rounded text-sm overflow-x-auto"><code>&lt;!-- Before (v2.x) --&gt;
&lt;Select on:change={'{'}handleChange{'}'} /&gt;

&lt;!-- After (v3.0.0) --&gt;
&lt;Select onChange={'{'}handleChange{'}'} /&gt;</code></pre>
      </div>
      <div class="pt-4 border-t border-white/20">
        <p class="text-sm">
          ℹ️ Most features are backward compatible. See the full
          <a href="https://github.com/ishansasika/svelte-perfect-select/blob/master/CHANGELOG.md" class="underline hover:text-purple-300" target="_blank">
            migration guide
          </a> for details.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="py-16 bg-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
    <p class="text-lg text-gray-600 mb-8">
      Join developers using Svelte Perfect Select in production
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <a
        href="/v3-features"
        class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        View Live Demos
      </a>
      <a
        href="https://github.com/ishansasika/svelte-perfect-select"
        target="_blank"
        rel="noopener noreferrer"
        class="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
      >
        View on GitHub
      </a>
    </div>
  </div>
</section>
