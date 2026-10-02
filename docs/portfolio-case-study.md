# Landing Page Builder: a page you can take with you

## The problem

A simple campaign or studio landing page should not require a framework runtime or an ongoing website-builder subscription. This project explores a narrower alternative: compose a page in the browser, then download a static HTML document that can be hosted independently.

## What the project implements

- A block-based editor with drag handles and button-based adding/reordering.
- Contextual content and appearance controls, plus nondestructive themes.
- Local draft recovery and grouped, bounded undo/redo.
- Responsive preview using the actual export generator.
- Single-file export with inline CSS, SVG icons, uploaded images, and page metadata.
- A mobile-readable showcase and a fictional studio starter page.

## The important decisions

**One document, several views.** The editable document contains blocks, their props, the theme, and metadata. Canvas, preview, and export share the component registry. Output CSS is also shared, eliminating a second styling implementation that could drift.

**Themes are appearance, templates are content.** Block defaults use theme variables. A theme change updates those variables without rebuilding sections or replacing text. Template replacement is explicit and undoable; custom colors remain custom.

**Render the whole export together.** The generator renders one React tree to static markup. This makes generated identifiers unique across repeated testimonial sections. The output has no React hydration requirement; its carousel interactions use native links, radio inputs, and CSS.

**Portability is an explicit contract.** Uploaded raster images become data URLs, and supported icons become inline SVG. Fonts and external embeds remain network resources. The result is a single-file download for online static hosting, not a claim that every possible embed works offline.

**Protect work before adding infrastructure.** A versioned local draft and 40-entry history cover accidental refresh and deletion without introducing accounts or a backend. Storage failures are visible; export remains available.

## Evidence

`npm test` exercises document preservation, malformed-draft rejection, undo/redo branching, image and URL boundaries, duplicate-carousel identifiers, escaping, and embedded assets. Type checking, lint, these checks, and the production build run in CI.

`npm run test:e2e` runs a persistent Chromium check against the production static build. It covers the real start/edit/theme/undo/reload/preview/export journey, uploaded images, internal anchors, color validation, desktop/mobile output, and supported item limits. CI runs it with the GitHub Pages repository prefix; failures retain a trace. Screenshots in the README show the editor and mobile showcase.

## Boundaries

Editing is desktop-oriented. The page itself is responsive and can be inspected on mobile. There is one local draft per browser origin; history is session-only. Forms, commerce, backend processing, and automatic hosting are outside the export contract. Example copy and contact details must be replaced before publishing.
