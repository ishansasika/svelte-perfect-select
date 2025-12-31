# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

svelte-perfect-select is a modern, feature-rich select component for Svelte with react-select API compatibility. The project is structured as:
- **Library**: Single-file Svelte component (`src/lib/Select.svelte`) distributed via npm
- **Demo App**: SvelteKit application in `demo/` directory showcasing all features

## Development Commands

### Main Library
```bash
# Run development server for quick testing (uses src/App.svelte)
npm run dev

# Build library (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

### Demo Application
```bash
cd demo/

# Run demo dev server (port 3000)
npm run dev

# Build static demo site
npm run build

# Preview demo build
npm run preview

# Type-check demo code
npm run check
npm run check:watch
```

## Architecture

### Component Structure

The entire library is a **single, self-contained Svelte component** at `src/lib/Select.svelte`:
- ~2000+ lines of code in one file
- No external dependencies (pure Svelte)
- All features, themes, and animations are self-contained
- Uses scoped CSS within the component

**Key sections within Select.svelte:**
1. **Props** (lines 1-100): All configurable options including react-select compatible props, theming, async loading, and advanced features
2. **Theme System** (lines 78-88): Color theme definitions for 7 themes (blue, purple, green, red, orange, pink, dark)
3. **State Management**: Reactive state for dropdown, search, async loading, and option caching
4. **Event System**: Custom dispatchers for change, focus, blur, menuOpen/Close, etc.
5. **Filtering & Search Logic**: Built-in and custom filter support
6. **Async Loading**: loadOptions support with caching mechanism
7. **Creatable Mode**: Dynamic option creation
8. **Advanced Features**: Select All, option grouping, icons, badges
9. **Keyboard Navigation**: Full arrow key, Enter, Escape, Tab, Backspace support
10. **Animations**: Uses svelte/transition (scale, fly, fade) for smooth UX
11. **Scoped Styles**: All CSS is component-scoped with dynamic theme color injection

### Entry Points

- `index.js`: Simple re-export of Select.svelte for npm distribution
- `src/App.svelte`: Demo/test component for local development
- `demo/src/`: SvelteKit app with comprehensive examples and documentation pages

### Publishing Strategy

The npm package includes only essential files (defined in package.json `files` field):
- `src/lib/` - The component source
- `index.js` - Entry point
- `README.md` - Documentation
- `LICENSE` - MIT license

Everything else (demo, docs, build configs) is excluded via `.npmignore`.

## Component API Philosophy

The component maintains **react-select API compatibility** while adding Svelte-specific enhancements:
- Supports both naming conventions: `isMulti`/`multiple`, `isSearchable`/`searchable`, etc.
- Event dispatchers use Svelte's `createEventDispatcher` pattern
- Two-way binding with `bind:value`
- All react-select core features: async, creatable, multi-select, search, etc.

## Theme System

Themes are hardcoded objects (lines 78-86) with 5 color values each:
- `primary`: Main accent color
- `secondary`: Hover/focus backgrounds
- `tag`: Multi-select tag background
- `tagText`: Tag text color
- `tagBorder`: Tag border color

Custom styling is supported via `customStyles` prop which injects CSS strings into specific component parts.

## Advanced Features (v2.1.0+)

Located in same component, controlled by feature flags:
- **Select All**: `showSelectAll` prop for multi-select
- **Option Grouping**: `isGrouped` and `groupBy` props
- **Icons/Badges**: `showOptionIcons` and `showOptionBadges` with option object schema extensions
- **Size Variants**: `selectSize` (font), `containerSize` (physical dimensions), `borderRadius`

## Testing & Demo Development

When working on features:
1. Test with main dev server (`npm run dev` in root) for quick iterations
2. Build comprehensive examples in `demo/src/routes/` for user documentation
3. Demo uses SvelteKit's static adapter (`@sveltejs/adapter-static`)
4. Demo includes Tailwind CSS for layout/styling (library itself has no Tailwind dependency)

## Important Constraints

- **No Breaking Changes**: Maintain react-select API compatibility
- **Zero Dependencies**: Keep the library dependency-free (only peer dependency: svelte ^4.0.0)
- **Single File Component**: All functionality stays in Select.svelte unless there's a compelling reason to split
- **Accessibility**: Maintain ARIA labels, keyboard navigation, and screen reader support
- **TypeScript**: Update `Select.svelte.d.ts` when adding/changing props

## Build Output

- Main library builds to `dist/` (not committed to git)
- Demo builds to `demo/build/` (static site, not committed to git)
- Build artifacts (*.tgz, *.zip) are gitignored
- Demo dependencies and build artifacts are gitignored but demo source is committed
