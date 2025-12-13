<script>
  import Select from './lib/Select.svelte'

  // Single select example
  let singleValue = null;
  let options = [
    {id:'sl', label:'Sri Lanka', value:'sl'},
    {id:'pak', label:'Pakistan', value:'pak'},
    {id:'ind', label:'India', value:'ind'},
    {id:'usa', label:'United States', value:'usa'},
    {id:'uk', label:'United Kingdom', value:'uk'},
    {id:'can', label:'Canada', value:'can'},
    {id:'aus', label:'Australia', value:'aus'}
  ];

  // Multi-select example
  let multiValue = [];

  // Options with descriptions
  let richOptions = [
    {id:'react', label:'React', value:'react', description:'A JavaScript library for building user interfaces'},
    {id:'vue', label:'Vue.js', value:'vue', description:'The Progressive JavaScript Framework'},
    {id:'svelte', label:'Svelte', value:'svelte', description:'Cybernetically enhanced web apps'},
    {id:'angular', label:'Angular', value:'angular', description:'Platform for building mobile and desktop apps'}
  ];
  let richValue = null;

  // Disabled options example
  let mixedOptions = [
    {id:'opt1', label:'Available Option 1', value:'opt1'},
    {id:'opt2', label:'Disabled Option', value:'opt2', disabled: true},
    {id:'opt3', label:'Available Option 2', value:'opt3'},
    {id:'opt4', label:'Another Disabled', value:'opt4', disabled: true}
  ];
  let mixedValue = null;

  // Loading state example
  let loadingValue = null;
  let isLoading = false;

  function simulateLoading() {
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
    }, 2000);
  }

  // Async loading example
  let asyncValue = null;
  async function loadCountries(inputValue) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const countries = [
      {id:'us', label:'United States', value:'us'},
      {id:'ca', label:'Canada', value:'ca'},
      {id:'mx', label:'Mexico', value:'mx'},
      {id:'br', label:'Brazil', value:'br'},
      {id:'ar', label:'Argentina', value:'ar'},
      {id:'gb', label:'United Kingdom', value:'gb'},
      {id:'fr', label:'France', value:'fr'},
      {id:'de', label:'Germany', value:'de'},
      {id:'it', label:'Italy', value:'it'},
      {id:'es', label:'Spain', value:'es'}
    ];

    if (!inputValue) return countries;

    return countries.filter(c =>
      c.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  // Creatable example
  let creatableValue = null;
  let creatableOptions = [
    {id:'red', label:'Red', value:'red'},
    {id:'blue', label:'Blue', value:'blue'},
    {id:'green', label:'Green', value:'green'}
  ];

  function handleCreateOption(event) {
    console.log('Created new option:', event.detail.option);
    creatableOptions = [...creatableOptions, event.detail.option];
  }

  function handleChange(event) {
    console.log('Selection changed:', event.detail);
  }

  // Theme examples
  let themeValue = null;

  // Container size examples
  let containerSizeValue = null;

  // Custom styles example
  let customStyleValue = null;

  // Advanced Features - Select All
  let selectAllValue = [];

  // Advanced Features - Grouped Options
  let groupedValue = null;
  let programmingLanguages = [
    {id:'js', label:'JavaScript', value:'js', group:'Frontend', description:'Dynamic web programming language'},
    {id:'ts', label:'TypeScript', value:'ts', group:'Frontend', description:'Typed superset of JavaScript'},
    {id:'py', label:'Python', value:'py', group:'Backend', description:'Versatile general-purpose language'},
    {id:'java', label:'Java', value:'java', group:'Backend', description:'Enterprise object-oriented language'},
    {id:'go', label:'Go', value:'go', group:'Backend', description:'Fast compiled language by Google'},
    {id:'rust', label:'Rust', value:'rust', group:'System', description:'Memory-safe system language'},
    {id:'cpp', label:'C++', value:'cpp', group:'System', description:'High-performance system language'},
  ];

  // Advanced Features - Options with Icons
  let iconsValue = null;
  let socialOptions = [
    {
      id:'twitter',
      label:'Twitter',
      value:'twitter',
      description:'Follow us on Twitter',
      icon: '<svg width="20" height="20" fill="#1DA1F2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>'
    },
    {
      id:'github',
      label:'GitHub',
      value:'github',
      description:'Star us on GitHub',
      icon: '<svg width="20" height="20" fill="#333" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
    },
    {
      id:'linkedin',
      label:'LinkedIn',
      value:'linkedin',
      description:'Connect on LinkedIn',
      icon: '<svg width="20" height="20" fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
    },
  ];

  // Advanced Features - Options with Badges
  let badgesValue = [];
  let teamMembers = [
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
      description:'Frontend Developer',
      badge:'Pro',
      badgeColor:'#3B82F6'
    },
    {
      id:'carol',
      label:'Carol Williams',
      value:'carol',
      description:'Backend Developer',
      badge:'Pro',
      badgeColor:'#3B82F6'
    },
    {
      id:'dave',
      label:'Dave Brown',
      value:'dave',
      description:'Designer',
      badge:'Free',
      badgeColor:'#9CA3AF'
    },
  ];

  // Advanced Features - Combined (Icons + Badges + Groups + Select All)
  let advancedValue = [];
  let advancedOptions = [
    {
      id:'premium1',
      label:'Premium Feature A',
      value:'premium1',
      group:'Premium',
      description:'Advanced analytics dashboard',
      icon: '<svg width="20" height="20" fill="#F59E0B" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      badge:'Pro',
      badgeColor:'#F59E0B'
    },
    {
      id:'premium2',
      label:'Premium Feature B',
      value:'premium2',
      group:'Premium',
      description:'Priority support access',
      icon: '<svg width="20" height="20" fill="#F59E0B" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      badge:'Pro',
      badgeColor:'#F59E0B'
    },
    {
      id:'standard1',
      label:'Standard Feature A',
      value:'standard1',
      group:'Standard',
      description:'Basic reporting tools',
      icon: '<svg width="20" height="20" fill="#6B7280" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>',
      badge:'Standard',
      badgeColor:'#6B7280'
    },
    {
      id:'standard2',
      label:'Standard Feature B',
      value:'standard2',
      group:'Standard',
      description:'Email notifications',
      icon: '<svg width="20" height="20" fill="#6B7280" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>',
      badge:'Standard',
      badgeColor:'#6B7280'
    },
  ];
</script>

<main>
  <h1>Svelte Perfect Select</h1>
  <p class="subtitle">A modern, feature-rich select component for Svelte - React-Select compatible</p>

  <div class="examples">
    <!-- Basic Single Select -->
    <div class="example-section">
      <h2>Basic Single Select</h2>
      <Select
        {options}
        bind:value={singleValue}
        selectSize="medium"
        placeholder="Choose a country..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {singleValue || 'none'}</p>
    </div>

    <!-- Multi-Select -->
    <div class="example-section">
      <h2>Multi-Select with Tags</h2>
      <Select
        {options}
        bind:value={multiValue}
        isMulti={true}
        selectSize="medium"
        placeholder="Select multiple countries..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {multiValue.length > 0 ? multiValue.join(', ') : 'none'}</p>
    </div>

    <!-- Options with Descriptions -->
    <div class="example-section">
      <h2>Options with Descriptions</h2>
      <Select
        options={richOptions}
        bind:value={richValue}
        selectSize="medium"
        placeholder="Pick your favorite framework..."
      />
      <p class="selected-value">Selected: {richValue || 'none'}</p>
    </div>

    <!-- Async Loading -->
    <div class="example-section">
      <h2>Async Loading</h2>
      <p class="example-description">Load options dynamically with search filtering</p>
      <Select
        bind:value={asyncValue}
        loadOptions={loadCountries}
        defaultOptions={true}
        selectSize="medium"
        placeholder="Search countries..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {asyncValue || 'none'}</p>
    </div>

    <!-- Creatable -->
    <div class="example-section">
      <h2>Creatable Select</h2>
      <p class="example-description">Create new options on the fly</p>
      <Select
        options={creatableOptions}
        bind:value={creatableValue}
        isCreatable={true}
        selectSize="medium"
        placeholder="Select or create a color..."
        on:change={handleChange}
        on:createOption={handleCreateOption}
      />
      <p class="selected-value">Selected: {creatableValue || 'none'}</p>
    </div>

    <!-- Non-Searchable -->
    <div class="example-section">
      <h2>Without Search</h2>
      <Select
        {options}
        isSearchable={false}
        selectSize="medium"
        placeholder="Select without search..."
      />
    </div>

    <!-- Disabled Options -->
    <div class="example-section">
      <h2>Disabled Options</h2>
      <Select
        options={mixedOptions}
        bind:value={mixedValue}
        selectSize="medium"
        placeholder="Some options are disabled..."
      />
    </div>

    <!-- Loading State -->
    <div class="example-section">
      <h2>Loading State</h2>
      <Select
        {options}
        bind:value={loadingValue}
        isLoading={isLoading}
        selectSize="medium"
        placeholder="Select with loading state..."
      />
      <button on:click={simulateLoading}>Simulate Loading</button>
    </div>

    <!-- Disabled Select -->
    <div class="example-section">
      <h2>Disabled Select</h2>
      <Select
        {options}
        isDisabled={true}
        selectSize="medium"
        placeholder="This select is disabled..."
      />
    </div>

    <!-- Font Size Variants -->
    <div class="example-section">
      <h2>Font Size Variants</h2>
      <p class="example-description">Control text size with selectSize prop</p>
      <div class="size-examples">
        <div>
          <label>Smaller (11px)</label>
          <Select {options} selectSize="smaller" placeholder="Smaller font size..." />
        </div>
        <div>
          <label>Small (13px)</label>
          <Select {options} selectSize="small" placeholder="Small font size..." />
        </div>
        <div>
          <label>Medium (14px) - Default</label>
          <Select {options} selectSize="medium" placeholder="Medium font size..." />
        </div>
        <div>
          <label>Large (16px)</label>
          <Select {options} selectSize="large" placeholder="Large font size..." />
        </div>
        <div>
          <label>Larger (18px)</label>
          <Select {options} selectSize="larger" placeholder="Larger font size..." />
        </div>
      </div>
    </div>

    <!-- Container Size Variants -->
    <div class="example-section">
      <h2>Container Size Variants</h2>
      <p class="example-description">Control physical dimensions with containerSize prop</p>
      <div class="size-examples">
        <div>
          <label>Extra Small (xs)</label>
          <Select {options} containerSize="xs" bind:value={containerSizeValue} placeholder="Extra small container..." />
        </div>
        <div>
          <label>Small (sm)</label>
          <Select {options} containerSize="sm" bind:value={containerSizeValue} placeholder="Small container..." />
        </div>
        <div>
          <label>Medium (md) - Default</label>
          <Select {options} containerSize="md" bind:value={containerSizeValue} placeholder="Medium container..." />
        </div>
        <div>
          <label>Large (lg)</label>
          <Select {options} containerSize="lg" bind:value={containerSizeValue} placeholder="Large container..." />
        </div>
        <div>
          <label>Extra Large (xl)</label>
          <Select {options} containerSize="xl" bind:value={containerSizeValue} placeholder="Extra large container..." />
        </div>
      </div>
      <p class="selected-value">Selected: {containerSizeValue || 'none'}</p>
    </div>

    <!-- Color Themes -->
    <div class="example-section">
      <h2>Color Themes</h2>
      <p class="example-description">7 beautiful color themes to match your design</p>
      <div class="theme-grid">
        <div>
          <label>Blue (Default)</label>
          <Select {options} theme="blue" bind:value={themeValue} placeholder="Blue theme..." />
        </div>
        <div>
          <label>Purple</label>
          <Select {options} theme="purple" bind:value={themeValue} placeholder="Purple theme..." />
        </div>
        <div>
          <label>Green</label>
          <Select {options} theme="green" bind:value={themeValue} placeholder="Green theme..." />
        </div>
        <div>
          <label>Red</label>
          <Select {options} theme="red" bind:value={themeValue} placeholder="Red theme..." />
        </div>
        <div>
          <label>Orange</label>
          <Select {options} theme="orange" bind:value={themeValue} placeholder="Orange theme..." />
        </div>
        <div>
          <label>Pink</label>
          <Select {options} theme="pink" bind:value={themeValue} placeholder="Pink theme..." />
        </div>
        <div>
          <label>Dark</label>
          <Select {options} theme="dark" bind:value={themeValue} placeholder="Dark theme..." />
        </div>
      </div>
      <p class="selected-value">Selected: {themeValue || 'none'}</p>
    </div>

    <!-- Multi-select with Different Themes -->
    <div class="example-section">
      <h2>Multi-Select Themes</h2>
      <p class="example-description">Color themes work beautifully with multi-select tags</p>
      <div class="theme-grid">
        <div>
          <label>Purple Multi-Select</label>
          <Select {options} theme="purple" isMulti={true} placeholder="Purple multi-select..." />
        </div>
        <div>
          <label>Green Multi-Select</label>
          <Select {options} theme="green" isMulti={true} placeholder="Green multi-select..." />
        </div>
        <div>
          <label>Orange Multi-Select</label>
          <Select {options} theme="orange" isMulti={true} placeholder="Orange multi-select..." />
        </div>
      </div>
    </div>

    <!-- Custom Styles -->
    <div class="example-section">
      <h2>Custom Styles</h2>
      <p class="example-description">Inject custom styles for complete control</p>
      <Select
        {options}
        bind:value={customStyleValue}
        customStyles={{
          container: 'border: 2px dashed #9333EA; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
          control: 'background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);'
        }}
        placeholder="Custom styled select..."
      />
      <p class="selected-value">Selected: {customStyleValue || 'none'}</p>
    </div>

    <!-- Combined Example -->
    <div class="example-section">
      <h2>Combined: Large + Green Theme + Custom Border</h2>
      <p class="example-description">Combine multiple styling options</p>
      <Select
        {options}
        theme="green"
        selectSize="large"
        containerSize="lg"
        borderRadius="12px"
        isMulti={true}
        placeholder="All features combined..."
      />
    </div>

    <!-- ADVANCED FEATURES -->
    <div class="advanced-header">
      <h1 style="font-size: 2rem; margin-top: 2rem; margin-bottom: 0.5rem;">🚀 Advanced Features</h1>
      <p class="subtitle" style="margin-bottom: 2rem;">Powerful capabilities for complex use cases</p>
    </div>

    <!-- Select All / Deselect All -->
    <div class="example-section highlight">
      <h2>✨ Select All / Deselect All</h2>
      <p class="example-description">Quickly select or deselect all options with one click</p>
      <Select
        {options}
        bind:value={selectAllValue}
        isMulti={true}
        showSelectAll={true}
        selectAllText="Select All Countries"
        deselectAllText="Clear All"
        theme="purple"
        placeholder="Try selecting all..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {selectAllValue.length > 0 ? selectAllValue.join(', ') : 'none'} ({selectAllValue.length} total)</p>
    </div>

    <!-- Option Grouping -->
    <div class="example-section highlight">
      <h2>📁 Option Grouping</h2>
      <p class="example-description">Organize options into logical groups for better navigation</p>
      <Select
        options={programmingLanguages}
        bind:value={groupedValue}
        isGrouped={true}
        groupBy={(opt) => opt.group}
        theme="blue"
        placeholder="Choose a programming language..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {groupedValue || 'none'}</p>
    </div>

    <!-- Options with Icons -->
    <div class="example-section highlight">
      <h2>🎨 Options with Icons</h2>
      <p class="example-description">Add visual flair with icons or avatars in each option</p>
      <Select
        options={socialOptions}
        bind:value={iconsValue}
        showOptionIcons={true}
        theme="blue"
        containerSize="lg"
        placeholder="Choose a social platform..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {iconsValue || 'none'}</p>
    </div>

    <!-- Options with Badges -->
    <div class="example-section highlight">
      <h2>🏷️ Options with Badges</h2>
      <p class="example-description">Display status, role, or category badges on options</p>
      <Select
        options={teamMembers}
        bind:value={badgesValue}
        showOptionBadges={true}
        isMulti={true}
        showSelectAll={true}
        theme="green"
        containerSize="lg"
        placeholder="Select team members..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected: {badgesValue.length > 0 ? badgesValue.join(', ') : 'none'} ({badgesValue.length} members)</p>
    </div>

    <!-- Combined Advanced Features -->
    <div class="example-section highlight featured">
      <h2>🎯 All Advanced Features Combined</h2>
      <p class="example-description">Groups + Icons + Badges + Select All + Multi-Select = Maximum Power!</p>
      <Select
        options={advancedOptions}
        bind:value={advancedValue}
        isMulti={true}
        isGrouped={true}
        groupBy={(opt) => opt.group}
        showOptionIcons={true}
        showOptionBadges={true}
        showSelectAll={true}
        selectAllText="Enable All Features"
        deselectAllText="Disable All Features"
        theme="orange"
        containerSize="lg"
        selectSize="large"
        placeholder="The ultimate select component..."
        on:change={handleChange}
      />
      <p class="selected-value">Selected Features: {advancedValue.length > 0 ? advancedValue.join(', ') : 'none'} ({advancedValue.length}/{advancedOptions.length})</p>
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: #f5f7fa;
    min-height: 100vh;
  }

  h1 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    text-align: center;
    color: #718096;
    margin-bottom: 3rem;
    font-size: 1.1rem;
  }

  .examples {
    display: grid;
    gap: 2rem;
  }

  .example-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  .example-section.highlight {
    border-left: 4px solid #2684FF;
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  }

  .example-section.highlight:hover {
    box-shadow: 0 4px 16px rgba(38, 132, 255, 0.15);
    transform: translateY(-2px);
  }

  .example-section.featured {
    border-left: 4px solid #F59E0B;
    background: linear-gradient(135deg, #ffffff 0%, #fffaf0 100%);
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.2);
  }

  .example-section.featured:hover {
    box-shadow: 0 8px 30px rgba(245, 158, 11, 0.3);
    transform: translateY(-4px);
  }

  .advanced-header {
    text-align: center;
    margin-top: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    color: white;
  }

  .example-section h2 {
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .example-description {
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    margin-top: -0.25rem;
  }

  .selected-value {
    margin-top: 0.75rem;
    padding: 0.5rem;
    background: #f7fafc;
    border-radius: 6px;
    color: #4a5568;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
  }

  button {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background: #2684FF;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
    font-weight: 500;
  }

  button:hover {
    background: #0052CC;
  }

  .size-examples {
    display: grid;
    gap: 1rem;
  }

  .size-examples label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .theme-grid label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
    font-size: 0.9rem;
  }
</style>
