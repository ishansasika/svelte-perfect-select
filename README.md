# Svelte Perfect Select

A modern, feature-rich, and fully accessible select component for Svelte applications. Built with react-select API compatibility, enhanced animations, and a focus on user experience.

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

### Advanced Features
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
- **Modern UI** - Beautiful design with enhanced shadows, backdrop effects, and rounded corners

## Installation

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

## Basic Usage

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let value = null;
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
| `value` | `any` | `null` (single) / `[]` (multi) | The selected value(s) |
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

## Option Object Structure

```javascript
{
  id: 'unique-id',           // Required: Unique identifier for the option
  label: 'Display Text',     // Required: Text to display in dropdown
  value: 'option-value',     // Required: Value to be stored when selected
  description: 'Optional',   // Optional: Additional description text
  disabled: false            // Optional: Disable this specific option
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value, option, action }` | Fired when selection changes |
| `clear` | - | Fired when the clear button is clicked |
| `focus` | - | Fired when the component receives focus |
| `blur` | - | Fired when the component loses focus |
| `menuOpen` | - | Fired when the dropdown menu opens |
| `menuClose` | - | Fired when the dropdown menu closes |
| `inputChange` | `{ value, action }` | Fired when search input changes |
| `createOption` | `{ option }` | Fired when a new option is created (creatable mode) |
| `optionsLoaded` | `{ options }` | Fired when async options are loaded successfully |
| `loadError` | `{ error }` | Fired when async loading fails |

## Examples

### Single Select with Search

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedCountry = null;
  let countries = [
    {id: 'us', label: 'United States', value: 'us'},
    {id: 'uk', label: 'United Kingdom', value: 'uk'},
    {id: 'ca', label: 'Canada', value: 'ca'}
  ];

  function handleChange(event) {
    console.log('Selected:', event.detail);
  }
</script>

<Select
  options={countries}
  bind:value={selectedCountry}
  placeholder="Choose a country..."
  on:change={handleChange}
/>
```

### Multi-Select with Tags

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedSkills = [];
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
  isMulti={true}
  placeholder="Select your skills..."
/>

<p>Selected: {selectedSkills.join(', ')}</p>
```

### Options with Descriptions

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let framework = null;
  let frameworks = [
    {
      id: 'react',
      label: 'React',
      value: 'react',
      description: 'A JavaScript library for building user interfaces'
    },
    {
      id: 'vue',
      label: 'Vue.js',
      value: 'vue',
      description: 'The Progressive JavaScript Framework'
    },
    {
      id: 'svelte',
      label: 'Svelte',
      value: 'svelte',
      description: 'Cybernetically enhanced web apps'
    }
  ];
</script>

<Select
  options={frameworks}
  bind:value={framework}
  placeholder="Pick a framework..."
/>
```

### Async Loading (React-Select Compatible)

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedCountry = null;

  async function loadCountries(inputValue) {
    // Simulate API call
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

### Creatable Select

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let selectedColor = null;
  let colors = [
    {id: 'red', label: 'Red', value: 'red'},
    {id: 'blue', label: 'Blue', value: 'blue'},
    {id: 'green', label: 'Green', value: 'green'}
  ];

  function handleCreateOption(event) {
    const newOption = event.detail.option;
    colors = [...colors, newOption];
    console.log('Created:', newOption);
  }
</script>

<Select
  options={colors}
  bind:value={selectedColor}
  isCreatable={true}
  placeholder="Select or create a color..."
  on:createOption={handleCreateOption}
/>
```

### Disabled Options

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let options = [
    {id: '1', label: 'Available Option', value: '1'},
    {id: '2', label: 'Disabled Option', value: '2', disabled: true},
    {id: '3', label: 'Another Available', value: '3'}
  ];
</script>

<Select {options} placeholder="Some options are disabled..." />
```

### Loading State

```svelte
<script>
  import Select from 'svelte-perfect-select';

  let value = null;
  let options = [];
  let loading = true;

  // Simulate API call
  setTimeout(() => {
    options = [
      {id: '1', label: 'Option 1', value: '1'},
      {id: '2', label: 'Option 2', value: '2'}
    ];
    loading = false;
  }, 2000);
</script>

<Select {options} bind:value isLoading={loading} placeholder="Loading options..." />
```

### Different Font Sizes

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<Select {options} selectSize="smaller" placeholder="Smaller (11px)" />
<Select {options} selectSize="small" placeholder="Small (13px)" />
<Select {options} selectSize="medium" placeholder="Medium (14px)" />
<Select {options} selectSize="large" placeholder="Large (16px)" />
<Select {options} selectSize="larger" placeholder="Larger (18px)" />
```

### Different Container Sizes

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<Select {options} containerSize="xs" placeholder="Extra Small" />
<Select {options} containerSize="sm" placeholder="Small" />
<Select {options} containerSize="md" placeholder="Medium (Default)" />
<Select {options} containerSize="lg" placeholder="Large" />
<Select {options} containerSize="xl" placeholder="Extra Large" />
```

### Color Themes

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<!-- 7 Beautiful Color Themes -->
<Select {options} theme="blue" placeholder="Blue theme (default)" />
<Select {options} theme="purple" placeholder="Purple theme" />
<Select {options} theme="green" placeholder="Green theme" />
<Select {options} theme="red" placeholder="Red theme" />
<Select {options} theme="orange" placeholder="Orange theme" />
<Select {options} theme="pink" placeholder="Pink theme" />
<Select {options} theme="dark" placeholder="Dark theme" />

<!-- Themes work great with multi-select -->
<Select {options} theme="purple" isMulti={true} placeholder="Purple multi-select" />
```

### Custom Styles

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<!-- Inject custom CSS for complete control -->
<Select
  {options}
  customStyles={{
    container: 'border: 2px solid #9333EA; background: #F9FAFB;',
    control: 'background: rgba(255, 255, 255, 0.95);',
    menu: 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);',
    option: 'padding: 12px;',
    tag: 'background: #9333EA; color: white;'
  }}
  placeholder="Fully customized select"
/>

<!-- Combine with themes for hybrid styling -->
<Select
  {options}
  theme="green"
  borderRadius="12px"
  customStyles={{
    container: 'box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);'
  }}
  placeholder="Green theme with custom shadow"
/>
```

### Combined Features

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<!-- Combine size, theme, and styling options -->
<Select
  {options}
  theme="purple"
  selectSize="large"
  containerSize="lg"
  borderRadius="16px"
  isMulti={true}
  placeholder="Large purple multi-select with rounded corners"
/>
```

### Without Search

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<Select {options} isSearchable={false} placeholder="No search box..." />
```

### Disabled Select

```svelte
<script>
  import Select from 'svelte-perfect-select';
  let options = [{id: '1', label: 'Option 1', value: '1'}];
</script>

<Select {options} isDisabled={true} placeholder="This is disabled..." />
```

## Keyboard Navigation

- **Arrow Down** - Open dropdown or move to next option
- **Arrow Up** - Move to previous option
- **Enter** - Select highlighted option or toggle dropdown
- **Escape** - Close dropdown and optionally clear value (`escapeClearsValue`)
- **Tab** - Select highlighted option (if `tabSelectsValue`) and close dropdown
- **Backspace** - Remove last selected value in multi-select mode (if `backspaceRemovesValue`)
- **Type to search** - Search and filter options when searchable is enabled

## Styling

The component uses scoped CSS with modern styling out of the box. You can customize the appearance by:

1. Using the `selectSize` prop for font sizes
2. Overriding CSS custom properties (if added in future versions)
3. Wrapping in a container with custom styles

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

This component follows WAI-ARIA best practices:

- Proper ARIA labels and roles
- Screen reader support
- Keyboard navigation
- Focus management
- Clear focus indicators

## License

MIT

## Author

Ishan Karunaratne - [ishansasika@gmail.com](mailto:ishansasika@gmail.com)

## Repository

[https://github.com/ishansasika/svelte-perfect-select](https://github.com/ishansasika/svelte-perfect-select)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
