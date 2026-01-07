# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.1] - 2026-01-07

### 🔧 Maintenance

#### Dependency Updates
- **Main Package**
  - Updated `vite` from 5.4.20 to 5.4.21 (patch update)

- **Demo Application**
  - Updated `@sveltejs/kit` from 2.0.0 to 2.49.3 (significant update with improvements and bug fixes)
  - Updated `@sveltejs/adapter-static` from 3.0.0 to 3.0.10 (patch updates)
  - Updated `vite` from 5.4.20 to 5.4.21 (patch update)
  - Updated `typescript` from 5.7.2 to 5.9.3 (minor update)
  - Updated `svelte-check` from 4.0.0 to 4.3.5 (patch updates)

### 📦 Technical Details

- Maintained full compatibility with Svelte 4.x
- All dependencies updated to latest Svelte 4-compatible versions
- No breaking changes or API modifications
- All builds passing successfully

## [2.2.0] - 2026-01-06

### 🎉 Major New Features

#### Max Selection Limit
- Added `maxSelected` prop to limit the number of selections in multi-select mode
- Added `maxSelectedMessage` function prop to customize the warning message
- Automatically shows a dismissible warning when limit is reached
- Dispatches `maxSelected` event with limit details
- Prevents selection when limit is reached while allowing deselection

#### Tag Overflow Display
- Added `maxTagsDisplay` prop to limit visible tags with overflow indicator
- Added `showTagCount` prop to toggle "+X more" badge display
- Shows "+X more" badge when selected items exceed the display limit
- Improves UI for multi-select with many selections
- Automatically calculates and displays overflow count

#### Validation States
- Added `validationState` prop with 'error', 'success', and 'warning' states
- Added `validationMessage` prop for displaying validation feedback
- Visual styling for each validation state (border colors and message styling)
- Animated validation message with icon indicators
- Perfect for form validation feedback

#### Configurable Checkboxes
- Added `showCheckboxes` prop to toggle checkbox display in multi-select
- Checkboxes now optional instead of always shown
- Better visual feedback for multi-select mode when enabled
- Maintains accessibility with proper ARIA attributes

#### Portal Rendering
- Added `usePortal` prop to render dropdown in a portal
- Added `portalTarget` prop for custom portal target element
- Solves z-index and overflow issues in complex layouts
- Dropdown can escape container boundaries when needed

#### Infinite Scroll
- Added `loadMoreOptions` function prop for pagination
- Added `hasMore` prop to indicate more options availability
- Added `loadingMore` state prop for loading indicator
- Automatically loads more options when scrolling near bottom
- Loading indicator appears while fetching additional options
- Perfect for large async datasets with pagination

### ✨ Enhanced Developer Experience

- Updated TypeScript definitions for all new features
- Added comprehensive examples in README for each new feature
- New event: `maxSelected` dispatched when selection limit reached
- All new props properly typed and documented

### 📚 Documentation

- Added v2.2.0 features section to README
- Added detailed examples for all 6 new features
- Updated props tables with new v2.2.0 properties
- Added TypeScript event interface for `maxSelected`

### 🎨 Visual Enhancements

- New warning-styled badge for tag overflow indicator
- Color-coded validation messages with icons
- Smooth animations for validation messages and warnings
- Improved loading indicator for infinite scroll

## [2.1.1] - 2025-12-31

### 🐛 Bug Fixes

- Fixed TypeScript error in groupBy reduce function - extracted grouping logic into separate function to resolve callable type inference issue
- Fixed checkbox not updating properly in multi-select mode

## [2.1.0] - 2024-12-13

### 🎉 Major New Features

#### Select All / Deselect All
- Added `showSelectAll` prop to enable Select All button in multi-select mode
- Added `selectAllText` and `deselectAllText` props for customization
- Shows count of selected items (e.g., "5/10")
- New change actions: `'select-all'` and `'deselect-all'`

#### Option Grouping
- Fully implemented option grouping with `isGrouped` prop
- Added `groupBy` function prop to define grouping logic
- Sticky group headers while scrolling
- Visual hierarchy with styled group labels
- Works seamlessly with all other features

#### Icons in Options
- Added `showOptionIcons` prop to enable icon support
- Options can now have `icon` property (SVG string or image URL)
- 32x32px icon containers with rounded corners
- Automatic image scaling and centering
- Icons appear before option labels

#### Badges in Options
- Added `showOptionBadges` prop to enable badge display
- Options can have `badge` and `badgeColor` properties
- Pill-shaped badges positioned at option end
- Perfect for showing status, roles, or categories
- Custom colors per badge

### ✨ Enhanced Styling

- **Modern Dropdown Design**
  - Enhanced box-shadow with multi-layer depth
  - Backdrop blur effect (12px) with 180% saturation
  - Improved border-radius (12px) for modern look
  - Semi-transparent background (rgba(255, 255, 255, 0.98))

- **Improved Trigger**
  - Thicker border (1.5px) for better definition
  - Enhanced focus state with 3px glow ring
  - Smooth transitions on all states
  - Better hover feedback

- **Better Tags**
  - Increased padding (4px 8px) for touch targets
  - Added subtle box-shadow
  - Improved font-weight (500) for readability
  - Larger border-radius (6px)

- **Option Improvements**
  - Increased min-height (40px) for better touch targets
  - Enhanced spacing and gap (10px)
  - Better option content structure with flex layout
  - Improved typography with better line-heights

### 🎨 Visual Enhancements

- Enhanced animations with optimized delays
- Better staggered entrance animations for options
- Improved color contrast for better accessibility
- Modern color palette for all UI elements

### 📱 Better UX

- Added `emptyStateText` prop for customizing no-options message
- Added `emptySearchText` prop for no-results message
- Separate empty states for no options vs no search results
- Better disabled state styling
- Improved RTL support

### 🚀 Performance

- Optimized filtering with cached lowercase search terms
- Added null-safety checks in filter function
- Better initial state handling
- Reduced unnecessary re-renders

### 📚 Documentation

- Created comprehensive `ADVANCED_FEATURES.md` guide
- Updated demo app with all new features showcased
- Added TypeScript definitions for all new props and interfaces
- Enhanced inline code documentation

### 🐛 Bug Fixes

- Fixed type safety in groupBy function
- Improved option content layout structure
- Better handling of edge cases in empty states

### 💪 Developer Experience

- Full TypeScript support for all new features
- Updated type definitions with proper generics
- Better prop descriptions in IntelliSense
- Comprehensive examples in demo app

## [2.0.1] - 2024-12-13

### Added
- TypeScript definitions for better developer experience
- LICENSE file (MIT)
- CHANGELOG.md for tracking changes
- .npmignore file for better npm package management
- Proper package.json exports field for modern module resolution

### Fixed
- `containerSize` default value changed from "medium" to "md" to match valid size options

### Changed
- Updated package.json with proper types, module, and exports fields

## [2.0.0] - 2024-12-13

### Added
- React-Select API compatibility
- Modern UI with enhanced animations
- 7 beautiful color themes (blue, purple, green, red, orange, pink, dark)
- 5 font size variants (smaller, small, medium, large, larger)
- 5 container size variants (xs, sm, md, lg, xl)
- Async loading with caching support
- Creatable options functionality
- Multi-select mode with animated tag chips
- Search/filter functionality
- Keyboard navigation support
- Accessibility features (ARIA labels, screen reader support)
- RTL language support
- Custom styles support
- Menu positioning options
- Form compatibility

### Changed
- Upgraded to v2 with complete rewrite
- Enhanced animations and transitions
- Improved accessibility

## [1.x] - Previous Versions

Earlier versions of svelte-perfect-select. See git history for details.
