# ArtMorphix

A modern artboard and vector editor built with React and Vite.

## Project Architecture Decisions

### 1. Component Structure
- **Feature-based organization:** Components are grouped by feature (e.g., `ArtSpace`, `Toolbar`, `PropertiesPanel`) under `/src/components`.
- **Pages:** Main application pages (e.g., `AppPage.jsx`, `LandingPage.jsx`) are placed in `/src/pages`.
- **Separation of Concerns:** UI, logic, and state are separated into their respective components for maintainability.

### 2. Styling
- **Centralized Styles:** Global and layout styles are in `/src/assets/styles.css`.
- **Component Styles:** (Planned) For larger projects, consider using CSS Modules or styled-components for component-scoped styles.

### 3. State Management
- **Local State:** React’s `useState` and `useRef` are used for local component state.
- **Props Drilling:** State and handlers are passed down as props from parent to child components.
- **Forwarded Refs:** Used for imperative actions (e.g., fit-to-view logic in `ArtSpace`).

### 4. Interaction Patterns
- **Zoom:** 
  - Keyboard shortcuts: `Cmd + =`, `Cmd + -`, and `Cmd + 0` for fit-to-view.
  - Mouse: `Cmd + Scroll` zooms in/out.
  - Buttons: Zoom controls and fit-to-view button in the Properties Panel.
- **Pan:** 
  - Mouse drag with spacebar held.
  - Scroll wheel pans when not holding Cmd.
- **Fit to View:** Calculates zoom and centers the artboard in the visible area.

### 5. UI Layout
- **Three-Panel Layout:** 
  - Toolbar (left)
  - ArtSpace (center)
  - Properties Panel (right, with zoom controls at the bottom)
- **Flexbox:** Used for responsive and flexible layout.

### 6. Extensibility
- **Hooks & Utils:** `/src/hooks` and `/src/utils` are reserved for custom hooks and utility functions.
- **Assets:** Images and static files are in `/src/assets`.

### 7. Development Experience
- **Vite:** Fast dev server and build tool.
- **Auto-open Browser:** Vite is configured to open the browser automatically on `npm run dev`.
- **ESLint:** Linting is set up for code quality.

---

## Future Recommendations

- **Component-level styles:** Adopt CSS Modules or styled-components for better style encapsulation.
- **State management:** For larger apps, consider React Context or a state library (e.g., Zustand, Redux).
- **Testing:** Add unit and integration tests for components and hooks.
- **TypeScript:** Consider migrating to TypeScript for type safety.

---

*This architecture is designed for clarity, scalability, and ease of maintenance as ArtMorphix grows.*


