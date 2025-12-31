# Svelte Perfect Select - Demo Website

Interactive demo and documentation website for the Svelte Perfect Select component.

## Features

- 🏠 **Landing Page** - Overview with live demo and features
- 🎮 **Interactive Playground** - Live component editor with 19 customizable props and 18 quick examples
- 📚 **Documentation** - Complete API reference with props and events

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run check
```

## Tech Stack

- **SvelteKit** - Framework with file-based routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Structure

```
demo/
├── src/
│   ├── routes/              # Pages (Home, Playground, Gallery, Docs)
│   ├── lib/
│   │   ├── components/      # Reusable components
│   │   ├── data/            # Component metadata & examples
│   │   ├── stores/          # Svelte stores (theme, sidebar)
│   │   ├── utils/           # Utilities (code generation, clipboard)
│   │   └── types.ts         # TypeScript types
│   └── app.css              # Global styles
├── static/                  # Static assets
└── svelte.config.js         # SvelteKit configuration
```

## Pages

- `/` - Landing page with features and quick start
- `/playground` - Interactive component playground with 18 quick examples
- `/docs` - API documentation

## Deployment

The demo is configured with `@sveltejs/adapter-static` for static site generation, suitable for deployment to:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- Any static hosting service

```bash
npm run build
# Output in build/ directory
```
