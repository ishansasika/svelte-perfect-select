<script>
  import { onMount, tick, untrack } from 'svelte';
  import { scale, fly, fade } from 'svelte/transition';
  import { spring } from 'svelte/motion';

  // ========== PROPS - Svelte 5 Style ==========
  let {
    // Basic props
    options = [],
    value = $bindable(undefined),
    placeholder = "Select...",
    isMulti = false,
    multiple = isMulti,
    isSearchable = true,
    searchable = isSearchable,
    isClearable = true,
    clearable = isClearable,
    isDisabled = false,
    disabled = isDisabled,
    isLoading = false,
    loading = isLoading,
    isRtl = false,
    closeMenuOnSelect = !multiple,
    hideSelectedOptions = false,
    isCreatable = false,
    allowCreateWhileLoading = false,
    createOptionPosition = 'last',
    formatCreateLabel = (inputValue) => `Create "${inputValue}"`,

    // Async support
    loadOptions = null,
    cacheOptions = true,
    defaultOptions = false,

    // Styling & Size
    selectSize = "medium",
    containerSize = "md",
    theme = "blue",
    borderRadius = "8px",
    customStyles = {},
    maxHeight = "300px",
    menuPlacement = "auto",
    menuPosition = "absolute",

    // Option customization
    getOptionLabel = (option) => option.label || option.value,
    getOptionValue = (option) => option.id || option.value,
    isOptionDisabled = (option) => option.disabled || false,
    filterOption = null,

    // Groups
    isGrouped = false,
    groupBy = null,

    // Advanced Features (v2.x)
    showSelectAll = false,
    selectAllText = "Select All",
    deselectAllText = "Deselect All",
    showOptionIcons = false,
    showOptionBadges = false,
    maxOptionsDisplay = 1000,
    optionHeight = 40,
    emptyStateText = "No options available",
    emptySearchText = "No results found",

    // v2.2.0 Features
    maxSelected = null,
    maxSelectedMessage = (max) => `Maximum ${max} items can be selected`,
    maxTagsDisplay = null,
    showTagCount = true,
    validationState = null,
    validationMessage = "",
    showCheckboxes = false,
    usePortal = false,
    portalTarget = null,
    loadMoreOptions = null,
    hasMore = false,
    loadingMore = false,

    // v3.0.0 NEW FEATURES
    enableVirtualScroll = true, // Virtual scrolling for performance
    virtualScrollOverscan = 5, // Extra items to render
    enableDragDrop = false, // Drag & drop tag reordering
    commandPaletteMode = false, // Cmd+K style interface
    commandPaletteKey = 'k', // Keyboard shortcut key
    enableFuzzySearch = false, // Fuzzy search algorithm
    fuzzySearchThreshold = 0.6, // Fuzzy match threshold (0-1)
    enableCopyPaste = true, // Copy/paste support
    pasteDelimiter = ',', // Delimiter for paste (comma, newline, etc.)
    touchOptimized = true, // Touch/mobile optimizations
    swipeToRemove = true, // Swipe tags to remove (mobile)
    collapsibleGroups = false, // Collapsible option groups
    defaultGroupsExpanded = true, // Initial group state
    useSpringAnimations = false, // Spring physics animations
    springStiffness = 0.3, // Spring stiffness
    springDamping = 0.7, // Spring damping
    keyboardShortcuts = {}, // Custom keyboard shortcuts
    enhancedAccessibility = true, // WCAG 2.1 AAA features
    announceChanges = true, // Screen reader announcements

    // v3.1.0 NEW FEATURES
    highlightSearchMatch = true, // Highlight matched text in options
    highlightClassName = "search-highlight", // CSS class for highlighted text
    showOptionDescriptions = true, // Show option.description if available

    // v3.2.0 NEW FEATURES
    groupSelectsAll = false, // Enable group selection/deselection
    showAvatar = false, // Show avatars from option.image or option.avatar
    floatingLabel = false, // Material Design-style floating label

    // Custom rendering (Svelte 5 snippets)
    optionTemplate = null, // Custom option template snippet
    tagTemplate = null, // Custom tag template snippet
    noOptionsTemplate = null, // Custom empty state snippet

    // Misc
    name = "svelte-perfect-select",
    id = "svelte-perfect-select",
    autoFocus = false,
    openMenuOnFocus = false,
    openMenuOnClick = true,
    tabSelectsValue = true,
    backspaceRemovesValue = true,
    escapeClearsValue = false,
    noOptionsMessage = () => "No options",
    loadingMessage = () => "Loading...",

    // Event callbacks (Svelte 5 style - replaces createEventDispatcher)
    onChange = null,
    onInputChange = null,
    onFocus = null,
    onBlur = null,
    onMenuOpen = null,
    onMenuClose = null,
    onCreateOption = null,
    onOptionsLoaded = null,
    onLoadError = null,
    onMaxSelected = null,
    onClear = null,
    onKeyboardShortcut = null
  } = $props();

  // ========== THEME COLORS ==========
  const themes = {
    blue: { primary: '#2684FF', secondary: '#DEEBFF', tag: '#E6F2FF', tagText: '#0052CC', tagBorder: '#CCE0FF' },
    purple: { primary: '#9333EA', secondary: '#F3E8FF', tag: '#FAF5FF', tagText: '#7E22CE', tagBorder: '#E9D5FF' },
    green: { primary: '#10B981', secondary: '#D1FAE5', tag: '#ECFDF5', tagText: '#059669', tagBorder: '#A7F3D0' },
    red: { primary: '#EF4444', secondary: '#FEE2E2', tag: '#FEF2F2', tagText: '#DC2626', tagBorder: '#FECACA' },
    orange: { primary: '#F97316', secondary: '#FFEDD5', tag: '#FFF7ED', tagText: '#EA580C', tagBorder: '#FED7AA' },
    pink: { primary: '#EC4899', secondary: '#FCE7F3', tag: '#FDF2F8', tagText: '#DB2777', tagBorder: '#FBCFE8' },
    dark: { primary: '#1F2937', secondary: '#E5E7EB', tag: '#F3F4F6', tagText: '#111827', tagBorder: '#D1D5DB' }
  };

  // ========== STATE (Svelte 5 $state) ==========
  let isOpen = $state(false);
  let searchTerm = $state("");
  let highlightedIndex = $state(-1);
  let highlightedValue = $state(null); // v3.2.0: For grouped options highlighting
  let selectContainer = $state(null);
  let searchInput = $state(null);
  let menuRef = $state(null);
  let internalOptions = $state(options.length > 0 ? [...options] : []);
  let optionsCache = $state({});
  let isLoadingAsync = $state(false);
  let portalElement = $state(null);
  let isLoadingMoreOptions = $state(false);
  let showMaxSelectionWarning = $state(false);

  // v3.0.0 State
  let draggedTagIndex = $state(null);
  let dragOverTagIndex = $state(null);
  let collapsedGroups = $state(new Set());
  let virtualScrollTop = $state(0);
  let touchStartX = $state(0);
  let touchCurrentX = $state(0);
  let swipingTagIndex = $state(null);
  let liveRegionMessage = $state("");
  let commandPaletteOpen = $state(false);

  // v3.1.0 State
  let calculatedDropdownPosition = $state("bottom"); // 'top' or 'bottom'

  // Spring animations for smooth interactions
  const dropdownY = spring(0, { stiffness: springStiffness, damping: springDamping });
  const tagScale = spring(1, { stiffness: 0.5, damping: 0.8 });

  // ========== DERIVED STATE (Svelte 5 $derived) ==========
  const currentTheme = $derived(themes[theme] || themes.blue);

  const filteredOptions = $derived.by(() => {
    return getFilteredOptions(internalOptions, searchTerm);
  });

  const selectedOptions = $derived.by(() => {
    return multiple
      ? internalOptions.filter(opt => value?.includes(getOptionValue(opt)))
      : internalOptions.find(opt => getOptionValue(opt) === value);
  });

  const displayText = $derived.by(() => {
    return multiple
      ? (value?.length > 0 ? `${value.length} selected` : placeholder)
      : (selectedOptions ? getOptionLabel(selectedOptions) : placeholder);
  });

  const visibleTags = $derived.by(() => {
    return maxTagsDisplay && selectedOptions?.length > maxTagsDisplay
      ? selectedOptions.slice(0, maxTagsDisplay)
      : selectedOptions;
  });

  // v3.2.0 - Floating label state
  const shouldFloatLabel = $derived(
    floatingLabel && (isOpen || (value != null && (multiple ? (Array.isArray(value) && value.length > 0) : true)))
  );

  const hiddenTagsCount = $derived.by(() => {
    return maxTagsDisplay && selectedOptions?.length > maxTagsDisplay
      ? selectedOptions.length - maxTagsDisplay
      : 0;
  });

  const isMaxSelectionReached = $derived(maxSelected && multiple && value?.length >= maxSelected);

  const validationColors = {
    error: { border: '#EF4444', shadow: 'rgba(239, 68, 68, 0.1)', text: '#DC2626' },
    success: { border: '#10B981', shadow: 'rgba(16, 185, 129, 0.1)', text: '#059669' },
    warning: { border: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.1)', text: '#D97706' }
  };

  const currentValidation = $derived(
    validationState && validationColors[validationState]
      ? validationColors[validationState]
      : null
  );

  const showCreateOption = $derived(
    isCreatable &&
    searchTerm.length > 0 &&
    !filteredOptions.some(opt => getOptionLabel(opt).toLowerCase() === searchTerm.toLowerCase()) &&
    (!isLoadingAsync || allowCreateWhileLoading)
  );

  const groupedOptions = $derived.by(() => {
    if (isGrouped && groupBy && typeof groupBy === 'function') {
      return groupOptions(filteredOptions, groupBy);
    }
    return null;
  });

  const displayOptions = $derived.by(() => {
    if (showCreateOption) {
      return createOptionPosition === 'first'
        ? [{ __isCreate__: true, value: searchTerm }, ...filteredOptions]
        : [...filteredOptions, { __isCreate__: true, value: searchTerm }];
    }
    return filteredOptions;
  });

  const allOptionsSelected = $derived(
    multiple && value?.length > 0 &&
    displayOptions.filter(opt => !isOptionDisabled(opt)).every(opt => value.includes(getOptionValue(opt)))
  );

  const someOptionsSelected = $derived(multiple && value?.length > 0 && !allOptionsSelected);

  // Virtual scrolling calculations
  const virtualizedOptions = $derived.by(() => {
    if (!enableVirtualScroll || displayOptions.length < 50) {
      return { visibleOptions: displayOptions, offsetY: 0, totalHeight: displayOptions.length * optionHeight };
    }

    const scrollTop = virtualScrollTop;
    const containerHeight = 300; // Approximate, will be measured
    const startIndex = Math.max(0, Math.floor(scrollTop / optionHeight) - virtualScrollOverscan);
    const endIndex = Math.min(
      displayOptions.length,
      Math.ceil((scrollTop + containerHeight) / optionHeight) + virtualScrollOverscan
    );

    const visibleOptions = displayOptions.slice(startIndex, endIndex).map((opt, idx) => ({
      ...opt,
      __virtualIndex__: startIndex + idx
    }));

    return {
      visibleOptions,
      offsetY: startIndex * optionHeight,
      totalHeight: displayOptions.length * optionHeight
    };
  });

  // ========== EFFECTS (Svelte 5 $effect) ==========
  $effect(() => {
    if (options) {
      internalOptions = [...options];
    }
  });

  $effect(() => {
    // Sync bidirectional prop aliases
    untrack(() => {
      if (multiple !== isMulti) multiple = isMulti;
      if (searchable !== isSearchable) searchable = isSearchable;
      if (clearable !== isClearable) clearable = isClearable;
      if (disabled !== isDisabled) disabled = isDisabled;
      if (loading !== isLoading) loading = isLoading;
    });

    // Initialize value if undefined
    if (value === undefined) {
      value = multiple ? [] : null;
    }
  });

  $effect(() => {
    if (isOpen) {
      highlightedIndex = -1;
    }
  });

  // Announce changes to screen readers (v3.0.0 Accessibility)
  $effect(() => {
    if (enhancedAccessibility && announceChanges && liveRegionMessage) {
      // Screen readers will announce the message
      const timeout = setTimeout(() => {
        liveRegionMessage = "";
      }, 1000);
      return () => clearTimeout(timeout);
    }
  });

  // ========== FUZZY SEARCH (v3.0.0) ==========
  function fuzzyMatch(text, pattern) {
    if (!pattern) return true;

    text = text.toLowerCase();
    pattern = pattern.toLowerCase();

    let textIndex = 0;
    let patternIndex = 0;
    let score = 0;
    let consecutiveMatches = 0;

    while (textIndex < text.length && patternIndex < pattern.length) {
      if (text[textIndex] === pattern[patternIndex]) {
        score += 1 + consecutiveMatches;
        consecutiveMatches++;
        patternIndex++;
      } else {
        consecutiveMatches = 0;
      }
      textIndex++;
    }

    if (patternIndex !== pattern.length) return false;

    const normalizedScore = score / (text.length + pattern.length);
    return normalizedScore >= fuzzySearchThreshold;
  }

  // ========== v3.1.0 SEARCH HIGHLIGHTING ==========
  function highlightText(text, term) {
    if (!highlightSearchMatch || !term || !text) return text;

    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const index = lowerText.indexOf(lowerTerm);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + term.length);
    const after = text.slice(index + term.length);

    return { before, match, after, hasMatch: true };
  }

  // ========== v3.1.0 DROPDOWN POSITION DETECTION ==========
  function calculateDropdownPosition() {
    if (menuPlacement !== 'auto') {
      calculatedDropdownPosition = menuPlacement === 'top' ? 'top' : 'bottom';
      return;
    }

    if (!selectContainer) {
      calculatedDropdownPosition = 'bottom';
      return;
    }

    const rect = selectContainer.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = parseInt(maxHeight) || 300;

    // If not enough space below but enough above, show on top
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      calculatedDropdownPosition = 'top';
    } else {
      calculatedDropdownPosition = 'bottom';
    }
  }

  // ========== FILTER OPTIONS ==========
  function getFilteredOptions(opts, term) {
    if (!searchable || !term) return opts;

    if (filterOption) {
      return opts.filter(opt => filterOption({ label: getOptionLabel(opt), value: getOptionValue(opt), data: opt }, term));
    }

    if (enableFuzzySearch) {
      return opts.filter(opt => {
        const label = getOptionLabel(opt);
        return label && fuzzyMatch(label, term);
      });
    }

    const lowerTerm = term.toLowerCase();
    return opts.filter(opt => {
      const label = getOptionLabel(opt);
      return label && label.toLowerCase().includes(lowerTerm);
    });
  }

  // ========== CREATE OPTION ==========
  function createOption(inputValue) {
    const newOption = {
      id: `created-${Date.now()}`,
      value: inputValue,
      label: inputValue,
      __isNew__: true
    };

    onCreateOption?.({ option: newOption });
    selectOption(newOption);
  }

  // ========== GROUP OPTIONS ==========
  function groupOptions(opts, groupFn) {
    return opts.reduce((groups, option) => {
      const groupKey = groupFn(option);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(option);
      return groups;
    }, {});
  }

  // ========== TOGGLE DROPDOWN ==========
  async function toggleDropdown() {
    if (disabled) return;

    if (!isOpen && loadOptions && defaultOptions) {
      await handleLoadOptions('');
    }

    isOpen = !isOpen;

    if (isOpen) {
      // v3.1.0: Calculate dropdown position before opening
      calculateDropdownPosition();

      if (useSpringAnimations) {
        dropdownY.set(-10);
        dropdownY.set(0);
      }

      if (searchable) {
        await tick();
        searchInput?.focus();
      }
      onMenuOpen?.();

      if (announceChanges) {
        liveRegionMessage = "Options menu opened";
      }
    } else {
      onMenuClose?.();
      searchTerm = "";
      highlightedIndex = -1;
      highlightedValue = null; // v3.2.0: Reset highlighted value for groups

      if (announceChanges) {
        liveRegionMessage = "Options menu closed";
      }
    }
  }

  // ========== SELECT OPTION ==========
  function selectOption(option) {
    if (option.__isCreate__) {
      createOption(option.value);
      return;
    }

    if (isOptionDisabled(option)) return;

    const optionValue = getOptionValue(option);

    if (multiple) {
      const index = value.indexOf(optionValue);
      if (index > -1) {
        // Deselecting
        value = value.filter(v => v !== optionValue);
        showMaxSelectionWarning = false;

        if (announceChanges) {
          liveRegionMessage = `Removed ${getOptionLabel(option)}. ${value.length} items selected.`;
        }
      } else {
        // Selecting - check max limit
        if (maxSelected && value.length >= maxSelected) {
          showMaxSelectionWarning = true;
          onMaxSelected?.({ max: maxSelected, message: maxSelectedMessage(maxSelected) });
          setTimeout(() => {
            showMaxSelectionWarning = false;
          }, 3000);
          return;
        }
        value = hideSelectedOptions ? [...value, optionValue] : [...value, optionValue];
        showMaxSelectionWarning = false;

        if (announceChanges) {
          liveRegionMessage = `Selected ${getOptionLabel(option)}. ${value.length} items selected.`;
        }
      }
    } else {
      value = optionValue;
      if (closeMenuOnSelect) {
        isOpen = false;
        searchTerm = "";
      }

      if (announceChanges) {
        liveRegionMessage = `Selected ${getOptionLabel(option)}`;
      }
    }

    onChange?.({ value, option, action: 'select-option' });
    onInputChange?.({ value: '', action: 'set-value' });
  }

  // ========== REMOVE OPTION ==========
  function removeOption(optionValue, event) {
    event?.stopPropagation();
    const removedOption = internalOptions.find(opt => getOptionValue(opt) === optionValue);
    value = value.filter(v => v !== optionValue);
    onChange?.({ value, action: 'remove-value' });

    if (announceChanges && removedOption) {
      liveRegionMessage = `Removed ${getOptionLabel(removedOption)}. ${value.length} items selected.`;
    }
  }

  // ========== CLEAR SELECTION ==========
  function clearSelection(event) {
    event?.stopPropagation();
    value = multiple ? [] : null;
    searchTerm = "";
    onClear?.();
    onChange?.({ value, action: 'clear' });

    if (announceChanges) {
      liveRegionMessage = "Selection cleared";
    }
  }

  // ========== SELECT ALL / DESELECT ALL ==========
  function selectAll() {
    if (!multiple) return;
    const selectableOptions = displayOptions.filter(opt => !isOptionDisabled(opt) && !opt.__isCreate__);
    value = selectableOptions.map(opt => getOptionValue(opt));
    onChange?.({ value, action: 'select-all' });

    if (announceChanges) {
      liveRegionMessage = `Selected all ${value.length} items`;
    }
  }

  function deselectAll() {
    if (!multiple) return;
    value = [];
    onChange?.({ value, action: 'deselect-all' });

    if (announceChanges) {
      liveRegionMessage = "Deselected all items";
    }
  }

  function toggleSelectAll() {
    if (allOptionsSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  }

  // ========== GROUP SELECTION (v3.2.0) ==========
  function toggleGroupSelection(groupName, groupOptions) {
    if (!multiple || !groupSelectsAll) return;

    // Ensure value is an array
    if (!value || !Array.isArray(value)) {
      value = [];
    }

    const groupValues = groupOptions
      .filter(opt => !isOptionDisabled(opt))
      .map(opt => getOptionValue(opt));

    // Check if all group options are selected
    const allGroupSelected = groupValues.length > 0 && groupValues.every(val => value.includes(val));

    if (allGroupSelected) {
      // Deselect all in group
      value = value.filter(v => !groupValues.includes(v));
      if (announceChanges) {
        liveRegionMessage = `Deselected all items in group ${groupName}`;
      }
    } else {
      // Select all in group (respecting maxSelected limit)
      const newValues = [...new Set([...value, ...groupValues])];
      if (maxSelected && newValues.length > maxSelected) {
        showMaxSelectionWarning = true;
        onMaxSelected?.({ max: maxSelected, message: maxSelectedMessage(maxSelected) });
        setTimeout(() => {
          showMaxSelectionWarning = false;
        }, 3000);
        return;
      }
      value = newValues;
      if (announceChanges) {
        liveRegionMessage = `Selected all items in group ${groupName}`;
      }
    }

    onChange?.({ value, action: allGroupSelected ? 'deselect-all' : 'select-all' });
  }

  function isGroupFullySelected(groupOptions) {
    if (!multiple || !value || !Array.isArray(value)) return false;
    const groupValues = groupOptions
      .filter(opt => !isOptionDisabled(opt))
      .map(opt => getOptionValue(opt));
    return groupValues.length > 0 && groupValues.every(val => value.includes(val));
  }

  function isGroupPartiallySelected(groupOptions) {
    if (!multiple || !value || !Array.isArray(value)) return false;
    const groupValues = groupOptions
      .filter(opt => !isOptionDisabled(opt))
      .map(opt => getOptionValue(opt));
    const selectedCount = groupValues.filter(val => value.includes(val)).length;
    return selectedCount > 0 && selectedCount < groupValues.length;
  }

  // ========== SEARCH ==========
  async function handleSearch(event) {
    searchTerm = event.target.value;
    onInputChange?.({ value: searchTerm, action: 'input-change' });

    if (loadOptions) {
      await handleLoadOptions(searchTerm);
    }
  }

  // ========== ASYNC LOADING ==========
  async function handleLoadOptions(inputValue = '') {
    if (!loadOptions) return;

    if (cacheOptions && optionsCache[inputValue]) {
      internalOptions = optionsCache[inputValue];
      return;
    }

    isLoadingAsync = true;
    try {
      const loadedOptions = await loadOptions(inputValue);
      internalOptions = loadedOptions || [];
      if (cacheOptions) {
        optionsCache[inputValue] = internalOptions;
      }
      onOptionsLoaded?.({ options: internalOptions });
    } catch (error) {
      onLoadError?.({ error });
    } finally {
      isLoadingAsync = false;
    }
  }

  // ========== KEYBOARD NAVIGATION ==========
  function handleKeydown(event) {
    if (disabled) return;

    // Custom keyboard shortcuts (v3.0.0)
    const shortcutKey = `${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`;
    if (keyboardShortcuts[shortcutKey]) {
      event.preventDefault();
      keyboardShortcuts[shortcutKey](event);
      onKeyboardShortcut?.({ key: shortcutKey, event });
      return;
    }

    // Command palette mode (Cmd/Ctrl + K)
    if (commandPaletteMode && ((event.metaKey || event.ctrlKey) && event.key === commandPaletteKey)) {
      event.preventDefault();
      commandPaletteOpen = !commandPaletteOpen;
      isOpen = commandPaletteOpen;
      return;
    }

    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          isOpen = true;
        } else {
          highlightedIndex = Math.min(highlightedIndex + 1, displayOptions.length - 1);
          scrollToHighlighted();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          highlightedIndex = Math.max(highlightedIndex - 1, 0);
          scrollToHighlighted();
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          selectOption(displayOptions[highlightedIndex]);
        } else {
          toggleDropdown();
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (escapeClearsValue && !isOpen) {
          clearSelection();
        } else {
          isOpen = false;
          searchTerm = "";
          highlightedIndex = -1;
        }
        break;
      case 'Tab':
        if (isOpen && tabSelectsValue && highlightedIndex >= 0) {
          event.preventDefault();
          selectOption(displayOptions[highlightedIndex]);
        }
        if (isOpen) {
          isOpen = false;
          searchTerm = "";
        }
        break;
      case 'Backspace':
        if (multiple && backspaceRemovesValue && !searchTerm && value.length > 0) {
          removeOption(value[value.length - 1]);
        }
        break;
      case 'a':
        // Ctrl/Cmd + A to select all (v3.0.0)
        if ((event.ctrlKey || event.metaKey) && multiple && isOpen) {
          event.preventDefault();
          selectAll();
        }
        break;
    }
  }

  // ========== SCROLL TO HIGHLIGHTED ==========
  function scrollToHighlighted() {
    const optionElements = menuRef?.querySelectorAll('.option');
    const highlighted = optionElements?.[highlightedIndex];
    if (highlighted && menuRef) {
      const menuRect = menuRef.getBoundingClientRect();
      const highlightedRect = highlighted.getBoundingClientRect();

      if (highlightedRect.bottom > menuRect.bottom) {
        menuRef.scrollTop += highlightedRect.bottom - menuRect.bottom;
      } else if (highlightedRect.top < menuRect.top) {
        menuRef.scrollTop -= menuRect.top - highlightedRect.top;
      }
    }
  }

  // ========== CLICK OUTSIDE ==========
  function handleClickOutside(event) {
    if (selectContainer && !selectContainer.contains(event.target)) {
      if (isOpen) {
        onBlur?.();
      }
      isOpen = false;
      searchTerm = "";
      highlightedIndex = -1;
      commandPaletteOpen = false;
    }
  }

  // ========== IS SELECTED ==========
  function isSelected(option) {
    return multiple
      ? value?.includes(getOptionValue(option))
      : value === getOptionValue(option);
  }

  // ========== HANDLE FOCUS ==========
  function handleFocus() {
    if (openMenuOnFocus && !disabled) {
      isOpen = true;
    }
    onFocus?.();
  }

  // ========== INFINITE SCROLL ==========
  async function handleInfiniteScroll(event) {
    if (!loadMoreOptions || !hasMore || isLoadingMoreOptions) return;

    const target = event.target;
    const scrollThreshold = 50;

    if (target.scrollHeight - target.scrollTop - target.clientHeight < scrollThreshold) {
      isLoadingMoreOptions = true;
      try {
        const newOptions = await loadMoreOptions();
        if (newOptions && newOptions.length > 0) {
          internalOptions = [...internalOptions, ...newOptions];
          onOptionsLoaded?.({ options: newOptions });
        }
      } catch (error) {
        onLoadError?.({ error });
      } finally {
        isLoadingMoreOptions = false;
      }
    }
  }

  // ========== VIRTUAL SCROLL HANDLER (v3.0.0) ==========
  function handleVirtualScroll(event) {
    virtualScrollTop = event.target.scrollTop;
    handleInfiniteScroll(event); // Also handle infinite scroll
  }

  // ========== DRAG & DROP FOR TAGS (v3.0.0) ==========
  function handleTagDragStart(event, index) {
    if (!enableDragDrop) return;
    draggedTagIndex = index;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', index.toString());

    if (announceChanges) {
      liveRegionMessage = `Started dragging ${getOptionLabel(selectedOptions[index])}`;
    }
  }

  function handleTagDragOver(event, index) {
    if (!enableDragDrop) return;
    event.preventDefault();
    dragOverTagIndex = index;
  }

  function handleTagDrop(event, dropIndex) {
    if (!enableDragDrop) return;
    event.preventDefault();

    if (draggedTagIndex === null || draggedTagIndex === dropIndex) {
      draggedTagIndex = null;
      dragOverTagIndex = null;
      return;
    }

    // Reorder the value array
    const newSelectedOptions = [...selectedOptions];
    const [draggedOption] = newSelectedOptions.splice(draggedTagIndex, 1);
    newSelectedOptions.splice(dropIndex, 0, draggedOption);

    value = newSelectedOptions.map(opt => getOptionValue(opt));
    onChange?.({ value, action: 'reorder' });

    if (announceChanges) {
      liveRegionMessage = `Moved ${getOptionLabel(draggedOption)} to position ${dropIndex + 1}`;
    }

    draggedTagIndex = null;
    dragOverTagIndex = null;
  }

  function handleTagDragEnd() {
    draggedTagIndex = null;
    dragOverTagIndex = null;
  }

  // ========== TOUCH GESTURES (v3.0.0) ==========
  function handleTouchStart(event, index) {
    if (!touchOptimized || !swipeToRemove) return;
    touchStartX = event.touches[0].clientX;
    touchCurrentX = touchStartX;
    swipingTagIndex = index;
  }

  function handleTouchMove(event, index) {
    if (!touchOptimized || !swipeToRemove || swipingTagIndex !== index) return;
    touchCurrentX = event.touches[0].clientX;
  }

  function handleTouchEnd(event, index, optionValue) {
    if (!touchOptimized || !swipeToRemove || swipingTagIndex !== index) return;

    const swipeDistance = touchCurrentX - touchStartX;
    const swipeThreshold = 50; // pixels

    if (Math.abs(swipeDistance) > swipeThreshold) {
      // Swipe detected - remove tag
      removeOption(optionValue, event);

      if (announceChanges) {
        liveRegionMessage = "Tag removed by swipe";
      }
    }

    touchStartX = 0;
    touchCurrentX = 0;
    swipingTagIndex = null;
  }

  // ========== COPY/PASTE SUPPORT (v3.0.0) ==========
  function handlePaste(event) {
    if (!enableCopyPaste || !multiple) return;

    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const delimiter = pasteDelimiter === 'newline' ? '\n' : pasteDelimiter;
    const pastedValues = pastedText.split(delimiter).map(v => v.trim()).filter(v => v);

    // Try to match pasted values with options
    const matchedOptions = pastedValues.map(pastedValue => {
      return internalOptions.find(opt =>
        getOptionLabel(opt).toLowerCase() === pastedValue.toLowerCase() ||
        getOptionValue(opt).toString() === pastedValue
      );
    }).filter(opt => opt && !isOptionDisabled(opt));

    if (matchedOptions.length > 0) {
      const newValues = matchedOptions.map(opt => getOptionValue(opt));
      value = [...new Set([...value, ...newValues])]; // Deduplicate
      onChange?.({ value, action: 'paste' });

      if (announceChanges) {
        liveRegionMessage = `Pasted and selected ${matchedOptions.length} items`;
      }
    }
  }

  function handleCopy(event) {
    if (!enableCopyPaste || !multiple || !value || value.length === 0) return;

    const selectedLabels = selectedOptions.map(opt => getOptionLabel(opt)).join(', ');
    event.clipboardData.setData('text/plain', selectedLabels);
    event.preventDefault();

    if (announceChanges) {
      liveRegionMessage = `Copied ${value.length} items to clipboard`;
    }
  }

  // ========== TOGGLE GROUP COLLAPSE (v3.0.0) ==========
  function toggleGroupCollapse(groupName) {
    if (!collapsibleGroups) return;

    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupName)) {
      newCollapsed.delete(groupName);
      if (announceChanges) {
        liveRegionMessage = `Expanded group ${groupName}`;
      }
    } else {
      newCollapsed.add(groupName);
      if (announceChanges) {
        liveRegionMessage = `Collapsed group ${groupName}`;
      }
    }
    collapsedGroups = newCollapsed;
  }

  // ========== INDETERMINATE CHECKBOX ACTION (v3.2.0) ==========
  function indeterminate(node, isIndeterminate) {
    node.indeterminate = isIndeterminate;
    return {
      update(isIndeterminate) {
        node.indeterminate = isIndeterminate;
      }
    };
  }

  // ========== PORTAL ==========
  function createPortal() {
    if (!usePortal) return;
    portalElement = portalTarget || document.body;
  }

  function destroyPortal() {
    portalElement = null;
  }

  // ========== LIFECYCLE ==========
  onMount(() => {
    document.addEventListener('click', handleClickOutside);

    if (autoFocus) {
      selectContainer?.focus();
    }

    if (loadOptions && defaultOptions) {
      handleLoadOptions('');
    }

    createPortal();

    // Initialize collapsed groups
    if (collapsibleGroups && !defaultGroupsExpanded && groupedOptions) {
      collapsedGroups = new Set(Object.keys(groupedOptions));
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      destroyPortal();
    };
  });
</script>

<div
  class="select-container {selectSize} {containerSize} theme-{theme}"
  class:disabled
  class:rtl={isRtl}
  class:command-palette={commandPaletteMode && commandPaletteOpen}
  class:floating-label-mode={floatingLabel}
  bind:this={selectContainer}
  onkeydown={handleKeydown}
  onpaste={handlePaste}
  oncopy={handleCopy}
  role="combobox"
  tabindex="0"
  aria-controls="options-list"
  aria-expanded={isOpen}
  onfocus={handleFocus}
  style="{customStyles.container || ''}"
>
  {#if floatingLabel}
    <label class="floating-label" class:floated={shouldFloatLabel}>
      {placeholder}
    </label>
  {/if}

  <div
    class="select-trigger"
    class:open={isOpen}
    class:focused={isOpen}
    class:validation-error={validationState === 'error'}
    class:validation-success={validationState === 'success'}
    class:validation-warning={validationState === 'warning'}
    onclick={() => openMenuOnClick && toggleDropdown()}
    onkeydown={handleKeydown}
    tabindex={disabled ? -1 : 0}
    role="button"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-label={placeholder}
    style="{currentValidation ? `border-color: ${currentValidation.border}; box-shadow: 0 0 0 3px ${currentValidation.shadow};` : ''} {customStyles.control || ''}"
  >
    <div class="select-value">
      {#if multiple && value?.length > 0}
        <div class="tags">
          {#each visibleTags as option, index (getOptionValue(option))}
            {@const optVal = getOptionValue(option)}
            {@const isDragging = draggedTagIndex === index}
            {@const isDragOver = dragOverTagIndex === index}
            {@const isSwiping = swipingTagIndex === index}
            {@const swipeOffset = isSwiping ? touchCurrentX - touchStartX : 0}

            <span
              class="tag"
              class:disabled
              class:dragging={isDragging}
              class:drag-over={isDragOver}
              draggable={enableDragDrop && !disabled}
              ondragstart={(e) => handleTagDragStart(e, index)}
              ondragover={(e) => handleTagDragOver(e, index)}
              ondrop={(e) => handleTagDrop(e, index)}
              ondragend={handleTagDragEnd}
              ontouchstart={(e) => handleTouchStart(e, index)}
              ontouchmove={(e) => handleTouchMove(e, index)}
              ontouchend={(e) => handleTouchEnd(e, index, optVal)}
              style="transform: translateX({swipeOffset}px); opacity: {Math.max(0, 1 - Math.abs(swipeOffset) / 100)}"
              in:scale="{{ duration: 200 }}"
              out:scale="{{ duration: 150 }}"
            >
              {#if tagTemplate}
                {@render tagTemplate(option)}
              {:else}
                {#if showAvatar && (option.image || option.avatar)}
                  <span class="tag-avatar">
                    <img src={option.image || option.avatar} alt="" class="tag-avatar-img" />
                  </span>
                {/if}
                <span class="tag-label">{getOptionLabel(option)}</span>
              {/if}

              {#if !disabled}
                <button
                  class="tag-remove"
                  onclick={(e) => removeOption(optVal, e)}
                  aria-label="Remove {getOptionLabel(option)}"
                  type="button"
                >
                  <svg width="14" height="14" viewBox="0 0 20 20">
                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                  </svg>
                </button>
              {/if}
            </span>
          {/each}
          {#if hiddenTagsCount > 0 && showTagCount}
            <span class="tag tag-overflow" in:scale="{{ duration: 200 }}">
              <span class="tag-label">+{hiddenTagsCount} more</span>
            </span>
          {/if}
        </div>
      {:else}
        <span class="placeholder" class:has-value={value && (!multiple || value.length > 0)}>
          {displayText}
        </span>
      {/if}
    </div>

    <div class="select-actions">
      {#if loading || isLoadingAsync}
        <div class="spinner"></div>
      {/if}
      {#if clearable && value && (!multiple || value.length > 0) && !disabled && !loading && !isLoadingAsync}
        <button
          class="clear-button"
          onclick={clearSelection}
          aria-label="Clear selection"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
        </button>
      {/if}
      <span class="separator"></span>
      <span class="arrow" class:open={isOpen}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </span>
    </div>
  </div>

  <!-- Validation Message -->
  {#if validationMessage && validationState}
    <div class="validation-message validation-{validationState}" in:fly="{{ y: -5, duration: 200 }}">
      <svg width="14" height="14" viewBox="0 0 20 20" style="flex-shrink: 0;">
        {#if validationState === 'error'}
          <path fill="currentColor" d="M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V5zm0 8h-2v2h2v-2z"/>
        {:else if validationState === 'success'}
          <path fill="currentColor" d="M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.41-6.83L6.7 9.29 5.29 10.7l3.3 3.3 7-7-1.41-1.41-5.59 5.59z"/>
        {:else}
          <path fill="currentColor" d="M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13H9v7h2V5zm0 9H9v2h2v-2z"/>
        {/if}
      </svg>
      <span>{validationMessage}</span>
    </div>
  {/if}

  <!-- Max Selection Warning -->
  {#if showMaxSelectionWarning && maxSelected}
    <div class="max-selection-warning" in:fly="{{ y: -5, duration: 200 }}" out:fade="{{ duration: 150 }}">
      <svg width="14" height="14" viewBox="0 0 20 20" style="flex-shrink: 0;">
        <path fill="currentColor" d="M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13H9v7h2V5zm0 9H9v2h2v-2z"/>
      </svg>
      <span>{maxSelectedMessage(maxSelected)}</span>
    </div>
  {/if}

  {#if isOpen}
    <div
      class="dropdown"
      class:top={calculatedDropdownPosition === 'top'}
      class:fixed={menuPosition === 'fixed'}
      class:command-palette-dropdown={commandPaletteMode && commandPaletteOpen}
      style="max-height: {maxHeight}"
      role="listbox"
      aria-multiselectable={multiple}
      in:fly="{{ y: useSpringAnimations ? $dropdownY : -10, duration: 200 }}"
      out:fade="{{ duration: 150 }}"
    >
      {#if searchable}
        <div class="search-container">
          <input
            bind:this={searchInput}
            type="text"
            class="search-input"
            placeholder={commandPaletteMode ? "Type to search..." : "Search..."}
            value={searchTerm}
            oninput={handleSearch}
            onclick={(e) => e.stopPropagation()}
            aria-label="Search options"
            aria-autocomplete="list"
          />
        </div>
      {/if}

      <div
        class="options-list"
        id="options-list"
        bind:this={menuRef}
        onscroll={enableVirtualScroll ? handleVirtualScroll : handleInfiniteScroll}
      >
        {#if isLoadingAsync}
          <div class="loading-message">{loadingMessage()}</div>
        {:else if displayOptions.length === 0}
          <div class="no-options">
            {#if noOptionsTemplate}
              {@render noOptionsTemplate()}
            {:else}
              {searchTerm ? emptySearchText : emptyStateText}
            {/if}
          </div>
        {:else}
          {#if multiple && showSelectAll && !searchTerm}
            <div class="select-all-container">
              <button
                class="select-all-button"
                onclick={toggleSelectAll}
                type="button"
                aria-label={allOptionsSelected ? deselectAllText : selectAllText}
              >
                <input
                  type="checkbox"
                  checked={allOptionsSelected}
                  indeterminate={someOptionsSelected}
                  tabindex="-1"
                  aria-hidden="true"
                  readonly
                />
                <span class="select-all-text">
                  {allOptionsSelected ? deselectAllText : selectAllText}
                </span>
                <span class="select-all-count">
                  ({value.length}/{displayOptions.filter(opt => !isOptionDisabled(opt)).length})
                </span>
              </button>
            </div>
          {/if}

          {#if groupedOptions}
            {#each Object.entries(groupedOptions) as [groupName, groupOptions]}
              {@const isCollapsed = collapsedGroups.has(groupName)}

              <div class="option-group">
                <div
                  class="option-group-label"
                  class:collapsible={collapsibleGroups}
                  class:collapsed={isCollapsed}
                  class:selectable={groupSelectsAll && multiple}
                  onclick={(e) => {
                    // Don't trigger if clicking on checkbox
                    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') return;

                    if (collapsibleGroups) {
                      toggleGroupCollapse(groupName);
                    } else if (groupSelectsAll && multiple) {
                      toggleGroupSelection(groupName, groupOptions);
                    }
                  }}
                  role={collapsibleGroups || (groupSelectsAll && multiple) ? 'button' : 'presentation'}
                  aria-expanded={collapsibleGroups ? !isCollapsed : undefined}
                  tabindex={collapsibleGroups || (groupSelectsAll && multiple) ? 0 : -1}
                >
                  {#if multiple && groupSelectsAll}
                    <span class="group-checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={isGroupFullySelected(groupOptions)}
                        use:indeterminate={isGroupPartiallySelected(groupOptions)}
                        onchange={(e) => {
                          e.stopPropagation();
                          toggleGroupSelection(groupName, groupOptions);
                        }}
                        onclick={(e) => e.stopPropagation()}
                        tabindex="-1"
                        aria-label={`Select all in ${groupName}`}
                      />
                    </span>
                  {/if}
                  {#if collapsibleGroups}
                    <svg class="group-chevron" class:collapsed={isCollapsed} width="12" height="12" viewBox="0 0 20 20">
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  {/if}
                  {groupName}
                </div>

                {#if !isCollapsed}
                  {#each groupOptions as option, index (getOptionValue(option))}
                    {@const optionValue = getOptionValue(option)}
                    <div
                      class="option"
                      class:selected={isSelected(option)}
                      class:highlighted={optionValue === highlightedValue}
                      class:disabled={isOptionDisabled(option)}
                      class:hidden={hideSelectedOptions && isSelected(option)}
                      onclick={() => selectOption(option)}
                      onkeydown={(e) => e.key === 'Enter' && selectOption(option)}
                      onmouseenter={() => highlightedValue = optionValue}
                      role="option"
                      tabindex="-1"
                      aria-selected={isSelected(option)}
                      aria-disabled={isOptionDisabled(option)}
                      in:fly="{{ y: -5, duration: 150, delay: Math.min(index * 15, 300) }}"
                    >
                      {#if multiple && showCheckboxes}
                        {#key value}
                          <input
                            type="checkbox"
                            checked={isSelected(option)}
                            onclick={(e) => e.preventDefault()}
                            disabled={isOptionDisabled(option)}
                            tabindex="-1"
                            aria-hidden="true"
                            readonly
                          />
                        {/key}
                      {/if}

                      {#if optionTemplate}
                        {@render optionTemplate(option, isSelected(option))}
                      {:else}
                        {#if showAvatar && (option.image || option.avatar)}
                          <span class="option-avatar">
                            <img src={option.image || option.avatar} alt="" class="option-avatar-img" />
                          </span>
                        {:else if showOptionIcons && option.icon}
                          <span class="option-icon">
                            {#if typeof option.icon === 'string'}
                              <img src={option.icon} alt="" class="option-icon-img" />
                            {:else}
                              {@html option.icon}
                            {/if}
                          </span>
                        {/if}
                        <div class="option-content">
                          {#if highlightSearchMatch && searchTerm}
                            {@const highlighted = highlightText(getOptionLabel(option), searchTerm)}
                            <span class="option-label">
                              {#if typeof highlighted === 'object' && highlighted.hasMatch}
                                {highlighted.before}<mark class={highlightClassName}>{highlighted.match}</mark>{highlighted.after}
                              {:else}
                                {getOptionLabel(option)}
                              {/if}
                            </span>
                          {:else}
                            <span class="option-label">{getOptionLabel(option)}</span>
                          {/if}
                          {#if showOptionDescriptions && option.description}
                            <span class="option-description">{option.description}</span>
                          {/if}
                        </div>
                        {#if showOptionBadges && option.badge}
                          <span class="option-badge" style="background-color: {option.badgeColor || '#E5E7EB'}">
                            {option.badge}
                          </span>
                        {/if}
                      {/if}

                      {#if isSelected(option)}
                        <span class="check-icon">
                          <svg width="16" height="16" viewBox="0 0 20 20">
                            <path d="M7.629 12.173l-2.83-2.83c-0.293-0.293-0.768-0.293-1.061 0s-0.293 0.768 0 1.061l3.36 3.36c0.293 0.293 0.768 0.293 1.061 0l7.36-7.36c0.293-0.293 0.293-0.768 0-1.061s-0.768-0.293-1.061 0l-6.829 6.83z"></path>
                          </svg>
                        </span>
                      {/if}
                    </div>
                  {/each}
                {/if}
              </div>
            {/each}
          {:else if enableVirtualScroll && displayOptions.length >= 50}
            <!-- Virtual Scrolling -->
            <div style="height: {virtualizedOptions.totalHeight}px; position: relative;">
              <div style="transform: translateY({virtualizedOptions.offsetY}px); position: absolute; width: 100%;">
                {#each virtualizedOptions.visibleOptions as option, index (option.__isCreate__ ? `create-${option.value}` : getOptionValue(option))}
                  {@const realIndex = option.__virtualIndex__ ?? index}
                  <div
                    class="option"
                    class:selected={!option.__isCreate__ && isSelected(option)}
                    class:highlighted={realIndex === highlightedIndex}
                    class:disabled={!option.__isCreate__ && isOptionDisabled(option)}
                    class:create-option={option.__isCreate__}
                    class:hidden={!option.__isCreate__ && hideSelectedOptions && isSelected(option)}
                    style="height: {optionHeight}px"
                    onclick={() => selectOption(option)}
                    onkeydown={(e) => e.key === 'Enter' && selectOption(option)}
                    onmouseenter={() => highlightedIndex = realIndex}
                    role="option"
                    tabindex="-1"
                    aria-selected={!option.__isCreate__ && isSelected(option)}
                    aria-disabled={!option.__isCreate__ && isOptionDisabled(option)}
                  >
                    {#if multiple && showCheckboxes && !option.__isCreate__}
                      {#key value}
                        <input
                          type="checkbox"
                          checked={isSelected(option)}
                          onclick={(e) => e.preventDefault()}
                          disabled={isOptionDisabled(option)}
                          tabindex="-1"
                          aria-hidden="true"
                          readonly
                        />
                      {/key}
                    {/if}

                    {#if optionTemplate && !option.__isCreate__}
                      {@render optionTemplate(option, isSelected(option))}
                    {:else}
                      {#if showAvatar && (option.image || option.avatar) && !option.__isCreate__}
                        <span class="option-avatar">
                          <img src={option.image || option.avatar} alt="" class="option-avatar-img" />
                        </span>
                      {:else if showOptionIcons && option.icon && !option.__isCreate__}
                        <span class="option-icon">
                          {#if typeof option.icon === 'string'}
                            <img src={option.icon} alt="" class="option-icon-img" />
                          {:else}
                            {@html option.icon}
                          {/if}
                        </span>
                      {/if}
                      <div class="option-content">
                        {#if option.__isCreate__}
                          <span class="option-label">{formatCreateLabel(option.value)}</span>
                        {:else if highlightSearchMatch && searchTerm}
                          {@const highlighted = highlightText(getOptionLabel(option), searchTerm)}
                          <span class="option-label">
                            {#if typeof highlighted === 'object' && highlighted.hasMatch}
                              {highlighted.before}<mark class={highlightClassName}>{highlighted.match}</mark>{highlighted.after}
                            {:else}
                              {getOptionLabel(option)}
                            {/if}
                          </span>
                        {:else}
                          <span class="option-label">{getOptionLabel(option)}</span>
                        {/if}
                        {#if showOptionDescriptions && option.description && !option.__isCreate__}
                          <span class="option-description">{option.description}</span>
                        {/if}
                      </div>
                      {#if showOptionBadges && option.badge && !option.__isCreate__}
                        <span class="option-badge" style="background-color: {option.badgeColor || '#E5E7EB'}">
                          {option.badge}
                        </span>
                      {/if}
                    {/if}

                    {#if !option.__isCreate__ && isSelected(option)}
                      <span class="check-icon">
                        <svg width="16" height="16" viewBox="0 0 20 20">
                          <path d="M7.629 12.173l-2.83-2.83c-0.293-0.293-0.768-0.293-1.061 0s-0.293 0.768 0 1.061l3.36 3.36c0.293 0.293 0.768 0.293 1.061 0l7.36-7.36c0.293-0.293 0.293-0.768 0-1.061s-0.768-0.293-1.061 0l-6.829 6.83z"></path>
                        </svg>
                      </span>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {:else}
            <!-- Regular rendering (non-virtualized) -->
            {#each displayOptions as option, index (option.__isCreate__ ? `create-${option.value}` : getOptionValue(option))}
              <div
                class="option"
                class:selected={!option.__isCreate__ && isSelected(option)}
                class:highlighted={index === highlightedIndex}
                class:disabled={!option.__isCreate__ && isOptionDisabled(option)}
                class:create-option={option.__isCreate__}
                class:hidden={!option.__isCreate__ && hideSelectedOptions && isSelected(option)}
                onclick={() => selectOption(option)}
                onkeydown={(e) => e.key === 'Enter' && selectOption(option)}
                onmouseenter={() => highlightedIndex = index}
                role="option"
                tabindex="-1"
                aria-selected={!option.__isCreate__ && isSelected(option)}
                aria-disabled={!option.__isCreate__ && isOptionDisabled(option)}
                in:fly="{{ y: -5, duration: 150, delay: Math.min(index * 15, 300) }}"
              >
                {#if multiple && showCheckboxes && !option.__isCreate__}
                  {#key value}
                    <input
                      type="checkbox"
                      checked={isSelected(option)}
                      onclick={(e) => e.preventDefault()}
                      disabled={isOptionDisabled(option)}
                      tabindex="-1"
                      aria-hidden="true"
                      readonly
                    />
                  {/key}
                {/if}

                {#if optionTemplate && !option.__isCreate__}
                  {@render optionTemplate(option, isSelected(option))}
                {:else}
                  {#if showAvatar && (option.image || option.avatar) && !option.__isCreate__}
                    <span class="option-avatar">
                      <img src={option.image || option.avatar} alt="" class="option-avatar-img" />
                    </span>
                  {:else if showOptionIcons && option.icon && !option.__isCreate__}
                    <span class="option-icon">
                      {#if typeof option.icon === 'string'}
                        <img src={option.icon} alt="" class="option-icon-img" />
                      {:else}
                        {@html option.icon}
                      {/if}
                    </span>
                  {/if}
                  <div class="option-content">
                    {#if option.__isCreate__}
                      <span class="option-label">{formatCreateLabel(option.value)}</span>
                    {:else if highlightSearchMatch && searchTerm}
                      {@const highlighted = highlightText(getOptionLabel(option), searchTerm)}
                      <span class="option-label">
                        {#if typeof highlighted === 'object' && highlighted.hasMatch}
                          {highlighted.before}<mark class={highlightClassName}>{highlighted.match}</mark>{highlighted.after}
                        {:else}
                          {getOptionLabel(option)}
                        {/if}
                      </span>
                    {:else}
                      <span class="option-label">{getOptionLabel(option)}</span>
                    {/if}
                    {#if showOptionDescriptions && option.description && !option.__isCreate__}
                      <span class="option-description">{option.description}</span>
                    {/if}
                  </div>
                  {#if showOptionBadges && option.badge && !option.__isCreate__}
                    <span class="option-badge" style="background-color: {option.badgeColor || '#E5E7EB'}">
                      {option.badge}
                    </span>
                  {/if}
                {/if}

                {#if !option.__isCreate__ && isSelected(option)}
                  <span class="check-icon">
                    <svg width="16" height="16" viewBox="0 0 20 20">
                      <path d="M7.629 12.173l-2.83-2.83c-0.293-0.293-0.768-0.293-1.061 0s-0.293 0.768 0 1.061l3.36 3.36c0.293 0.293 0.768 0.293 1.061 0l7.36-7.36c0.293-0.293 0.293-0.768 0-1.061s-0.768-0.293-1.061 0l-6.829 6.83z"></path>
                    </svg>
                  </span>
                {/if}
              </div>
            {/each}
          {/if}

          <!-- Infinite Scroll Loading Indicator -->
          {#if isLoadingMoreOptions}
            <div class="loading-more-message">
              <div class="spinner"></div>
              <span>Loading more...</span>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  {/if}

  <!-- Hidden native select for form compatibility -->
  {#if multiple}
    <select {name} {id} {disabled} multiple style="display: none;">
      {#each value || [] as val}
        <option value={val} selected>{val}</option>
      {/each}
    </select>
  {:else}
    <select {name} {id} {disabled} style="display: none;">
      {#if value}
        <option value={value} selected>{value}</option>
      {/if}
    </select>
  {/if}

  <!-- ARIA Live Region for Screen Reader Announcements (v3.0.0) -->
  {#if enhancedAccessibility && announceChanges}
    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {liveRegionMessage}
    </div>
  {/if}
</div>

<style>
  .select-container {
    position: relative;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Font Size variants */
  .smaller { font-size: 11px; }
  .small { font-size: 13px; }
  .medium { font-size: 14px; }
  .large { font-size: 16px; }
  .larger { font-size: 18px; }

  /* Container Size variants (physical sizing) */
  .xs .select-trigger { min-height: 28px; padding: 4px 8px; }
  .sm .select-trigger { min-height: 32px; padding: 6px 10px; }
  .md .select-trigger { min-height: 40px; padding: 8px 12px; }
  .lg .select-trigger { min-height: 48px; padding: 10px 14px; }
  .xl .select-trigger { min-height: 56px; padding: 12px 16px; }

  .select-container.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .select-container.rtl {
    direction: rtl;
  }

  /* v3.0.0 Command Palette Mode */
  .select-container.command-palette {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    max-width: 90vw;
    z-index: 10000;
  }

  .select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #ffffff;
    border: 1.5px solid #D1D5DB;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 38px;
    gap: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .select-trigger:hover:not(.disabled) {
    border-color: #9CA3AF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  .select-trigger:focus,
  .select-trigger.focused {
    outline: none;
    border-color: #2684FF;
    box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .select-trigger.open {
    border-color: #2684FF;
    box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .select-value {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 4px;
  }

  .placeholder {
    color: #999999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .placeholder.has-value {
    color: #333333;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex: 1;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: #E6F2FF;
    color: #0052CC;
    border-radius: 6px;
    font-size: 0.875em;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid #CCE0FF;
    animation: tagEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    cursor: default;
  }

  /* v3.0.0 Drag & Drop styles */
  .tag[draggable="true"] {
    cursor: move;
    cursor: grab;
  }

  .tag.dragging {
    opacity: 0.5;
    cursor: grabbing;
  }

  .tag.drag-over {
    border-color: #2684FF;
    box-shadow: 0 0 0 2px rgba(38, 132, 255, 0.2);
  }

  @keyframes tagEnter {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .tag.disabled {
    background: #f0f0f0;
    color: #666666;
    border-color: #d9d9d9;
  }

  .tag-label {
    line-height: 1.2;
  }

  .tag-remove {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: all 0.15s;
  }

  .tag-remove:hover {
    background: rgba(0, 82, 204, 0.15);
  }

  .tag-remove svg {
    fill: currentColor;
  }

  .tag-overflow {
    background: #9CA3AF !important;
    color: white !important;
    border-color: #6B7280 !important;
    cursor: default;
    font-weight: 600;
  }

  .select-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .clear-button {
    background: none;
    border: none;
    color: #999999;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    transition: all 0.15s;
  }

  .clear-button:hover {
    color: #333333;
    background: #f0f0f0;
  }

  .clear-button svg {
    fill: currentColor;
  }

  .separator {
    width: 1px;
    height: 24px;
    background: #cccccc;
    align-self: stretch;
  }

  .arrow {
    color: #999999;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    padding: 4px;
  }

  .arrow svg {
    fill: currentColor;
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #2684FF;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    overflow: hidden;
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
  }

  .dropdown.fixed {
    position: fixed;
  }

  .dropdown.top {
    top: auto;
    bottom: calc(100% + 4px);
  }

  /* v3.0.0 Command Palette Dropdown */
  .dropdown.command-palette-dropdown {
    box-shadow:
      0 30px 60px -12px rgba(0, 0, 0, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3);
  }

  .search-container {
    padding: 8px;
    border-bottom: 1px solid #f0f0f0;
    background: #ffffff;
  }

  .search-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #cccccc;
    border-radius: 3px;
    font-size: inherit;
    outline: none;
    transition: border-color 0.15s;
  }

  .search-input:focus {
    border-color: #2684FF;
    box-shadow: 0 0 0 1px #2684FF;
  }

  .options-list {
    max-height: inherit;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 4px 0;
  }

  .options-list::-webkit-scrollbar {
    width: 8px;
  }

  .options-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .options-list::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 4px;
  }

  .options-list::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }

  .select-all-container {
    padding: 8px;
    border-bottom: 1px solid #E5E7EB;
    background: #F9FAFB;
  }

  .select-all-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    background: white;
    border: 1px solid #D1D5DB;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s;
    font-size: inherit;
    color: inherit;
    font-family: inherit;
  }

  .select-all-button:hover {
    background: #F3F4F6;
    border-color: #9CA3AF;
  }

  .select-all-button input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #2684FF;
  }

  .select-all-text {
    flex: 1;
    text-align: left;
    font-weight: 500;
  }

  .select-all-count {
    color: #6B7280;
    font-size: 0.9em;
  }

  /* Option Groups */
  .option-group {
    margin: 4px 0;
  }

  .option-group-label {
    padding: 8px 12px 4px;
    font-size: 0.75em;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* v3.0.0 Collapsible Groups */
  .option-group-label.collapsible {
    cursor: pointer;
    transition: background-color 0.15s;
    user-select: none;
  }

  .option-group-label.collapsible:hover {
    background: #F3F4F6;
  }

  .group-chevron {
    fill: currentColor;
    transition: transform 0.2s;
  }

  .group-chevron.collapsed {
    transform: rotate(-90deg);
  }

  .option-group .option {
    padding-left: 20px;
  }

  /* Options */
  .option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-height: 40px;
  }

  .option-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 6px;
    overflow: hidden;
    background: #F3F4F6;
  }

  .option-icon-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .option-badge {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75em;
    font-weight: 500;
    color: #374151;
    background: #E5E7EB;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .option:hover:not(.disabled):not(.create-option) {
    background: #DEEBFF;
  }

  .option.highlighted {
    background: #DEEBFF;
  }

  .option.selected:not(.create-option) {
    background: #E6F2FF;
    font-weight: 500;
  }

  .option.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: transparent !important;
  }

  .option.hidden {
    display: none;
  }

  .option.create-option {
    color: #2684FF;
    font-weight: 500;
    background: #F0F6FF;
  }

  .option.create-option:hover {
    background: #E6F2FF;
  }

  .option input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #2684FF;
  }

  .option-label {
    font-weight: 500;
    color: #1F2937;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4;
  }

  .option-description {
    font-size: 0.875em;
    color: #6B7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3;
  }

  /* v3.1.0 Search Highlight */
  .search-highlight,
  mark.search-highlight {
    background-color: #FEF08A;
    color: inherit;
    padding: 0 2px;
    border-radius: 2px;
    font-weight: 600;
  }

  .option.highlighted .search-highlight,
  .option.highlighted mark.search-highlight {
    background-color: #FDE047;
  }

  .check-icon {
    color: #2684FF;
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .check-icon svg {
    fill: currentColor;
  }

  .no-options,
  .loading-message {
    padding: 16px 12px;
    text-align: center;
    color: #999999;
    font-size: 0.95em;
  }

  /* Validation States */
  .select-trigger.validation-error {
    border-color: #EF4444 !important;
  }

  .select-trigger.validation-success {
    border-color: #10B981 !important;
  }

  .select-trigger.validation-warning {
    border-color: #F59E0B !important;
  }

  .validation-message {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    margin-top: 6px;
    border-radius: 6px;
    font-size: 0.875em;
    line-height: 1.4;
  }

  .validation-message.validation-error {
    background: #FEF2F2;
    color: #DC2626;
    border: 1px solid #FECACA;
  }

  .validation-message.validation-success {
    background: #F0FDF4;
    color: #059669;
    border: 1px solid #BBF7D0;
  }

  .validation-message.validation-warning {
    background: #FFFBEB;
    color: #D97706;
    border: 1px solid #FDE68A;
  }

  .max-selection-warning {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    margin-top: 6px;
    border-radius: 6px;
    font-size: 0.875em;
    line-height: 1.4;
    background: #FFFBEB;
    color: #D97706;
    border: 1px solid #FDE68A;
  }

  .loading-more-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    color: #6B7280;
    font-size: 0.9em;
  }

  /* RTL Support */
  .rtl .select-actions {
    flex-direction: row-reverse;
  }

  .rtl .tags {
    flex-direction: row-reverse;
  }

  .rtl .option {
    flex-direction: row-reverse;
  }

  /* Theme Colors */
  .theme-blue .select-trigger:focus, .theme-blue .select-trigger.focused, .theme-blue .select-trigger.open { border-color: #2684FF; box-shadow: 0 0 0 1px #2684FF; }
  .theme-blue .option:hover:not(.disabled):not(.create-option), .theme-blue .option.highlighted { background: #DEEBFF; }
  .theme-blue .option.selected:not(.create-option) { background: #E6F2FF; }
  .theme-blue .tag { background: #E6F2FF; color: #0052CC; border-color: #CCE0FF; }
  .theme-blue .check-icon, .theme-blue .option.create-option { color: #2684FF; }
  .theme-blue .spinner { border-top-color: #2684FF; }
  .theme-blue .search-input:focus { border-color: #2684FF; box-shadow: 0 0 0 1px #2684FF; }

  .theme-purple .select-trigger:focus, .theme-purple .select-trigger.focused, .theme-purple .select-trigger.open { border-color: #9333EA; box-shadow: 0 0 0 1px #9333EA; }
  .theme-purple .option:hover:not(.disabled):not(.create-option), .theme-purple .option.highlighted { background: #F3E8FF; }
  .theme-purple .option.selected:not(.create-option) { background: #FAF5FF; }
  .theme-purple .tag { background: #FAF5FF; color: #7E22CE; border-color: #E9D5FF; }
  .theme-purple .check-icon, .theme-purple .option.create-option { color: #9333EA; }
  .theme-purple .spinner { border-top-color: #9333EA; }
  .theme-purple .search-input:focus { border-color: #9333EA; box-shadow: 0 0 0 1px #9333EA; }

  .theme-green .select-trigger:focus, .theme-green .select-trigger.focused, .theme-green .select-trigger.open { border-color: #10B981; box-shadow: 0 0 0 1px #10B981; }
  .theme-green .option:hover:not(.disabled):not(.create-option), .theme-green .option.highlighted { background: #D1FAE5; }
  .theme-green .option.selected:not(.create-option) { background: #ECFDF5; }
  .theme-green .tag { background: #ECFDF5; color: #059669; border-color: #A7F3D0; }
  .theme-green .check-icon, .theme-green .option.create-option { color: #10B981; }
  .theme-green .spinner { border-top-color: #10B981; }
  .theme-green .search-input:focus { border-color: #10B981; box-shadow: 0 0 0 1px #10B981; }

  .theme-red .select-trigger:focus, .theme-red .select-trigger.focused, .theme-red .select-trigger.open { border-color: #EF4444; box-shadow: 0 0 0 1px #EF4444; }
  .theme-red .option:hover:not(.disabled):not(.create-option), .theme-red .option.highlighted { background: #FEE2E2; }
  .theme-red .option.selected:not(.create-option) { background: #FEF2F2; }
  .theme-red .tag { background: #FEF2F2; color: #DC2626; border-color: #FECACA; }
  .theme-red .check-icon, .theme-red .option.create-option { color: #EF4444; }
  .theme-red .spinner { border-top-color: #EF4444; }
  .theme-red .search-input:focus { border-color: #EF4444; box-shadow: 0 0 0 1px #EF4444; }

  .theme-orange .select-trigger:focus, .theme-orange .select-trigger.focused, .theme-orange .select-trigger.open { border-color: #F97316; box-shadow: 0 0 0 1px #F97316; }
  .theme-orange .option:hover:not(.disabled):not(.create-option), .theme-orange .option.highlighted { background: #FFEDD5; }
  .theme-orange .option.selected:not(.create-option) { background: #FFF7ED; }
  .theme-orange .tag { background: #FFF7ED; color: #EA580C; border-color: #FED7AA; }
  .theme-orange .check-icon, .theme-orange .option.create-option { color: #F97316; }
  .theme-orange .spinner { border-top-color: #F97316; }
  .theme-orange .search-input:focus { border-color: #F97316; box-shadow: 0 0 0 1px #F97316; }

  .theme-pink .select-trigger:focus, .theme-pink .select-trigger.focused, .theme-pink .select-trigger.open { border-color: #EC4899; box-shadow: 0 0 0 1px #EC4899; }
  .theme-pink .option:hover:not(.disabled):not(.create-option), .theme-pink .option.highlighted { background: #FCE7F3; }
  .theme-pink .option.selected:not(.create-option) { background: #FDF2F8; }
  .theme-pink .tag { background: #FDF2F8; color: #DB2777; border-color: #FBCFE8; }
  .theme-pink .check-icon, .theme-pink .option.create-option { color: #EC4899; }
  .theme-pink .spinner { border-top-color: #EC4899; }
  .theme-pink .search-input:focus { border-color: #EC4899; box-shadow: 0 0 0 1px #EC4899; }

  .theme-dark .select-trigger:focus, .theme-dark .select-trigger.focused, .theme-dark .select-trigger.open { border-color: #1F2937; box-shadow: 0 0 0 1px #1F2937; }
  .theme-dark .option:hover:not(.disabled):not(.create-option), .theme-dark .option.highlighted { background: #E5E7EB; }
  .theme-dark .option.selected:not(.create-option) { background: #F3F4F6; }
  .theme-dark .tag { background: #F3F4F6; color: #111827; border-color: #D1D5DB; }
  .theme-dark .check-icon, .theme-dark .option.create-option { color: #1F2937; }
  .theme-dark .spinner { border-top-color: #1F2937; }
  .theme-dark .search-input:focus { border-color: #1F2937; box-shadow: 0 0 0 1px #1F2937; }

  /* ========== v3.2.0 NEW FEATURES STYLES ========== */

  /* Avatar Support */
  .option-avatar,
  .tag-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: #F3F4F6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tag-avatar {
    width: 20px;
    height: 20px;
  }

  .option-avatar-img,
  .tag-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Group Selection Checkbox */
  .option-group-label.selectable {
    cursor: pointer;
    user-select: none;
  }

  .option-group-label.selectable:hover {
    background: #F9FAFB;
  }

  .group-checkbox-wrapper {
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
  }

  .group-checkbox-wrapper input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #2684FF;
  }

  /* Floating Label Mode */
  .select-container.floating-label-mode {
    position: relative;
    padding-top: 8px;
  }

  .floating-label {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    padding: 0 4px;
    color: #6B7280;
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 14px;
    z-index: 1;
  }

  .floating-label.floated {
    top: 0;
    transform: translateY(-50%);
    font-size: 12px;
    color: #2684FF;
    font-weight: 500;
  }

  .select-container.floating-label-mode .select-trigger {
    padding-top: 10px;
  }

  .select-container.floating-label-mode .placeholder {
    opacity: 0;
  }

  .select-container.floating-label-mode .floating-label.floated + .select-trigger .placeholder {
    opacity: 1;
  }
</style>
