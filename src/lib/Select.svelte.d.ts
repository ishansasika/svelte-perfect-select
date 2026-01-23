import type { Component, Snippet } from 'svelte';

export interface SelectOption {
  id?: string;
  label?: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
  icon?: string | any; // URL string or HTML/SVG element
  badge?: string;
  badgeColor?: string;
  group?: string; // Group name for option grouping
  image?: string; // v3.2.0: Avatar/image URL
  avatar?: string; // v3.2.0: Avatar/image URL (alias for image)
  __isNew__?: boolean;
  __isCreate__?: boolean;
  __virtualIndex__?: number; // Internal: used for virtual scrolling
}

export interface SelectChangeEvent {
  value: any;
  option?: SelectOption;
  action: 'select-option' | 'remove-value' | 'clear' | 'set-value' | 'select-all' | 'deselect-all' | 'reorder' | 'paste';
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

export interface SelectMaxSelectedEvent {
  max: number;
  message: string;
}

export interface SelectKeyboardShortcutEvent {
  key: string;
  event: KeyboardEvent;
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

export interface KeyboardShortcuts {
  [key: string]: (event: KeyboardEvent) => void;
}

export interface SelectProps {
  // ========== BASIC PROPS ==========

  /**
   * Array of options to display
   * @default []
   */
  options?: SelectOption[];

  /**
   * Selected value(s). Use single value for single-select, array for multi-select.
   * Supports two-way binding in Svelte 5 with bind:value
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

  // ========== ASYNC SUPPORT ==========

  /**
   * Async function to load options
   * @default null
   */
  loadOptions?: ((inputValue: string) => Promise<SelectOption[]>) | null;

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

  // ========== STYLING & SIZE ==========

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

  // ========== OPTION CUSTOMIZATION ==========

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
  filterOption?: ((option: FilterOptionInput, inputValue: string) => boolean) | null;

  // ========== GROUPS ==========

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

  // ========== ADVANCED FEATURES (v2.x) ==========

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

  // ========== v2.2.0 FEATURES ==========

  /**
   * Maximum number of selections allowed in multi-select mode
   * @default null (unlimited)
   */
  maxSelected?: number | null;

  /**
   * Message to display when max selections reached
   * @default (max) => `Maximum ${max} items can be selected`
   */
  maxSelectedMessage?: (max: number) => string;

  /**
   * Maximum number of tags to display before showing "+X more"
   * @default null (show all)
   */
  maxTagsDisplay?: number | null;

  /**
   * Show "+X more" badge when tags exceed maxTagsDisplay
   * @default true
   */
  showTagCount?: boolean;

  /**
   * Validation state: 'error', 'success', 'warning', or null
   * @default null
   */
  validationState?: 'error' | 'success' | 'warning' | null;

  /**
   * Validation message to display below the select
   * @default ""
   */
  validationMessage?: string;

  /**
   * Show checkboxes for multi-select options
   * @default false
   */
  showCheckboxes?: boolean;

  /**
   * Render dropdown in a portal (document.body or custom target)
   * @default false
   */
  usePortal?: boolean;

  /**
   * Custom portal target element (defaults to document.body)
   * @default null
   */
  portalTarget?: HTMLElement | null;

  /**
   * Function for infinite scroll pagination
   * @default null
   */
  loadMoreOptions?: (() => Promise<SelectOption[]>) | null;

  /**
   * Whether more options are available for infinite scroll
   * @default false
   */
  hasMore?: boolean;

  /**
   * Loading state for infinite scroll
   * @default false
   */
  loadingMore?: boolean;

  // ========== v3.0.0 NEW FEATURES ==========

  /**
   * Enable true virtual scrolling for performance with large datasets (10,000+ options)
   * Only renders visible items in viewport
   * @default true
   */
  enableVirtualScroll?: boolean;

  /**
   * Number of extra items to render outside viewport for smooth scrolling
   * @default 5
   */
  virtualScrollOverscan?: number;

  /**
   * Enable drag and drop reordering of multi-select tags
   * @default false
   */
  enableDragDrop?: boolean;

  /**
   * Enable command palette mode (Cmd/Ctrl+K style interface)
   * Displays select as a centered modal overlay
   * @default false
   */
  commandPaletteMode?: boolean;

  /**
   * Keyboard shortcut key for opening command palette (use with Cmd/Ctrl)
   * @default "k"
   */
  commandPaletteKey?: string;

  /**
   * Enable fuzzy search algorithm for approximate matching
   * Matches non-consecutive characters (e.g., "slct" matches "Select")
   * @default false
   */
  enableFuzzySearch?: boolean;

  /**
   * Fuzzy search matching threshold (0-1, lower is more permissive)
   * @default 0.6
   */
  fuzzySearchThreshold?: number;

  /**
   * Enable copy/paste support for multi-select mode
   * Paste comma/newline-separated values to add multiple items
   * Copy selected items to clipboard
   * @default true
   */
  enableCopyPaste?: boolean;

  /**
   * Delimiter for pasting multiple values
   * Use "newline" for line-separated, or any string like ","
   * @default ","
   */
  pasteDelimiter?: string | 'newline';

  /**
   * Enable touch/mobile optimizations
   * @default true
   */
  touchOptimized?: boolean;

  /**
   * Enable swipe gesture to remove tags on mobile
   * @default true
   */
  swipeToRemove?: boolean;

  /**
   * Enable collapsible option groups
   * Click group header to expand/collapse
   * @default false
   */
  collapsibleGroups?: boolean;

  /**
   * Initial state of groups (expanded or collapsed)
   * @default true
   */
  defaultGroupsExpanded?: boolean;

  /**
   * Use spring physics animations for smooth, natural motion
   * @default false
   */
  useSpringAnimations?: boolean;

  /**
   * Spring animation stiffness (higher = snappier)
   * @default 0.3
   */
  springStiffness?: number;

  /**
   * Spring animation damping (higher = less bouncy)
   * @default 0.7
   */
  springDamping?: number;

  /**
   * Custom keyboard shortcuts map
   * Format: { "Ctrl+Shift+A": (event) => {...}, ... }
   * @default {}
   */
  keyboardShortcuts?: KeyboardShortcuts;

  /**
   * Enable enhanced accessibility features (WCAG 2.1 AAA)
   * Includes live regions, screen reader announcements, improved focus management
   * @default true
   */
  enhancedAccessibility?: boolean;

  /**
   * Announce changes to screen readers (selections, removals, etc.)
   * Requires enhancedAccessibility to be true
   * @default true
   */
  announceChanges?: boolean;

  // ========== v3.1.0 FEATURES ==========

  /**
   * Enable search term highlighting in option labels
   * @default true
   */
  highlightSearchMatch?: boolean;

  /**
   * CSS class name for highlighted search text
   * @default "search-highlight"
   */
  highlightClassName?: string;

  /**
   * Show option descriptions when available
   * @default true
   */
  showOptionDescriptions?: boolean;

  // ========== v3.2.0 FEATURES ==========

  /**
   * Enable group selection - click group header to select/deselect all options in group
   * Only works in multi-select mode with grouped options
   * @default false
   */
  groupSelectsAll?: boolean;

  /**
   * Show avatars from option.image or option.avatar fields
   * Displays circular avatar images in both options and tags
   * @default false
   */
  showAvatar?: boolean;

  /**
   * Enable Material Design-style floating label
   * Placeholder animates up when focused or has value
   * @default false
   */
  floatingLabel?: boolean;

  // ========== CUSTOM RENDERING (Svelte 5 Snippets) ==========

  /**
   * Custom template for rendering options
   * Receives (option: SelectOption, isSelected: boolean)
   * @default null
   */
  optionTemplate?: Snippet<[SelectOption, boolean]> | null;

  /**
   * Custom template for rendering tags in multi-select
   * Receives (option: SelectOption)
   * @default null
   */
  tagTemplate?: Snippet<[SelectOption]> | null;

  /**
   * Custom template for empty state / no options
   * Receives no parameters
   * @default null
   */
  noOptionsTemplate?: Snippet | null;

  // ========== MISC ==========

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
  noOptionsMessage?: () => string;

  /**
   * Message during async loading
   * @default () => "Loading..."
   */
  loadingMessage?: () => string;

  // ========== EVENT CALLBACKS (Svelte 5 Style) ==========

  /**
   * Called when selection changes
   */
  onChange?: (event: SelectChangeEvent) => void;

  /**
   * Called when search input changes
   */
  onInputChange?: (event: SelectInputChangeEvent) => void;

  /**
   * Called when component receives focus
   */
  onFocus?: () => void;

  /**
   * Called when component loses focus
   */
  onBlur?: () => void;

  /**
   * Called when dropdown menu opens
   */
  onMenuOpen?: () => void;

  /**
   * Called when dropdown menu closes
   */
  onMenuClose?: () => void;

  /**
   * Called when a new option is created (creatable mode)
   */
  onCreateOption?: (event: SelectCreateOptionEvent) => void;

  /**
   * Called when async options are loaded successfully
   */
  onOptionsLoaded?: (event: SelectOptionsLoadedEvent) => void;

  /**
   * Called when async loading fails
   */
  onLoadError?: (event: SelectLoadErrorEvent) => void;

  /**
   * Called when max selection limit is reached
   */
  onMaxSelected?: (event: SelectMaxSelectedEvent) => void;

  /**
   * Called when clear button is clicked
   */
  onClear?: () => void;

  /**
   * Called when a custom keyboard shortcut is triggered (v3.0.0)
   */
  onKeyboardShortcut?: (event: SelectKeyboardShortcutEvent) => void;
}

/**
 * svelte-perfect-select v3.0.0
 *
 * A modern, feature-rich select component for Svelte 5 with react-select API compatibility.
 *
 * Features:
 * - Svelte 5 runes and modern APIs
 * - Virtual scrolling for 10,000+ options
 * - Drag & drop tag reordering
 * - Command palette mode (Cmd+K)
 * - Fuzzy search
 * - Custom keyboard shortcuts
 * - Copy/paste support
 * - Touch optimizations
 * - Collapsible groups
 * - Spring animations
 * - WCAG 2.1 AAA accessibility
 * - Custom templates via snippets
 * - And all v2.x features!
 */
declare const Select: Component<SelectProps>;

export default Select;
