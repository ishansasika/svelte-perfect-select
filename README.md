# Svelte Perfect Select

A modern, feature-rich, and fully accessible select component for **Svelte 5** applications. Built with react-select API compatibility, virtual scrolling, drag-drop, fuzzy search, and WCAG AAA accessibility.

> **⚠️ v3.0.0 is a major upgrade requiring Svelte 5!** If you're using Svelte 4, use v2.2.1 instead.

## ✨ What's New in v3.0.0

### 🚀 **Svelte 5 Migration**
- Completely rewritten using Svelte 5 runes ($props, $state, $derived, $effect)
- Event system migrated to callback props (onChange, onFocus, etc.)
- Modern reactivity with fine-grained control

### ⚡ **Performance**
- **Virtual Scrolling** - Handle 10,000+ options smoothly
- Only renders visible items + overscan buffer
- Automatic activation for 50+ options

### 🎯 **User Experience**
- **Drag & Drop** - Reorder multi-select tags with visual feedback
- **Command Palette Mode** - Cmd/Ctrl+K style interface
- **Fuzzy Search** - Smart matching (e.g., "slct" matches "Select")
- **Copy/Paste** - Multi-select clipboard support
- **Custom Keyboard Shortcuts** - Define your own shortcuts

### 📱 **Mobile & Touch**
- **Swipe-to-Remove** tags on mobile
- Touch-optimized gestures
- Mobile-first dropdown design

### ♿ **Accessibility**
- **WCAG 2.1 AAA compliance**
- ARIA live regions for screen readers
- Real-time announcements for all actions
- Enhanced focus management

### 🎨 **Advanced Features**
- **Collapsible Groups** - Expand/collapse option groups
- **Spring Animations** - Physics-based smooth motion
- **Custom Templates** - Render Svelte components via snippets

## Features

### Core Features
- **React-Select Compatible** - Full API compatibility with react-select
- **Modern UI** - Beautiful design with smooth, enhanced animations
- **Async Loading** - Load options asynchronously with caching support
- **Creatable Options** - Allow users to create new options on the fly
- **Search/Filter** - Built-in search functionality with custom filter support
- **Multi-Select** - Support for selecting multiple options with animated tag chips
- **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, Tab, Backspace)
- **Accessibility** - ARIA labels and comprehensive screen reader support

### Advanced Features (v2.x)
- **Select All / Deselect All** - One-click selection for multi-select mode
- **Option Grouping** - Organize options into categories with sticky headers
- **Icons in Options** - Add visual elements (SVG or images) to options
- **Badges in Options** - Display status, roles, or categories with custom colors
- **Color Themes** - 7 beautiful color themes: blue, purple, green, red, orange, pink, dark
- **Container Sizing** - 5 physical container sizes: xs, sm, md, lg, xl
- **Font Sizing** - 5 font size variants: smaller (11px), small (13px), medium (14px), large (16px), larger (18px)
- **Custom Styles** - Inject custom styles for complete control over appearance
- **Custom Render Functions** - `getOptionLabel`, `getOptionValue`, `isOptionDisabled`
- **Flexible Options** - Support for option descriptions and disabled states
- **Loading States** - Built-in loading indicators for sync and async operations
- **RTL Support** - Right-to-left language support
- **Menu Positioning** - Auto, top, or bottom placement with fixed positioning support
- **Form Compatible** - Works seamlessly with native HTML forms
- **Enhanced Animations** - Smooth dropdown animations, staggered options, and tag transitions
- **Modern UI** - Beautiful design with enhanced shadows, backdrop blur effects, and rounded corners
- **Max Selection Limit** - Limit the number of selections in multi-select mode
- **Tag Overflow Display** - Show limited tags with "+X more" badge
- **Validation States** - Built-in error, success, and warning states with messages
- **Configurable Checkboxes** - Optional checkboxes for multi-select options
- **Portal Rendering** - Render dropdown in a portal to solve z-index issues
- **Infinite Scroll** - Load more options on scroll for large async datasets

### New in v3.0.0
- **Virtual Scrolling** - True virtualization for 10,000+ options
- **Drag & Drop Reordering** - Reorder multi-select tags via drag-drop
- **Command Palette Mode** - Cmd/Ctrl+K style centered modal interface
- **Fuzzy Search** - Approximate matching algorithm
- **Copy/Paste Support** - Clipboard integration for multi-select
- **Custom Keyboard Shortcuts** - Define custom shortcut mappings
- **Touch Optimizations** - Swipe gestures for mobile
- **Collapsible Groups** - Click to expand/collapse option groups
- **Spring Animations** - Physics-based motion with configurable stiffness/damping
- **Custom Templates** - Render Svelte 5 snippets for options, tags, empty state
- **WCAG 2.1 AAA** - Enhanced accessibility with live regions
- **Enhanced Screen Reader** - Real-time announcements for all interactions

## Installation

> **Requirements:** Svelte 5.0.0 or later

Install using npm:

```bash
npm i svelte-perfect-select
```

Install using yarn:

```bash
yarn add svelte-perfect-select
```

Install using pnpm:

```bash
pnpm add svelte-perfect-select
```

## Basic Usage (Svelte 5)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let value = $state(null);
  let options = [
    {id: 'sl', label: 'Sri Lanka', value: 'sl'},
    {id: 'ind', label: 'India', value: 'ind'},
    {id: 'pak', label: 'Pakistan', value: 'pak'}
  ];
</script>

<Select {options} bind:value placeholder="Select a country..." />
```

## Props

### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Array` | `[]` | Array of options. Each option should have `id`, `label`, and `value` properties |
| `value` | `any` | `null` (single) / `[]` (multi) | The selected value(s). Supports two-way binding with `bind:value` |
| `placeholder` | `string` | `"Select..."` | Placeholder text when no option is selected |
| `selectSize` | `string` | `"medium"` | Size variant: `"smaller"`, `"small"`, `"medium"`, `"large"`, `"larger"` |
| `maxHeight` | `string` | `"300px"` | Maximum height of the dropdown |
| `name` | `string` | `"svelte-perfect-select"` | Name attribute for form compatibility |
| `id` | `string` | `"svelte-perfect-select"` | ID attribute for form compatibility |

### React-Select Compatible Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isMulti` / `multiple` | `boolean` | `false` | Enable multi-select mode |
| `isSearchable` / `searchable` | `boolean` | `true` | Enable/disable search functionality |
| `isClearable` / `clearable` | `boolean` | `true` | Show/hide the clear button |
| `isDisabled` / `disabled` | `boolean` | `false` | Disable the entire select component |
| `isLoading` / `loading` | `boolean` | `false` | Show loading spinner |
| `isRtl` | `boolean` | `false` | Enable right-to-left mode |
| `closeMenuOnSelect` | `boolean` | `!multiple` | Close menu when an option is selected |
| `hideSelectedOptions` | `boolean` | `false` | Hide already selected options in multi-select |

### Async & Creatable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadOptions` | `Function` | `null` | Async function to load options: `(inputValue) => Promise<options>` |
| `cacheOptions` | `boolean` | `true` | Cache loaded options for better performance |
| `defaultOptions` | `boolean` | `false` | Load default options on mount |
| `isCreatable` | `boolean` | `false` | Allow users to create new options |
| `allowCreateWhileLoading` | `boolean` | `false` | Allow creation during async loading |
| `createOptionPosition` | `string` | `"last"` | Position of create option: `"first"` or `"last"` |
| `formatCreateLabel` | `Function` | `(inputValue) => "Create \"inputValue\""` | Format the create option label |

### Styling & Theming Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `string` | `"blue"` | Color theme: `"blue"`, `"purple"`, `"green"`, `"red"`, `"orange"`, `"pink"`, `"dark"` |
| `containerSize` | `string` | `"md"` | Physical container size: `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"` |
| `borderRadius` | `string` | `"8px"` | Border radius for modern look (e.g., `"4px"`, `"12px"`, `"16px"`) |
| `customStyles` | `object` | `{}` | Custom style overrides: `{ container, control, menu, option, tag }` |

### Customization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getOptionLabel` | `Function` | `(option) => option.label \|\| option.value` | Extract label from option object |
| `getOptionValue` | `Function` | `(option) => option.id \|\| option.value` | Extract value from option object |
| `isOptionDisabled` | `Function` | `(option) => option.disabled \|\| false` | Determine if option is disabled |
| `filterOption` | `Function` | `null` | Custom filter function: `(option, inputValue) => boolean` |
| `noOptionsMessage` | `Function` | `() => "No options"` | Message when no options available |
| `loadingMessage` | `Function` | `() => "Loading..."` | Message during async loading |

### Menu & Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `menuPlacement` | `string` | `"auto"` | Menu placement: `"auto"`, `"top"`, `"bottom"` |
| `menuPosition` | `string` | `"absolute"` | Menu position: `"absolute"`, `"fixed"` |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `openMenuOnFocus` | `boolean` | `false` | Open menu when focused |
| `openMenuOnClick` | `boolean` | `true` | Open menu on click |
| `tabSelectsValue` | `boolean` | `true` | Select highlighted option on Tab |
| `backspaceRemovesValue` | `boolean` | `true` | Remove last value on Backspace in multi-select |
| `escapeClearsValue` | `boolean` | `false` | Clear value on Escape |

### v2.2.0 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxSelected` | `number` | `null` | Maximum number of selections allowed in multi-select mode |
| `maxSelectedMessage` | `Function` | `(max) => "Maximum ${max} items can be selected"` | Message when max selections reached |
| `maxTagsDisplay` | `number` | `null` | Maximum tags to display before showing "+X more" |
| `showTagCount` | `boolean` | `true` | Show "+X more" badge when tags exceed maxTagsDisplay |
| `validationState` | `string` | `null` | Validation state: `"error"`, `"success"`, `"warning"`, or `null` |
| `validationMessage` | `string` | `""` | Validation message to display below the select |
| `showCheckboxes` | `boolean` | `false` | Show checkboxes for multi-select options |
| `usePortal` | `boolean` | `false` | Render dropdown in a portal (document.body) |
| `portalTarget` | `HTMLElement` | `null` | Custom portal target element |
| `loadMoreOptions` | `Function` | `null` | Function for infinite scroll: `() => Promise<options>` |
| `hasMore` | `boolean` | `false` | Whether more options are available for infinite scroll |
| `loadingMore` | `boolean` | `false` | Loading state for infinite scroll |

### v3.0.0 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableVirtualScroll` | `boolean` | `true` | Enable virtual scrolling for 10,000+ options |
| `virtualScrollOverscan` | `number` | `5` | Extra items to render outside viewport |
| `enableDragDrop` | `boolean` | `false` | Enable drag & drop tag reordering |
| `commandPaletteMode` | `boolean` | `false` | Enable command palette (Cmd+K) mode |
| `commandPaletteKey` | `string` | `"k"` | Key for command palette shortcut |
| `enableFuzzySearch` | `boolean` | `false` | Enable fuzzy search algorithm |
| `fuzzySearchThreshold` | `number` | `0.6` | Fuzzy match threshold (0-1) |
| `enableCopyPaste` | `boolean` | `true` | Enable copy/paste for multi-select |
| `pasteDelimiter` | `string` | `","` | Delimiter for paste: `","` or `"newline"` |
| `touchOptimized` | `boolean` | `true` | Enable touch optimizations |
| `swipeToRemove` | `boolean` | `true` | Enable swipe-to-remove tags |
| `collapsibleGroups` | `boolean` | `false` | Enable collapsible option groups |
| `defaultGroupsExpanded` | `boolean` | `true` | Initial group state |
| `useSpringAnimations` | `boolean` | `false` | Use spring physics animations |
| `springStiffness` | `number` | `0.3` | Spring stiffness (higher = snappier) |
| `springDamping` | `number` | `0.7` | Spring damping (higher = less bouncy) |
| `keyboardShortcuts` | `object` | `{}` | Custom keyboard shortcuts: `{ "Ctrl+A": (e) => {...} }` |
| `enhancedAccessibility` | `boolean` | `true` | Enable WCAG AAA features |
| `announceChanges` | `boolean` | `true` | Screen reader announcements |
| `optionTemplate` | `Snippet` | `null` | Custom option template (Svelte 5 snippet) |
| `tagTemplate` | `Snippet` | `null` | Custom tag template (Svelte 5 snippet) |
| `noOptionsTemplate` | `Snippet` | `null` | Custom empty state template (Svelte 5 snippet) |

## Event Callbacks (Svelte 5)

> **Note:** In v3.0.0, events use callback props instead of `on:event` syntax.

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onChange` | `{ value, option, action }` | Called when selection changes |
| `onInputChange` | `{ value, action }` | Called when search input changes |
| `onFocus` | - | Called when component receives focus |
| `onBlur` | - | Called when component loses focus |
| `onMenuOpen` | - | Called when dropdown menu opens |
| `onMenuClose` | - | Called when dropdown menu closes |
| `onCreateOption` | `{ option }` | Called when a new option is created |
| `onOptionsLoaded` | `{ options }` | Called when async options load |
| `onLoadError` | `{ error }` | Called when async loading fails |
| `onMaxSelected` | `{ max, message }` | Called when max selection reached |
| `onClear` | - | Called when clear button clicked |
| `onKeyboardShortcut` | `{ key, event }` | Called on custom keyboard shortcut (v3.0.0) |

## Option Object Structure

```javascript
{
  id: 'unique-id',           // Optional: Unique identifier (auto-generated if missing)
  label: 'Display Text',     // Optional: Text to display (uses value if missing)
  value: 'option-value',     // Required: Value to be stored when selected
  description: 'Optional',   // Optional: Additional description text
  disabled: false,           // Optional: Disable this specific option
  icon: '🎨',                // Optional: Icon (string URL or HTML/SVG)
  badge: 'New',              // Optional: Badge text
  badgeColor: '#10B981',     // Optional: Badge background color
  group: 'Category'          // Optional: Group name for grouping
}
```

## Examples

### Single Select (Svelte 5)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedCountry = $state(null);
  let countries = [
    {id: 'us', label: 'United States', value: 'us'},
    {id: 'uk', label: 'United Kingdom', value: 'uk'},
    {id: 'ca', label: 'Canada', value: 'ca'}
  ];

  function handleChange(event) {
    console.log('Selected:', event);
  }
</script>

<Select
  options={countries}
  bind:value={selectedCountry}
  placeholder="Choose a country..."
  onChange={handleChange}
/>
```

### Multi-Select with Drag & Drop (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedSkills = $state([]);
  let skills = [
    {id: 'js', label: 'JavaScript', value: 'js'},
    {id: 'py', label: 'Python', value: 'py'},
    {id: 'go', label: 'Go', value: 'go'},
    {id: 'rust', label: 'Rust', value: 'rust'}
  ];
</script>

<Select
  options={skills}
  bind:value={selectedSkills}
  multiple={true}
  enableDragDrop={true}
  placeholder="Select and reorder skills..."
/>

<p>Selected: {selectedSkills.join(', ')}</p>
```

### Virtual Scrolling (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  // Generate 10,000 options
  let largeDataset = $state(
    Array.from({ length: 10000 }, (_, i) => ({
      id: `option-${i}`,
      label: `Option ${i + 1}`,
      value: `opt-${i}`
    }))
  );

  let selected = $state(null);
</script>

<!-- Virtual scrolling handles this smoothly! -->
<Select
  options={largeDataset}
  bind:value={selected}
  enableVirtualScroll={true}
  virtualScrollOverscan={10}
  placeholder="Search 10,000 options..."
/>
```

### Fuzzy Search (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let frameworks = [
    {id: 'react', label: 'React', value: 'react'},
    {id: 'svelte', label: 'Svelte', value: 'svelte'},
    {id: 'vue', label: 'Vue.js', value: 'vue'}
  ];
</script>

<!-- Try typing "rct" - it will match "React"! -->
<Select
  options={frameworks}
  enableFuzzySearch={true}
  fuzzySearchThreshold={0.6}
  placeholder="Try fuzzy search..."
/>
```

### Command Palette Mode (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let commands = [
    {id: 'new', label: 'New File', value: 'new', icon: '📄'},
    {id: 'open', label: 'Open File', value: 'open', icon: '📂'},
    {id: 'save', label: 'Save', value: 'save', icon: '💾'}
  ];
</script>

<!-- Press Cmd/Ctrl+K to open! -->
<Select
  options={commands}
  commandPaletteMode={true}
  commandPaletteKey="k"
  showOptionIcons={true}
  placeholder="Press Cmd+K..."
/>
```

### Copy/Paste Support (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedTags = $state([]);
  let tags = [
    {id: 'js', label: 'JavaScript', value: 'JavaScript'},
    {id: 'ts', label: 'TypeScript', value: 'TypeScript'},
    {id: 'py', label: 'Python', value: 'Python'}
  ];
</script>

<!-- Try pasting: "JavaScript, TypeScript" -->
<Select
  options={tags}
  bind:value={selectedTags}
  multiple={true}
  enableCopyPaste={true}
  pasteDelimiter=","
  placeholder="Paste comma-separated values..."
/>
```

### Custom Templates (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let users = [
    {id: '1', label: 'John Doe', value: 'john', email: 'john@example.com'},
    {id: '2', label: 'Jane Smith', value: 'jane', email: 'jane@example.com'}
  ];
</script>

<Select
  options={users}
  placeholder="Select user..."
>
  {#snippet optionTemplate(option, isSelected)}
    <div style="display: flex; flex-direction: column;">
      <span style="font-weight: 500;">{option.label}</span>
      <span style="font-size: 0.875em; color: #6B7280;">{option.email}</span>
    </div>
  {/snippet}

  {#snippet tagTemplate(option)}
    <span>{option.label} ({option.email})</span>
  {/snippet}
</Select>
```

### Collapsible Groups (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let languages = [
    {id: 'js', label: 'JavaScript', value: 'js', group: 'Frontend'},
    {id: 'ts', label: 'TypeScript', value: 'ts', group: 'Frontend'},
    {id: 'py', label: 'Python', value: 'py', group: 'Backend'},
    {id: 'go', label: 'Go', value: 'go', group: 'Backend'}
  ];
</script>

<!-- Click group headers to collapse/expand -->
<Select
  options={languages}
  isGrouped={true}
  groupBy={(option) => option.group}
  collapsibleGroups={true}
  defaultGroupsExpanded={true}
  placeholder="Select language..."
/>
```

### Custom Keyboard Shortcuts (v3.0.0)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let value = $state([]);
  let options = [{id: '1', label: 'Option 1', value: '1'}];

  let shortcuts = {
    'Ctrl+Shift+A': (event) => {
      console.log('Custom shortcut triggered!');
    }
  };
</script>

<Select
  {options}
  bind:value
  multiple={true}
  keyboardShortcuts={shortcuts}
  onKeyboardShortcut={(e) => console.log('Shortcut:', e.key)}
  placeholder="Try Ctrl+Shift+A..."
/>
```

### Async Loading

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedCountry = $state(null);

  async function loadCountries(inputValue) {
    const response = await fetch(`/api/countries?search=${inputValue}`);
    const data = await response.json();
    return data.map(country => ({
      id: country.code,
      label: country.name,
      value: country.code
    }));
  }
</script>

<Select
  bind:value={selectedCountry}
  loadOptions={loadCountries}
  defaultOptions={true}
  cacheOptions={true}
  placeholder="Search countries..."
/>
```

### Validation States

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedCountry = $state(null);
  let countries = [
    {id: 'us', label: 'United States', value: 'us'},
    {id: 'uk', label: 'United Kingdom', value: 'uk'}
  ];
</script>

<!-- Error state -->
<Select
  options={countries}
  bind:value={selectedCountry}
  validationState="error"
  validationMessage="Please select a country"
/>

<!-- Success state -->
<Select
  options={countries}
  bind:value={selectedCountry}
  validationState="success"
  validationMessage="Country selected successfully"
/>

<!-- Warning state -->
<Select
  options={countries}
  bind:value={selectedCountry}
  validationState="warning"
  validationMessage="This country may have restrictions"
/>
```

## Keyboard Navigation

- **Arrow Down** - Open dropdown or move to next option
- **Arrow Up** - Move to previous option
- **Enter** - Select highlighted option or toggle dropdown
- **Escape** - Close dropdown and optionally clear value
- **Tab** - Select highlighted option and close dropdown
- **Backspace** - Remove last value in multi-select
- **Ctrl/Cmd + A** - Select all (in multi-select, v3.0.0)
- **Ctrl/Cmd + K** - Open command palette (if enabled, v3.0.0)
- **Ctrl/Cmd + C** - Copy selected items (v3.0.0)
- **Ctrl/Cmd + V** - Paste values (v3.0.0)
- **Custom shortcuts** - Via `keyboardShortcuts` prop (v3.0.0)

## Touch Gestures (v3.0.0)

- **Swipe left/right** - Remove tag in multi-select mode
- **Tap** - Select/deselect options
- **Scroll** - Navigate through options

## Migration from v2.x to v3.0.0

### 1. Update Svelte

```bash
npm install svelte@^5 @sveltejs/vite-plugin-svelte@^5 vite@^6
```

### 2. Update Event Handlers

```svelte
<!-- Before (v2.x) -->
<Select on:change={handleChange} on:focus={handleFocus} />

<!-- After (v3.0.0) -->
<Select onChange={handleChange} onFocus={handleFocus} />
```

### 3. Update State (Optional but Recommended)

```svelte
<!-- Before (v2.x) -->
<script>
  let value = null;
</script>

<!-- After (v3.0.0) - Using Svelte 5 runes -->
<script>
  let value = $state(null);
</script>
```

### 4. Custom Templates (If Using)

Replace slots with snippet props. See custom templates example above.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Support

Full TypeScript support included out of the box.

```typescript
import Select, { type SelectOption, type SelectProps } from 'svelte-perfect-select';

const options: SelectOption[] = [
  { id: '1', label: 'Option 1', value: '1' },
  { id: '2', label: 'Option 2', value: '2' }
];

let selectedValue = $state<string | null>(null);
```

## Accessibility

This component follows WAI-ARIA best practices and achieves **WCAG 2.1 Level AAA** compliance:

- Proper ARIA labels and roles
- ARIA live regions for announcements (v3.0.0)
- Screen reader support with real-time updates
- Full keyboard navigation
- Enhanced focus management
- Clear focus indicators
- High contrast support

## Performance

- **Virtual scrolling** for datasets with 10,000+ items
- Efficient re-rendering with Svelte 5 fine-grained reactivity
- Option caching for async loading
- Debounced search filtering
- Optimized DOM updates

## License

MIT

## Author

Ishan Karunaratne - [ishansasika@gmail.com](mailto:ishansasika@gmail.com)

Website: [https://ishansasika.dev](https://ishansasika.dev)

## Links

- **Demo & Documentation**: [https://svelte-perfect-select.ishansasika.dev](https://svelte-perfect-select.ishansasika.dev)
- **Repository**: [https://github.com/ishansasika/svelte-perfect-select](https://github.com/ishansasika/svelte-perfect-select)
- **NPM Package**: [https://www.npmjs.com/package/svelte-perfect-select](https://www.npmjs.com/package/svelte-perfect-select)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.
