<script>
  import { onMount } from 'svelte';
  import Select from '../../../../src/lib/Select.svelte';

  // Virtual Scrolling Demo - Lazy load for better performance
  let largeDataset = $state([]);
  let virtualScrollValue = $state(null);
  let isDatasetLoaded = $state(false);
  let isLoadingDataset = $state(false);

  // Generate dataset only when user clicks the button
  async function loadLargeDataset() {
    if (!isDatasetLoaded && !isLoadingDataset) {
      isLoadingDataset = true;

      // Use setTimeout to allow UI to update and show loader
      await new Promise(resolve => setTimeout(resolve, 10));

      largeDataset = Array.from({ length: 10000 }, (_, i) => ({
        id: `opt-${i}`,
        label: `Option ${i + 1}`,
        value: `opt-${i}`
      }));

      isDatasetLoaded = true;
      isLoadingDataset = false;
    }
  }

  // Drag & Drop Demo
  let skills = [
    { id: 'js', label: 'JavaScript', value: 'js' },
    { id: 'ts', label: 'TypeScript', value: 'ts' },
    { id: 'py', label: 'Python', value: 'py' },
    { id: 'go', label: 'Go', value: 'go' },
    { id: 'rust', label: 'Rust', value: 'rust' },
    { id: 'java', label: 'Java', value: 'java' }
  ];
  let selectedSkills = $state(['js', 'py']);

  // Fuzzy Search Demo
  let frameworks = [
    { id: 'react', label: 'React', value: 'react' },
    { id: 'vue', label: 'Vue.js', value: 'vue' },
    { id: 'angular', label: 'Angular', value: 'angular' },
    { id: 'svelte', label: 'Svelte', value: 'svelte' },
    { id: 'solid', label: 'Solid.js', value: 'solid' },
    { id: 'qwik', label: 'Qwik', value: 'qwik' }
  ];
  let fuzzyValue = $state(null);

  // Command Palette Demo
  let commands = [
    { id: 'new', label: 'New File', value: 'new', icon: '📄', description: 'Create a new file' },
    { id: 'open', label: 'Open File', value: 'open', icon: '📂', description: 'Open an existing file' },
    { id: 'save', label: 'Save', value: 'save', icon: '💾', description: 'Save current file' },
    { id: 'search', label: 'Search', value: 'search', icon: '🔍', description: 'Search in files' },
    { id: 'settings', label: 'Settings', value: 'settings', icon: '⚙️', description: 'Open settings' }
  ];
  let commandValue = $state(null);

  // Copy/Paste Demo
  let tags = [
    { id: 'js', label: 'JavaScript', value: 'JavaScript' },
    { id: 'ts', label: 'TypeScript', value: 'TypeScript' },
    { id: 'py', label: 'Python', value: 'Python' },
    { id: 'java', label: 'Java', value: 'Java' },
    { id: 'cpp', label: 'C++', value: 'C++' }
  ];
  let pasteValues = $state([]);

  // Collapsible Groups Demo
  let languages = [
    { id: 'js', label: 'JavaScript', value: 'js', group: 'Frontend' },
    { id: 'ts', label: 'TypeScript', value: 'ts', group: 'Frontend' },
    { id: 'react', label: 'React', value: 'react', group: 'Frontend' },
    { id: 'vue', label: 'Vue.js', value: 'vue', group: 'Frontend' },
    { id: 'py', label: 'Python', value: 'py', group: 'Backend' },
    { id: 'go', label: 'Go', value: 'go', group: 'Backend' },
    { id: 'java', label: 'Java', value: 'java', group: 'Backend' },
    { id: 'sql', label: 'SQL', value: 'sql', group: 'Database' },
    { id: 'mongo', label: 'MongoDB', value: 'mongo', group: 'Database' }
  ];
  let groupValue = $state(null);

  // Custom Templates Demo
  let users = [
    { id: '1', label: 'John Doe', value: 'john', email: 'john@example.com', role: 'Admin' },
    { id: '2', label: 'Jane Smith', value: 'jane', email: 'jane@example.com', role: 'User' },
    { id: '3', label: 'Bob Johnson', value: 'bob', email: 'bob@example.com', role: 'Developer' },
    { id: '4', label: 'Alice Williams', value: 'alice', email: 'alice@example.com', role: 'Designer' }
  ];
  let userValue = $state(null);

  // Custom Keyboard Shortcuts Demo
  let shortcutValue = $state([]);
  let shortcuts = {
    'Ctrl+Shift+A': (event) => {
      alert('Custom shortcut Ctrl+Shift+A triggered!');
    },
    'Ctrl+Shift+C': (event) => {
      if (shortcutValue.length > 0) {
        navigator.clipboard.writeText(shortcutValue.join(', '));
        alert('Copied to clipboard!');
      }
    }
  };

  // Spring Animations Demo
  let springValue = $state(null);

  // Touch Gestures Demo
  let touchTags = $state(['tag1', 'tag2', 'tag3']);

  // ========== v3.1.0 DEMOS ==========

  // Search Highlighting Demo
  let highlightOptions = [
    { id: 'javascript', label: 'JavaScript', value: 'javascript' },
    { id: 'typescript', label: 'TypeScript', value: 'typescript' },
    { id: 'python', label: 'Python', value: 'python' },
    { id: 'java', label: 'Java', value: 'java' },
    { id: 'csharp', label: 'C Sharp', value: 'csharp' },
    { id: 'ruby', label: 'Ruby', value: 'ruby' },
    { id: 'rust', label: 'Rust', value: 'rust' },
    { id: 'golang', label: 'Go Language', value: 'golang' }
  ];
  let highlightValue = $state(null);

  // Option Descriptions Demo
  let descriptionOptions = [
    { id: 'react', label: 'React', value: 'react', description: 'A JavaScript library for building user interfaces' },
    { id: 'vue', label: 'Vue.js', value: 'vue', description: 'The Progressive JavaScript Framework' },
    { id: 'svelte', label: 'Svelte', value: 'svelte', description: 'Cybernetically enhanced web apps' },
    { id: 'angular', label: 'Angular', value: 'angular', description: 'Platform for building mobile and desktop apps' },
    { id: 'solid', label: 'SolidJS', value: 'solid', description: 'Simple and performant reactivity for building UIs' }
  ];
  let descriptionValue = $state(null);

  // Auto Dropdown Position Demo
  let positionOptions = [
    { id: '1', label: 'Option 1', value: '1' },
    { id: '2', label: 'Option 2', value: '2' },
    { id: '3', label: 'Option 3', value: '3' },
    { id: '4', label: 'Option 4', value: '4' },
    { id: '5', label: 'Option 5', value: '5' }
  ];
  let positionValue = $state(null);
</script>

<svelte:head>
  <title>v3.x Features - Svelte Perfect Select</title>
</svelte:head>

<div class="max-w-6xl mx-auto p-8 space-y-16">
  <header class="text-center mb-12">
    <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
      v3.x Features
    </h1>
    <p class="text-xl text-gray-600">
      Explore all the amazing new features in Svelte Perfect Select v3.x
    </p>
  </header>

  <!-- ========== v3.1.0 FEATURES ========== -->
  <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
    <h2 class="text-2xl font-bold text-green-800 mb-2">🆕 New in v3.1.0</h2>
    <p class="text-green-700">Search highlighting, auto dropdown positioning, and enhanced option descriptions</p>
  </div>

  <!-- Search Highlighting -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">🔍</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Search Highlighting</h2>
        <p class="text-gray-600">Matched text is highlighted in yellow as you type</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Try searching for "java" or "script" to see highlighting in action!
      </p>
      <Select
        options={highlightOptions}
        bind:value={highlightValue}
        highlightSearchMatch={true}
        placeholder="Search programming languages..."
        theme="green"
      />
      {#if highlightValue}
        <p class="mt-4 text-sm text-gray-700">Selected: <code class="bg-gray-100 px-2 py-1 rounded">{highlightValue}</code></p>
      {/if}
    </div>
  </section>

  <!-- Option Descriptions -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">📝</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Option Descriptions</h2>
        <p class="text-gray-600">Show helpful descriptions below option labels</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Each option displays a subtitle description for more context.
      </p>
      <Select
        options={descriptionOptions}
        bind:value={descriptionValue}
        showOptionDescriptions={true}
        placeholder="Choose a framework..."
        theme="purple"
      />
      {#if descriptionValue}
        <p class="mt-4 text-sm text-gray-700">Selected: <code class="bg-gray-100 px-2 py-1 rounded">{descriptionValue}</code></p>
      {/if}
    </div>
  </section>

  <!-- Auto Dropdown Position -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">📍</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Auto Dropdown Position</h2>
        <p class="text-gray-600">Smart positioning based on available viewport space</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Scroll down and try opening this select near the bottom of the page - it will open upward!
      </p>
      <Select
        options={positionOptions}
        bind:value={positionValue}
        menuPlacement="auto"
        placeholder="Auto-positioned dropdown..."
        theme="orange"
      />
      {#if positionValue}
        <p class="mt-4 text-sm text-gray-700">Selected: <code class="bg-gray-100 px-2 py-1 rounded">{positionValue}</code></p>
      {/if}
    </div>
  </section>

  <!-- Divider for v3.0.0 features -->
  <div class="border-t-2 border-gray-200 pt-8">
    <h2 class="text-2xl font-bold text-gray-700 mb-2">v3.0.0 Features</h2>
    <p class="text-gray-500">The major features introduced in version 3.0.0</p>
  </div>

  <!-- Virtual Scrolling -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">⚡</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Virtual Scrolling</h2>
        <p class="text-gray-600">Handle 10,000+ options smoothly with true virtualization</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        This select has <strong>10,000 options</strong> but only renders what's visible!
        {#if !isDatasetLoaded}
          <button
            onclick={loadLargeDataset}
            disabled={isLoadingDataset}
            class="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 inline-flex"
          >
            {#if isLoadingDataset}
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            {:else}
              Load Dataset
            {/if}
          </button>
        {/if}
      </p>
      {#if isDatasetLoaded}
        <Select
          options={largeDataset}
          bind:value={virtualScrollValue}
          enableVirtualScroll={true}
          virtualScrollOverscan={10}
          placeholder="Search 10,000 options..."
          theme="blue"
        />
        {#if virtualScrollValue}
          <p class="mt-4 text-sm text-gray-700">Selected: <code class="bg-gray-100 px-2 py-1 rounded">{virtualScrollValue}</code></p>
        {/if}
      {:else}
        <div class="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
          Click "Load Dataset" to see 10,000 options in action
        </div>
      {/if}
    </div>
  </section>

  <!-- Drag & Drop -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">🎯</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Drag & Drop Reordering</h2>
        <p class="text-gray-600">Reorder multi-select tags by dragging</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Try dragging the tags to reorder them!
      </p>
      <Select
        options={skills}
        bind:value={selectedSkills}
        multiple={true}
        enableDragDrop={true}
        placeholder="Select and reorder skills..."
        theme="purple"
      />
      <p class="mt-4 text-sm text-gray-700">
        Order: <code class="bg-gray-100 px-2 py-1 rounded">{selectedSkills.join(' → ')}</code>
      </p>
    </div>
  </section>

  <!-- Fuzzy Search -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">🔍</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Fuzzy Search</h2>
        <p class="text-gray-600">Smart approximate matching</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Try typing <code class="bg-gray-100 px-2 py-1 rounded">rct</code> to match "React" or
        <code class="bg-gray-100 px-2 py-1 rounded">svlt</code> to match "Svelte"!
      </p>
      <Select
        options={frameworks}
        bind:value={fuzzyValue}
        enableFuzzySearch={true}
        fuzzySearchThreshold={0.6}
        placeholder="Try fuzzy search (e.g., 'rct' for React)..."
        theme="green"
      />
      {#if fuzzyValue}
        <p class="mt-4 text-sm text-gray-700">Selected: <strong>{fuzzyValue}</strong></p>
      {/if}
    </div>
  </section>

  <!-- Command Palette -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">⌨️</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Command Palette Mode</h2>
        <p class="text-gray-600">Cmd/Ctrl+K style centered interface</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Press <kbd class="px-2 py-1 bg-gray-200 rounded text-xs font-mono">Ctrl+K</kbd> or
        <kbd class="px-2 py-1 bg-gray-200 rounded text-xs font-mono">⌘K</kbd> to open!
      </p>
      <Select
        options={commands}
        bind:value={commandValue}
        commandPaletteMode={true}
        commandPaletteKey="k"
        showOptionIcons={true}
        placeholder="Press Cmd+K to open command palette..."
        theme="dark"
      />
      {#if commandValue}
        <p class="mt-4 text-sm text-gray-700">Selected command: <strong>{commandValue}</strong></p>
      {/if}
    </div>
  </section>

  <!-- Copy/Paste -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">📋</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Copy/Paste Support</h2>
        <p class="text-gray-600">Clipboard integration for multi-select</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Try pasting: <code class="bg-gray-100 px-2 py-1 rounded">JavaScript, TypeScript, Python</code>
      </p>
      <Select
        options={tags}
        bind:value={pasteValues}
        multiple={true}
        enableCopyPaste={true}
        pasteDelimiter=","
        placeholder="Paste comma-separated values (Ctrl+V)..."
        theme="orange"
      />
      {#if pasteValues.length > 0}
        <p class="mt-4 text-sm text-gray-700">
          Selected: <code class="bg-gray-100 px-2 py-1 rounded">{pasteValues.join(', ')}</code>
        </p>
      {/if}
    </div>
  </section>

  <!-- Collapsible Groups -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">📁</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Collapsible Groups</h2>
        <p class="text-gray-600">Click group headers to expand/collapse</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Click on group headers (Frontend, Backend, Database) to collapse/expand them
      </p>
      <Select
        options={languages}
        bind:value={groupValue}
        isGrouped={true}
        groupBy={(opt) => opt.group}
        collapsibleGroups={true}
        defaultGroupsExpanded={true}
        placeholder="Select from collapsible groups..."
        theme="pink"
      />
      {#if groupValue}
        <p class="mt-4 text-sm text-gray-700">Selected: <strong>{groupValue}</strong></p>
      {/if}
    </div>
  </section>

  <!-- Custom Templates -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">🎨</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Custom Templates</h2>
        <p class="text-gray-600">Render custom Svelte snippets</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Custom rendering with user cards showing email and role
      </p>
      <Select
        options={users}
        bind:value={userValue}
        placeholder="Select user with custom template..."
        theme="purple"
      >
        {#snippet optionTemplate(option, isSelected)}
          <div class="flex items-center gap-3 p-2">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {option.label.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-800">{option.label}</div>
              <div class="text-sm text-gray-500">{option.email}</div>
            </div>
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              {option.role}
            </span>
          </div>
        {/snippet}

        {#snippet tagTemplate(option)}
          <span class="flex items-center gap-1">
            <span class="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {option.label.split(' ').map(n => n[0]).join('')}
            </span>
            {option.label}
          </span>
        {/snippet}
      </Select>
      {#if userValue}
        <p class="mt-4 text-sm text-gray-700">Selected: <strong>{userValue}</strong></p>
      {/if}
    </div>
  </section>

  <!-- Custom Keyboard Shortcuts -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">⚡</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Custom Keyboard Shortcuts</h2>
        <p class="text-gray-600">Define your own shortcut mappings</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Try: <kbd class="px-2 py-1 bg-gray-200 rounded text-xs font-mono">Ctrl+Shift+A</kbd> (alert) or
        <kbd class="px-2 py-1 bg-gray-200 rounded text-xs font-mono">Ctrl+Shift+C</kbd> (copy to clipboard)
      </p>
      <Select
        options={skills}
        bind:value={shortcutValue}
        multiple={true}
        keyboardShortcuts={shortcuts}
        onKeyboardShortcut={(e) => console.log('Shortcut triggered:', e.key)}
        placeholder="Try custom shortcuts..."
        theme="red"
      />
    </div>
  </section>

  <!-- Spring Animations -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">🌊</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Spring Physics Animations</h2>
        <p class="text-gray-600">Smooth, natural motion with physics</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Notice the smooth, bouncy animations when opening the dropdown
      </p>
      <Select
        options={frameworks}
        bind:value={springValue}
        useSpringAnimations={true}
        springStiffness={0.3}
        springDamping={0.7}
        placeholder="Click to see spring animations..."
        theme="green"
      />
    </div>
  </section>

  <!-- Touch Gestures -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">📱</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Touch Gestures</h2>
        <p class="text-gray-600">Swipe-to-remove on mobile devices</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        On touch devices, swipe tags left or right to remove them (desktop: click the X)
      </p>
      <Select
        options={tags}
        bind:value={touchTags}
        multiple={true}
        touchOptimized={true}
        swipeToRemove={true}
        placeholder="Swipe tags to remove..."
        theme="orange"
      />
    </div>
  </section>

  <!-- WCAG AAA Accessibility -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <span class="text-4xl">♿</span>
      <div>
        <h2 class="text-3xl font-bold text-gray-800">WCAG 2.1 AAA Accessibility</h2>
        <p class="text-gray-600">Enhanced screen reader support</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-sm text-gray-600 mb-4">
        Try using a screen reader - all actions are announced in real-time!
      </p>
      <Select
        options={skills}
        bind:value={selectedSkills}
        multiple={true}
        enhancedAccessibility={true}
        announceChanges={true}
        placeholder="Screen reader friendly..."
        theme="blue"
      />
      <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <strong>Accessibility Features:</strong>
        <ul class="list-disc ml-5 mt-2 text-gray-700 space-y-1">
          <li>ARIA live regions for announcements</li>
          <li>Selection/deselection announced with count</li>
          <li>Menu open/close states announced</li>
          <li>Keyboard navigation fully supported</li>
          <li>High contrast support</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Migration Guide -->
  <section class="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">🚀 Migrating to v3.0.0</h2>
    <div class="space-y-4 text-gray-700">
      <div>
        <h3 class="font-semibold mb-2">1. Update Dependencies</h3>
        <pre class="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>npm install svelte@^5 @sveltejs/vite-plugin-svelte@^5 vite@^6</code></pre>
      </div>
      <div>
        <h3 class="font-semibold mb-2">2. Update Event Handlers</h3>
        <pre class="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;!-- Before (v2.x) --&gt;
&lt;Select on:change={'{'}handleChange{'}'} /&gt;

&lt;!-- After (v3.0.0) --&gt;
&lt;Select onChange={'{'}handleChange{'}'} /&gt;</code></pre>
      </div>
      <div>
        <h3 class="font-semibold mb-2">3. Use Svelte 5 Runes (Optional)</h3>
        <pre class="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto"><code>let value = $state(null);
let options = $state([...]);</code></pre>
      </div>
    </div>
  </section>
</div>

<style>
  kbd {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border: 1px solid #ccc;
  }
</style>
