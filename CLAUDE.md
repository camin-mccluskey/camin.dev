# CLAUDE.md - Personal Site Development Guidelines

## Build Commands
- `bun run dev`: Run development server (with content preparation)
- `bun run build`: Build the production version
- `bun run start`: Start the production server
- `bun run lint`: Run ESLint
- `bun run prepare-content`: Prepare content from external sources

## Code Style Guidelines

### Imports & Structure
- Group imports: React/Next.js first, third-party libraries, then local components
- Use named exports with destructuring for components: `export function Component()`
- Mark client components with `"use client"` directive when needed
- Use path aliases (`@/`) for local imports

### TypeScript & Types
- Use TypeScript for all new code with strict type checking
- Define inline types for simple props, extract complex types to separate definitions
- Use optional chaining and nullish coalescing for null safety

### Naming & Formatting
- PascalCase for component names (Hero, PostCard)
- camelCase for variables, functions, and files
- Component files named after the component they export
- Use descriptive, semantic naming for all variables and functions

### Styling & Components
- Use Tailwind utility classes for styling (className)
- Prefer composition over inheritance for component reuse
- Maintain clean JSX with proper indentation
- Use Next.js App Router conventions