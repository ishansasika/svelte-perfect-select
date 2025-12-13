# Advanced Features Guide

This guide covers the powerful advanced features available in svelte-perfect-select v2.1.0+.

## Table of Contents
- [Select All / Deselect All](#select-all--deselect-all)
- [Option Grouping](#option-grouping)
- [Icons in Options](#icons-in-options)
- [Badges in Options](#badges-in-options)
- [Combined Features](#combined-features)

## Select All / Deselect All

Quickly select or deselect all options with a single click. Perfect for multi-select scenarios with many options.

### Usage

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedCountries = [];
  let countries = [
    {id:'us', label:'United States', value:'us'},
    {id:'uk', label:'United Kingdom', value:'uk'},
    {id:'ca', label:'Canada', value:'ca'}
  ];
</script>

<Select
  options={countries}
  bind:value={selectedCountries}
  isMulti={true}
  showSelectAll={true}
  selectAllText="Select All Countries"
  deselectAllText="Clear All"
  placeholder="Choose countries..."
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSelectAll` | `boolean` | `false` | Enable Select All button |
| `selectAllText` | `string` | `"Select All"` | Text for select all button |
| `deselectAllText` | `string` | `"Deselect All"` | Text for deselect all button |

### Features
- Shows count of selected vs total options
- Only appears when `isMulti` is true
- Hidden during search (prevents confusion)
- Accessible via keyboard
- Emits `change` event with `action: 'select-all'` or `'deselect-all'`

---

## Option Grouping

Organize options into logical groups for better navigation and user experience.

### Usage

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedLanguage = null;
  let languages = [
    {id:'js', label:'JavaScript', value:'js', group:'Frontend'},
    {id:'ts', label:'TypeScript', value:'ts', group:'Frontend'},
    {id:'py', label:'Python', value:'py', group:'Backend'},
    {id:'java', label:'Java', value:'java', group:'Backend'},
  ];
</script>

<Select
  options={languages}
  bind:value={selectedLanguage}
  isGrouped={true}
  groupBy={(option) => option.group}
  placeholder="Choose a language..."
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isGrouped` | `boolean` | `false` | Enable option grouping |
| `groupBy` | `function` | `null` | Function to extract group name from option |

### Features
- Sticky group headers while scrolling
- Visual hierarchy with indented options
- Compatible with all other features
- Group headers styled distinctly
- Works with search/filter

---

## Icons in Options

Add visual elements like icons, logos, or avatars to options.

### Usage

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedPlatform = null;
  let platforms = [
    {
      id:'twitter',
      label:'Twitter',
      value:'twitter',
      description:'Follow us on Twitter',
      icon: '<svg>...</svg>' // SVG string or HTML
    },
    {
      id:'github',
      label:'GitHub',
      value:'github',
      icon: 'https://example.com/github-icon.png' // Image URL
    }
  ];
</script>

<Select
  options={platforms}
  bind:value={selectedPlatform}
  showOptionIcons={true}
  placeholder="Choose a platform..."
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showOptionIcons` | `boolean` | `false` | Enable icon display |

### Icon Types Supported
- **SVG HTML String**: Inline SVG code
- **Image URL**: Path to image file
- **Data URI**: Base64 encoded images

### Features
- 32x32px icon containers with rounded corners
- Automatic image scaling and centering
- Works with grouped options
- Accessible (icons are decorative)
- Icons appear before option label

---

## Badges in Options

Display status, role, category, or other metadata as badges.

### Usage

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedMembers = [];
  let members = [
    {
      id:'alice',
      label:'Alice Johnson',
      value:'alice',
      description:'Senior Developer',
      badge:'Admin',
      badgeColor:'#10B981'
    },
    {
      id:'bob',
      label:'Bob Smith',
      value:'bob',
      badge:'Pro',
      badgeColor:'#3B82F6'
    }
  ];
</script>

<Select
  options={members}
  bind:value={selectedMembers}
  showOptionBadges={true}
  isMulti={true}
  placeholder="Select team members..."
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showOptionBadges` | `boolean` | `false` | Enable badge display |

### Badge Properties

Add these properties to your option objects:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `badge` | `string` | Yes | Badge text to display |
| `badgeColor` | `string` | No | Background color (hex, rgb, or CSS color) |

### Features
- Pill-shaped badges with rounded corners
- Custom colors per badge
- Positioned at the end of the option
- Works with all option types
- Compact design doesn't clutter UI

---

## Combined Features

All advanced features work together seamlessly!

### Example: Everything Combined

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedFeatures = [];
  let features = [
    {
      id:'premium1',
      label:'Analytics Dashboard',
      value:'premium1',
      group:'Premium Features',
      description:'Advanced reporting and insights',
      icon: '<svg>...</svg>',
      badge:'Pro',
      badgeColor:'#F59E0B'
    },
    {
      id:'standard1',
      label:'Basic Reports',
      value:'standard1',
      group:'Standard Features',
      description:'Essential reporting tools',
      icon: '<svg>...</svg>',
      badge:'Free',
      badgeColor:'#9CA3AF'
    }
  ];
</script>

<Select
  options={features}
  bind:value={selectedFeatures}
  isMulti={true}
  isGrouped={true}
  groupBy={(opt) => opt.group}
  showOptionIcons={true}
  showOptionBadges={true}
  showSelectAll={true}
  theme="purple"
  containerSize="lg"
  placeholder="Select features..."
/>
```

### Best Practices

1. **Performance**: For lists with 100+ options, consider:
   - Using search to reduce visible options
   - Lazy loading with async `loadOptions`
   - Virtual scrolling (maxOptionsDisplay prop)

2. **Accessibility**:
   - Icons are decorative - ensure labels are descriptive
   - Badge text should be meaningful
   - Group names should be clear
   - Test with screen readers

3. **Visual Design**:
   - Keep badge text short (1-2 words)
   - Use consistent badge colors for categories
   - Limit icon size for consistency
   - Don't overuse all features at once unless needed

4. **User Experience**:
   - Group logically (by category, status, priority)
   - Use Select All sparingly (best for <50 options)
   - Combine features purposefully
   - Test on mobile devices

---

## Custom Empty States

Customize messages shown when no options are available:

```svelte
<Select
  options={[]}
  emptyStateText="No items available"
  emptySearchText="No results match your search"
/>
```

### Props

| Prop | Type | Default |
|------|------|---------|
| `emptyStateText` | `string` | `"No options available"` |
| `emptySearchText` | `string` | `"No results found"` |

---

## Performance Considerations

### Virtual Scrolling (Coming Soon)

For extremely large lists (1000+ options):

```svelte
<Select
  options={hugeList}
  maxOptionsDisplay={100}
  optionHeight={40}
/>
```

Currently, these props are defined but virtual scrolling implementation is planned for a future release.

---

## TypeScript Support

All advanced features are fully typed:

```typescript
import Select, { type SelectOption } from 'svelte-perfect-select';

const options: SelectOption[] = [
  {
    id: '1',
    label: 'Option with everything',
    value: '1',
    group: 'Group A',
    description: 'Description text',
    icon: '<svg>...</svg>',
    badge: 'New',
    badgeColor: '#10B981'
  }
];
```

---

## Examples

See the demo app (`src/App.svelte`) for interactive examples of all advanced features!

Run the demo:
```bash
npm run dev
```

Then open http://localhost:5173 to see all features in action.
