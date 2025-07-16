# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a modern React TypeScript application built with:

- **Vite** for build tooling and development server
- **React 18** with TypeScript for type safety
- **TailwindCSS** for styling with custom design system
- **shadcn/ui** for reusable UI components
- **React Router** for client-side routing
- **Zustand** for state management
- **React i18next** for internationalization
- **Vitest** for testing
- **ESLint + Prettier** for code quality

## Architecture Guidelines

### File Structure
- Feature-based organization under `src/features/`
- Shared components in `src/components/`
- UI primitives in `src/components/ui/`
- Layouts in `src/components/layouts/`
- Global stores in `src/stores/`
- Router configuration in `src/router/`

### Naming Conventions
- **Files**: camelCase (e.g., `userListPage.tsx`)
- **Components**: PascalCase (e.g., `UserListPage`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Component Guidelines
- Use function components with TypeScript
- Mark props as `readonly` when appropriate
- Use proper TypeScript imports with `type` keyword for types
- Prefer composition over inheritance
- Keep components focused and single-responsibility
- Use custom hooks for complex logic

### State Management
- Use Zustand for global state
- Feature-specific stores in feature directories
- Local state with useState for component-specific state
- Custom hooks to encapsulate state logic

### Styling
- Use TailwindCSS classes
- Leverage the custom design system defined in `tailwind.config.js`
- Use `cn()` utility for conditional classes
- Follow shadcn/ui patterns for consistent styling

### Code Quality
- Follow ESLint rules strictly
- Use Prettier for consistent formatting
- Write tests for components and utilities
- Handle errors gracefully with proper error boundaries
- Use proper TypeScript types, avoid `any`

## Development Patterns

### Error Handling
- Use ErrorBoundary component for React errors
- Use try-catch in async operations
- Display user-friendly error messages
- Log errors appropriately

### Loading States
- Show loading indicators for async operations
- Use skeleton loaders where appropriate
- Provide feedback for user actions

### Accessibility
- Use semantic HTML elements
- Provide proper ARIA attributes
- Ensure keyboard navigation works
- Use proper heading hierarchy

### Performance
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize bundle size with proper imports
- Use proper dependency arrays in useEffect

## Feature Development

When adding new features:

1. Create feature directory under `src/features/`
2. Include types, services, stores, hooks, and components
3. Add routing configuration
4. Write tests for new functionality
5. Update i18n translations if needed
6. Follow the existing patterns and conventions

## Testing

- Write unit tests for utilities and hooks
- Write component tests for UI components
- Use React Testing Library for component testing
- Mock external dependencies appropriately
- Aim for good coverage of critical paths
