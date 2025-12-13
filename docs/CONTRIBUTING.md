# Contributing to Svelte Perfect Select

Thank you for considering contributing to svelte-perfect-select! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- **Report Bugs**: Open an issue with details about the bug
- **Suggest Features**: Share your ideas for new features
- **Submit Pull Requests**: Fix bugs or implement features
- **Improve Documentation**: Help make the docs better
- **Share the Project**: Star the repo and share with others

## 🐛 Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - Svelte version: [e.g. 4.2.20]
 - svelte-perfect-select version: [e.g. 2.1.0]
 - Browser: [e.g. Chrome 120]
 - OS: [e.g. macOS]

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear description** of the feature
- **Use case** - why is this useful?
- **Examples** - how would it work?
- **Alternatives** - what alternatives have you considered?

## 🔧 Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git
- Code editor (VS Code recommended)

### Getting Started

1. **Fork the repository**
   ```bash
   # Click 'Fork' on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/svelte-perfect-select.git
   cd svelte-perfect-select
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 to see the demo app

4. **Make your changes**
   - Edit `src/lib/Select.svelte` for component changes
   - Edit `src/App.svelte` to add examples
   - Update TypeScript definitions in `src/lib/Select.svelte.d.ts`

5. **Test your changes**
   - Test in the demo app
   - Verify TypeScript types work correctly
   - Test in different browsers
   - Check mobile responsiveness

## 📝 Code Guidelines

### Component Code (`src/lib/Select.svelte`)

- **Maintain backward compatibility** - avoid breaking changes
- **Follow existing patterns** - stay consistent with current code style
- **Add props with defaults** - all new props should have sensible defaults
- **Document your code** - add comments for complex logic
- **Keep it performant** - avoid unnecessary re-renders

### TypeScript Definitions

- Update `src/lib/Select.svelte.d.ts` for any new props or types
- Add JSDoc comments for all new properties
- Include default values in comments
- Test that autocomplete works in VS Code

### Demo App (`src/App.svelte`)

- Add examples for new features
- Follow existing example structure
- Include descriptions
- Show the feature working

## 🎨 Style Guidelines

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JavaScript, double for HTML attributes
- **Semicolons**: Not required in Svelte
- **Naming**: camelCase for variables/functions, PascalCase for components

### Component Styling

- Use scoped styles in `<style>` block
- Follow existing CSS patterns
- Support all themes
- Test RTL mode if adding directional styles

## 🧪 Testing

Currently, the project uses manual testing via the demo app. When adding features:

1. **Create examples** in `src/App.svelte`
2. **Test all themes** (blue, purple, green, red, orange, pink, dark)
3. **Test all size variants** (font sizes and container sizes)
4. **Test edge cases**:
   - Empty options array
   - Very long option lists (100+ items)
   - Options with long text
   - Disabled state
   - Loading state
5. **Browser testing**:
   - Chrome/Edge
   - Firefox
   - Safari
   - Mobile browsers

## 📚 Documentation

When adding features:

1. **Update main README.md** with new props in the props table
2. **Add to docs/advanced-features.md** if it's an advanced feature
3. **Update CHANGELOG.md** with changes
4. **Add examples** to the demo app
5. **Update TypeScript definitions** with JSDoc comments

## 🚀 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-awesome-feature
   ```

2. **Make your changes**
   - Write clear, descriptive commit messages
   - Keep commits focused and atomic

3. **Update documentation**
   - Add/update README sections
   - Update CHANGELOG.md
   - Add TypeScript definitions

4. **Test thoroughly**
   - Test in demo app
   - Test in different browsers
   - Verify no TypeScript errors

5. **Push and create PR**
   ```bash
   git push origin feature/my-awesome-feature
   ```
   - Create pull request on GitHub
   - Fill out the PR template
   - Link related issues

### PR Title Format

- `feat: Add select all functionality`
- `fix: Correct keyboard navigation bug`
- `docs: Update advanced features guide`
- `style: Improve dropdown shadows`
- `refactor: Optimize filter function`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots or GIFs

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Works in all major browsers
- [ ] Updated TypeScript definitions
```

## 📦 Release Process (Maintainers Only)

1. Update version in `package.json`
2. Update `CHANGELOG.md` with release date
3. Commit: `git commit -m "Release vX.Y.Z"`
4. Tag: `git tag vX.Y.Z`
5. Publish: `npm publish`
6. Push: `git push origin master --tags`

## 🎯 Development Tips

### Hot Reload

The dev server supports hot module replacement. Changes to:
- `src/lib/Select.svelte` - Component updates immediately
- `src/App.svelte` - Demo app updates immediately
- Styles - Updates without page reload

### Debugging

- Use browser DevTools for debugging
- Check console for errors
- Use Svelte DevTools extension
- Add `console.log` statements during development

### TypeScript IntelliSense

To verify TypeScript definitions:
1. Create a test `.svelte` file
2. Import the component
3. Check that autocomplete shows all props
4. Verify prop descriptions appear

## 🤝 Code of Conduct

### Our Pledge

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

### Expected Behavior

- Use welcoming language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## 💬 Questions?

- **General Questions**: Open a GitHub Discussion
- **Bug Reports**: Open an Issue
- **Feature Requests**: Open an Issue
- **Security Issues**: Email ishansasika@gmail.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to svelte-perfect-select! 🎉
