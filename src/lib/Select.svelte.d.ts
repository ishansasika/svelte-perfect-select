import { SvelteComponentTyped } from 'svelte';

export interface SelectOption {
  id: string;
  label: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
  icon?: string | any; // URL string or HTML/SVG element
  badge?: string;
  badgeColor?: string;
  group?: string; // Group name for option grouping
  __isNew__?: boolean;
  __isCreate__?: boolean;
}

export interface SelectChangeEvent {
  value: any;
  option?: SelectOption;
  action: 'select-option' | 'remove-value' | 'clear' | 'set-value' | 'select-all' | 'deselect-all';
}

export interface SelectInputChangeEvent {
  value: string;
  action: 'input-change' | 'set-value';
}

export interface SelectCreateOptionEvent {
  option: SelectOption;
}

export interface SelectOptionsLoadedEvent {
  options: SelectOption[];
}

export interface SelectLoadErrorEvent {
  error: Error;
}

export interface CustomStyles {
  container?: string;
  control?: string;
  menu?: string;
  option?: string;
  tag?: string;
}

export interface FilterOptionInput {
  label: string;
  value: any;
  data: SelectOption;
}

export interface SelectProps {
  /**
   * Array of options to display
   * @default []
   */
  options?: SelectOption[];

  /**
   * Selected value(s). Use single value for single-select, array for multi-select
   * @default null (single) / [] (multi)
   */
  value?: any;

  /**
   * Placeholder text when no option is selected
   * @default "Select..."
   */
  placeholder?: string;

  /**
   * Enable multi-select mode
   * @default false
   */
  isMulti?: boolean;

  /**
   * Alias for isMulti
   * @default false
   */
  multiple?: boolean;

  /**
   * Enable search functionality
   * @default true
   */
  isSearchable?: boolean;

  /**
   * Alias for isSearchable
   * @default true
   */
  searchable?: boolean;

  /**
   * Show clear button
   * @default true
   */
  isClearable?: boolean;

  /**
   * Alias for isClearable
   * @default true
   */
  clearable?: boolean;

  /**
   * Disable the component
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Alias for isDisabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Show loading spinner
   * @default false
   */
  isLoading?: boolean;

  /**
   * Alias for isLoading
   * @default false
   */
  loading?: boolean;

  /**
   * Enable right-to-left mode
   * @default false
   */
  isRtl?: boolean;

  /**
   * Close menu when an option is selected
   * @default !multiple
   */
  closeMenuOnSelect?: boolean;

  /**
   * Hide already selected options in multi-select
   * @default false
   */
  hideSelectedOptions?: boolean;

  /**
   * Allow creating new options
   * @default false
   */
  isCreatable?: boolean;

  /**
   * Allow creating options while async loading
   * @default false
   */
  allowCreateWhileLoading?: boolean;

  /**
   * Position of create option: 'first' or 'last'
   * @default "last"
   */
  createOptionPosition?: 'first' | 'last';

  /**
   * Format the create option label
   * @default (inputValue) => `Create "${inputValue}"`
   */
  formatCreateLabel?: (inputValue: string) => string;

  /**
   * Async function to load options
   * @default null
   */
  loadOptions?: (inputValue: string) => Promise<SelectOption[]>;

  /**
   * Cache loaded options
   * @default true
   */
  cacheOptions?: boolean;

  /**
   * Load default options on mount
   * @default false
   */
  defaultOptions?: boolean;

  /**
   * Font size variant: 'smaller', 'small', 'medium', 'large', 'larger'
   * @default "medium"
   */
  selectSize?: 'smaller' | 'small' | 'medium' | 'large' | 'larger';

  /**
   * Container physical size: 'xs', 'sm', 'md', 'lg', 'xl'
   * @default "md"
   */
  containerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Color theme
   * @default "blue"
   */
  theme?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'pink' | 'dark';

  /**
   * Border radius (CSS value)
   * @default "8px"
   */
  borderRadius?: string;

  /**
   * Custom style overrides
   * @default {}
   */
  customStyles?: CustomStyles;

  /**
   * Maximum height of dropdown (CSS value)
   * @default "300px"
   */
  maxHeight?: string;

  /**
   * Menu placement: 'auto', 'top', 'bottom'
   * @default "auto"
   */
  menuPlacement?: 'auto' | 'top' | 'bottom';

  /**
   * Menu position: 'absolute', 'fixed'
   * @default "absolute"
   */
  menuPosition?: 'absolute' | 'fixed';

  /**
   * Extract label from option object
   * @default (option) => option.label || option.value
   */
  getOptionLabel?: (option: SelectOption) => string;

  /**
   * Extract value from option object
   * @default (option) => option.id || option.value
   */
  getOptionValue?: (option: SelectOption) => any;

  /**
   * Determine if option is disabled
   * @default (option) => option.disabled || false
   */
  isOptionDisabled?: (option: SelectOption) => boolean;

  /**
   * Custom filter function
   * @default null
   */
  filterOption?: (option: FilterOptionInput, inputValue: string) => boolean;

  /**
   * Enable grouped options
   * @default false
   */
  isGrouped?: boolean;

  /**
   * Function to group options by a property
   * @default null
   */
  groupBy?: ((option: SelectOption) => string) | null;

  /**
   * Show Select All / Deselect All button for multi-select
   * @default false
   */
  showSelectAll?: boolean;

  /**
   * Text for "Select All" button
   * @default "Select All"
   */
  selectAllText?: string;

  /**
   * Text for "Deselect All" button
   * @default "Deselect All"
   */
  deselectAllText?: string;

  /**
   * Enable icon support in options
   * @default false
   */
  showOptionIcons?: boolean;

  /**
   * Enable badge support in options
   * @default false
   */
  showOptionBadges?: boolean;

  /**
   * Maximum options to render (virtual scrolling threshold)
   * @default 1000
   */
  maxOptionsDisplay?: number;

  /**
   * Height of each option for virtual scrolling
   * @default 40
   */
  optionHeight?: number;

  /**
   * Text to show when no options are available
   * @default "No options available"
   */
  emptyStateText?: string;

  /**
   * Text to show when search returns no results
   * @default "No results found"
   */
  emptySearchText?: string;

  /**
   * HTML name attribute
   * @default "svelte-perfect-select"
   */
  name?: string;

  /**
   * HTML id attribute
   * @default "svelte-perfect-select"
   */
  id?: string;

  /**
   * Auto focus on mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Open menu when component receives focus
   * @default false
   */
  openMenuOnFocus?: boolean;

  /**
   * Open menu on click
   * @default true
   */
  openMenuOnClick?: boolean;

  /**
   * Select highlighted option on Tab key
   * @default true
   */
  tabSelectsValue?: boolean;

  /**
   * Remove last value on Backspace in multi-select
   * @default true
   */
  backspaceRemovesValue?: boolean;

  /**
   * Clear value on Escape key
   * @default false
   */
  escapeClearsValue?: boolean;

  /**
   * Message when no options available
   * @default () => "No options"
   */
  noOptionsMessage?: (obj: { inputValue: string }) => string;

  /**
   * Message during async loading
   * @default () => "Loading..."
   */
  loadingMessage?: () => string;
}

export interface SelectEvents {
  /**
   * Fired when selection changes
   */
  change: CustomEvent<SelectChangeEvent>;

  /**
   * Fired when clear button is clicked
   */
  clear: CustomEvent<void>;

  /**
   * Fired when component receives focus
   */
  focus: CustomEvent<void>;

  /**
   * Fired when component loses focus
   */
  blur: CustomEvent<void>;

  /**
   * Fired when dropdown menu opens
   */
  menuOpen: CustomEvent<void>;

  /**
   * Fired when dropdown menu closes
   */
  menuClose: CustomEvent<void>;

  /**
   * Fired when search input changes
   */
  inputChange: CustomEvent<SelectInputChangeEvent>;

  /**
   * Fired when a new option is created (creatable mode)
   */
  createOption: CustomEvent<SelectCreateOptionEvent>;

  /**
   * Fired when async options are loaded successfully
   */
  optionsLoaded: CustomEvent<SelectOptionsLoadedEvent>;

  /**
   * Fired when async loading fails
   */
  loadError: CustomEvent<SelectLoadErrorEvent>;
}

export default class Select extends SvelteComponentTyped<
  SelectProps,
  SelectEvents,
  Record<string, never>
> {}
