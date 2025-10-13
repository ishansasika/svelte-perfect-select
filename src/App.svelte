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
