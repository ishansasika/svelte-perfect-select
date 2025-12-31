<script>
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { scale, fly, fade } from 'svelte/transition';

  // Props - React-Select compatible + Enhanced
  export let options = [];
  export let value = undefined;
  export let placeholder = "Select...";
  export let isMulti = false;
  export let multiple = isMulti; // Support both naming conventions
  export let isSearchable = true;
  export let searchable = isSearchable;
  export let isClearable = true;
  export let clearable = isClearable;
  export let isDisabled = false;
  export let disabled = isDisabled;
  export let isLoading = false;
  export let loading = isLoading;
  export let isRtl = false;
  export let closeMenuOnSelect = !multiple;
  export let hideSelectedOptions = false;
  export let isCreatable = false;
  export let allowCreateWhileLoading = false;
  export let createOptionPosition = 'last'; // 'first' or 'last'
  export let formatCreateLabel = (inputValue) => `Create "${inputValue}"`;

  // Async support
  export let loadOptions = null; // Function for async loading
  export let cacheOptions = true;
  export let defaultOptions = false;

  // Styling & Size
  export let selectSize = "medium";
  export let containerSize = "md"; // Container physical size: 'xs', 'sm', 'md', 'lg', 'xl'
  export let theme = "blue"; // Color theme: 'blue', 'purple', 'green', 'red', 'orange', 'pink', 'dark'
  export let borderRadius = "8px"; // Border radius for modern look
  export let customStyles = {}; // Custom style overrides: { container, control, menu, option, tag }
  export let maxHeight = "300px";
  export let menuPlacement = "auto"; // 'auto', 'top', 'bottom'
  export let menuPosition = "absolute"; // 'absolute', 'fixed'

  // Option customization
  export let getOptionLabel = (option) => option.label || option.value;
  export let getOptionValue = (option) => option.id || option.value;
  export let isOptionDisabled = (option) => option.disabled || false;
  export let filterOption = null; // Custom filter function

  // Groups
  export let isGrouped = false;
  export let groupBy = null; // Function to group options: (option) => string

  // Advanced Features
  export let showSelectAll = false; // Show Select All / Deselect All for multi-select
  export let selectAllText = "Select All";
  export let deselectAllText = "Deselect All";
  export let showOptionIcons = false; // Enable icon support in options
  export let showOptionBadges = false; // Enable badge support in options
  export let maxOptionsDisplay = 1000; // Maximum options to render (virtual scrolling threshold)
  export let optionHeight = 40; // Height of each option for virtual scrolling
  export let emptyStateText = "No options available";
  export let emptySearchText = "No results found";

  // Misc
  export let name = "svelte-perfect-select";
  export let id = "svelte-perfect-select";
  export let autoFocus = false;
  export let openMenuOnFocus = false;
  export let openMenuOnClick = true;
  export let tabSelectsValue = true;
  export let backspaceRemovesValue = true;
  export let escapeClearsValue = false;
  export let noOptionsMessage = () => "No options";
  export let loadingMessage = () => "Loading...";

  const dispatch = createEventDispatcher();

  // Theme colors
  const themes = {
    blue: { primary: '#2684FF', secondary: '#DEEBFF', tag: '#E6F2FF', tagText: '#0052CC', tagBorder: '#CCE0FF' },
    purple: { primary: '#9333EA', secondary: '#F3E8FF', tag: '#FAF5FF', tagText: '#7E22CE', tagBorder: '#E9D5FF' },
    green: { primary: '#10B981', secondary: '#D1FAE5', tag: '#ECFDF5', tagText: '#059669', tagBorder: '#A7F3D0' },
    red: { primary: '#EF4444', secondary: '#FEE2E2', tag: '#FEF2F2', tagText: '#DC2626', tagBorder: '#FECACA' },
    orange: { primary: '#F97316', secondary: '#FFEDD5', tag: '#FFF7ED', tagText: '#EA580C', tagBorder: '#FED7AA' },
    pink: { primary: '#EC4899', secondary: '#FCE7F3', tag: '#FDF2F8', tagText: '#DB2777', tagBorder: '#FBCFE8' },
    dark: { primary: '#1F2937', secondary: '#E5E7EB', tag: '#F3F4F6', tagText: '#111827', tagBorder: '#D1D5DB' }
  };

  $: currentTheme = themes[theme] || themes.blue;

  // State
  let isOpen = false;
  let searchTerm = "";
  let highlightedIndex = -1;
  let selectContainer;
  let searchInput;
  let menuRef;
  let internalOptions = options.length > 0 ? [...options] : [];
  let optionsCache = {};
  let isLoadingAsync = false;

  // Computed
  $: {
    if (multiple !== isMulti) multiple = isMulti;
    if (searchable !== isSearchable) searchable = isSearchable;
    if (clearable !== isClearable) clearable = isClearable;
    if (disabled !== isDisabled) disabled = isDisabled;
    if (loading !== isLoading) loading = isLoading;

    // Initialize value if undefined
    if (value === undefined) {
      value = multiple ? [] : null;
    }
  }

  $: filteredOptions = getFilteredOptions(internalOptions, searchTerm);

  $: selectedOptions = multiple
    ? internalOptions.filter(opt => value.includes(getOptionValue(opt)))
    : internalOptions.find(opt => getOptionValue(opt) === value);

  $: displayText = multiple
    ? (value.length > 0 ? `${value.length} selected` : placeholder)
    : (selectedOptions ? getOptionLabel(selectedOptions) : placeholder);

  $: if (options) {
    internalOptions = [...options];
  }

  // Async loading
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
      dispatch('optionsLoaded', { options: internalOptions });
    } catch (error) {
      dispatch('loadError', { error });
    } finally {
      isLoadingAsync = false;
    }
  }

  // Filter options
  function getFilteredOptions(opts, term) {
    if (!searchable || !term) return opts;

    if (filterOption) {
      return opts.filter(opt => filterOption({ label: getOptionLabel(opt), value: getOptionValue(opt), data: opt }, term));
    }

    const lowerTerm = term.toLowerCase();
    return opts.filter(opt => {
      const label = getOptionLabel(opt);
      return label && label.toLowerCase().includes(lowerTerm);
    });
  }

  // Create option
  function createOption(inputValue) {
    const newOption = {
      id: `created-${Date.now()}`,
      value: inputValue,
      label: inputValue,
      __isNew__: true
    };

    dispatch('createOption', { option: newOption });
    selectOption(newOption);
  }

  $: showCreateOption = isCreatable &&
    searchTerm.length > 0 &&
    !filteredOptions.some(opt => getOptionLabel(opt).toLowerCase() === searchTerm.toLowerCase()) &&
    (!isLoadingAsync || allowCreateWhileLoading);

  // Group options if groupBy is provided
  $: groupedOptions = groupBy && isGrouped && typeof groupBy === 'function'
    ? filteredOptions.reduce((groups, option) => {
        const groupKey = groupBy(option);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(option);
        return groups;
      }, {})
    : null;

  $: displayOptions = showCreateOption
    ? createOptionPosition === 'first'
      ? [{ __isCreate__: true, value: searchTerm }, ...filteredOptions]
      : [...filteredOptions, { __isCreate__: true, value: searchTerm }]
    : filteredOptions;

  $: allOptionsSelected = multiple && value.length > 0 &&
    displayOptions.filter(opt => !isOptionDisabled(opt)).every(opt => value.includes(getOptionValue(opt)));

  $: someOptionsSelected = multiple && value.length > 0 && !allOptionsSelected;

  // Functions
  async function toggleDropdown() {
    if (disabled) return;

    if (!isOpen && loadOptions && defaultOptions) {
      await handleLoadOptions('');
    }

    isOpen = !isOpen;

    if (isOpen) {
      if (searchable) {
        await tick();
        searchInput?.focus();
      }
      dispatch('menuOpen');
    } else {
      dispatch('menuClose');
      searchTerm = "";
    }
  }

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
        value = value.filter(v => v !== optionValue);
      } else {
        value = hideSelectedOptions ? [...value, optionValue] : [...value, optionValue];
      }
    } else {
      value = optionValue;
      if (closeMenuOnSelect) {
        isOpen = false;
        searchTerm = "";
      }
    }

    dispatch('change', { value, option, action: 'select-option' });
    dispatch('inputChange', { value: '', action: 'set-value' });
  }

  function removeOption(optionValue, event) {
    event?.stopPropagation();
    value = value.filter(v => v !== optionValue);
    dispatch('change', { value, action: 'remove-value' });
  }

  function clearSelection(event) {
    event?.stopPropagation();
    value = multiple ? [] : null;
    searchTerm = "";
    dispatch('clear');
    dispatch('change', { value, action: 'clear' });
  }

  function selectAll() {
    if (!multiple) return;
    const selectableOptions = displayOptions.filter(opt => !isOptionDisabled(opt) && !opt.__isCreate__);
    value = selectableOptions.map(opt => getOptionValue(opt));
    dispatch('change', { value, action: 'select-all' });
  }

  function deselectAll() {
    if (!multiple) return;
    value = [];
    dispatch('change', { value, action: 'deselect-all' });
  }

  function toggleSelectAll() {
    if (allOptionsSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  }

  async function handleSearch(event) {
    searchTerm = event.target.value;
    dispatch('inputChange', { value: searchTerm, action: 'input-change' });

    if (loadOptions) {
      await handleLoadOptions(searchTerm);
    }
  }

  function handleKeydown(event) {
    if (disabled) return;

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
    }
  }

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

  function handleClickOutside(event) {
    if (selectContainer && !selectContainer.contains(event.target)) {
      if (isOpen) {
        dispatch('blur');
      }
      isOpen = false;
      searchTerm = "";
      highlightedIndex = -1;
    }
  }

  function isSelected(option) {
    return multiple
      ? value.includes(getOptionValue(option))
      : value === getOptionValue(option);
  }

  function handleFocus() {
    if (openMenuOnFocus && !disabled) {
      isOpen = true;
    }
    dispatch('focus');
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);

    if (autoFocus) {
      selectContainer?.focus();
    }

    if (loadOptions && defaultOptions) {
      handleLoadOptions('');
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  $: if (isOpen) {
    highlightedIndex = -1;
  }
</script>

<div
  class="select-container {selectSize} {containerSize} theme-{theme}"
  class:disabled
  class:rtl={isRtl}
  bind:this={selectContainer}
  on:keydown={handleKeydown}
  role="combobox"
  tabindex="0"
  aria-controls="options-list"
  aria-expanded={isOpen}
  on:focus={handleFocus}
  style="{customStyles.container || ''}"
>
  <div
    class="select-trigger"
    class:open={isOpen}
    class:focused={isOpen}
    on:click={() => openMenuOnClick && toggleDropdown()}
    on:keydown={handleKeydown}
    tabindex={disabled ? -1 : 0}
    role="button"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-label={placeholder}
  >
    <div class="select-value">
      {#if multiple && value.length > 0}
        <div class="tags">
          {#each selectedOptions as option (getOptionValue(option))}
            <span class="tag" class:disabled in:scale="{{ duration: 200 }}" out:scale="{{ duration: 150 }}">
              <span class="tag-label">{getOptionLabel(option)}</span>
              {#if !disabled}
                <button
                  class="tag-remove"
                  on:click={(e) => removeOption(getOptionValue(option), e)}
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
          on:click={clearSelection}
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

  {#if isOpen}
    <div
      class="dropdown {menuPlacement}"
      class:fixed={menuPosition === 'fixed'}
      style="max-height: {maxHeight}"
      role="listbox"
      aria-multiselectable={multiple}
      in:fly="{{ y: -10, duration: 200 }}"
      out:fade="{{ duration: 150 }}"
    >
      {#if searchable}
        <div class="search-container">
          <input
            bind:this={searchInput}
            type="text"
            class="search-input"
            placeholder="Search..."
            value={searchTerm}
            on:input={handleSearch}
            on:click|stopPropagation
            aria-label="Search options"
            aria-autocomplete="list"
          />
        </div>
      {/if}

      <div class="options-list" id="options-list" bind:this={menuRef}>
        {#if isLoadingAsync}
          <div class="loading-message">{loadingMessage()}</div>
        {:else if displayOptions.length === 0}
          <div class="no-options">
            {searchTerm ? emptySearchText : emptyStateText}
          </div>
        {:else}
          {#if multiple && showSelectAll && !searchTerm}
            <div class="select-all-container">
              <button
                class="select-all-button"
                on:click={toggleSelectAll}
                type="button"
              >
                <input
                  type="checkbox"
                  checked={allOptionsSelected}
                  indeterminate={someOptionsSelected}
                  tabindex="-1"
                  aria-hidden="true"
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
              <div class="option-group">
                <div class="option-group-label">{groupName}</div>
                {#each groupOptions as option, index (getOptionValue(option))}
                  <div
                    class="option"
                    class:selected={isSelected(option)}
                    class:highlighted={index === highlightedIndex}
                    class:disabled={isOptionDisabled(option)}
                    class:hidden={hideSelectedOptions && isSelected(option)}
                    on:click={() => selectOption(option)}
                    on:keydown={(e) => e.key === 'Enter' && selectOption(option)}
                    on:mouseenter={() => highlightedIndex = index}
                    role="option"
                    tabindex="-1"
                    aria-selected={isSelected(option)}
                    aria-disabled={isOptionDisabled(option)}
                    in:fly="{{ y: -5, duration: 150, delay: index * 15 }}"
                  >
                    {#if multiple}
                      {#key value}
                        <input
                          type="checkbox"
                          checked={isSelected(option)}
                          on:click|preventDefault
                          disabled={isOptionDisabled(option)}
                          tabindex="-1"
                          aria-hidden="true"
                        />
                      {/key}
                    {/if}
                    {#if showOptionIcons && option.icon}
                      <span class="option-icon">
                        {#if typeof option.icon === 'string'}
                          <img src={option.icon} alt="" class="option-icon-img" />
                        {:else}
                          {@html option.icon}
                        {/if}
                      </span>
                    {/if}
                    <div class="option-content">
                      <span class="option-label">{getOptionLabel(option)}</span>
                      {#if option.description}
                        <span class="option-description">{option.description}</span>
                      {/if}
                    </div>
                    {#if showOptionBadges && option.badge}
                      <span class="option-badge" style="background-color: {option.badgeColor || '#E5E7EB'}">
                        {option.badge}
                      </span>
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
              </div>
            {/each}
          {:else}
            {#each displayOptions as option, index (option.__isCreate__ ? `create-${option.value}` : getOptionValue(option))}
              <div
                class="option"
                class:selected={!option.__isCreate__ && isSelected(option)}
                class:highlighted={index === highlightedIndex}
                class:disabled={!option.__isCreate__ && isOptionDisabled(option)}
                class:create-option={option.__isCreate__}
                class:hidden={!option.__isCreate__ && hideSelectedOptions && isSelected(option)}
                on:click={() => selectOption(option)}
                on:keydown={(e) => e.key === 'Enter' && selectOption(option)}
                on:mouseenter={() => highlightedIndex = index}
                role="option"
                tabindex="-1"
                aria-selected={!option.__isCreate__ && isSelected(option)}
                aria-disabled={!option.__isCreate__ && isOptionDisabled(option)}
                in:fly="{{ y: -5, duration: 150, delay: Math.min(index * 15, 300) }}"
              >
                {#if multiple && !option.__isCreate__}
                  {#key value}
                    <input
                      type="checkbox"
                      checked={isSelected(option)}
                      on:click|preventDefault
                      disabled={isOptionDisabled(option)}
                      tabindex="-1"
                      aria-hidden="true"
                    />
                  {/key}
                {/if}
                {#if showOptionIcons && option.icon && !option.__isCreate__}
                  <span class="option-icon">
                    {#if typeof option.icon === 'string'}
                      <img src={option.icon} alt="" class="option-icon-img" />
                    {:else}
                      {@html option.icon}
                    {/if}
                  </span>
                {/if}
                <div class="option-content">
                  <span class="option-label">
                    {#if option.__isCreate__}
                      {formatCreateLabel(option.value)}
                    {:else}
                      {getOptionLabel(option)}
                    {/if}
                  </span>
                  {#if option.description && !option.__isCreate__}
                    <span class="option-description">{option.description}</span>
                  {/if}
                </div>
                {#if showOptionBadges && option.badge && !option.__isCreate__}
                  <span class="option-badge" style="background-color: {option.badgeColor || '#E5E7EB'}">
                    {option.badge}
                  </span>
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
        {/if}
      </div>
    </div>
  {/if}

  <!-- Hidden native select for form compatibility -->
  {#if multiple}
    <select {name} {id} {disabled} multiple style="display: none;">
      {#each value as val}
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
</div>

<style>
  .select-container {
    position: relative;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

  /* Select All Container */
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

  /* Option Content */
  .option-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  /* Option Icons */
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

  /* Option Badges */
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
</style>
