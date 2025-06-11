# Component Standards

This document outlines the standards for creating and maintaining components in our codebase.

## Component Structure

All components should follow this general structure:

1. **Imports**
   - React and hooks
   - Third-party libraries
   - Internal components and utilities
   - Types and interfaces

2. **Component Interface**
   - Define a clear interface for component props
   - Extend common interfaces where appropriate
   - Document props with JSDoc comments

3. **Component Implementation**
   - State declarations
   - Hook usage
   - Effect declarations
   - Event handlers
   - Return JSX

4. **Export**
   - Default export for page components
   - Named exports for utility components

## Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `section-header.tsx`)
- **Components**: Use PascalCase for component names (e.g., `SectionHeader`)
- **Props**: Use camelCase for prop names (e.g., `isVisible`)
- **Interfaces**: Use PascalCase with a descriptive suffix (e.g., `SectionHeaderProps`)

## Code Style

- Use functional components with hooks
- Prefer destructuring for props
- Use TypeScript for type safety
- Use the `cn` utility for conditional class names
- Follow the DRY principle (Don't Repeat Yourself)

## Performance Considerations

- Memoize expensive calculations with `useMemo`
- Memoize callback functions with `useCallback`
- Use optimized hooks for scroll animations
- Implement proper error boundaries

## Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Provide text alternatives for non-text content
- Test with screen readers
