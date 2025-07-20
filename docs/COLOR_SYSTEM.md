# Color Theme System Documentation

## Overview

This project uses a centralized color management system built with SCSS and CSS custom properties (CSS variables). This approach provides:

- **Single source of truth** for all colors
- **Automatic theme switching** (dark/light mode)
- **Easy maintenance** and updates
- **Consistent styling** across components
- **Reusable mixins** for common patterns

## File Structure

```
src/
├── _colors.scss          # Color definitions and mixins
├── App.scss             # Main styles using the color system
└── App.tsx              # Imports App.scss
```

## Color Variables

### CSS Custom Properties (Available in all components)

```scss
// Dark theme (default)
--color-primary: #780c0c; // Main brand color
--color-primary-hover: #a0a1ab; // Hover states
--color-border-default: rgba(255, 255, 255, 0.2); // Default borders
--color-border-dark: rgba(0, 0, 0, 0.1); // Shadow colors
--color-accent: #a0a1ab; // Accent elements

// Background colors with transparency
--color-primary-bg-light: rgba(120, 12, 12, 0.05); // Subtle tinting
--color-primary-bg-medium: rgba(120, 12, 12, 0.2); // Medium tinting
--color-primary-bg-strong: rgba(120, 12, 12, 0.3); // Strong tinting

// Light theme (auto-switches via media query)
--color-primary: #bcbdde; // Light theme primary
// ... (values automatically switch in light mode)
```

## Using the Color System

### Method 1: CSS Custom Properties (Recommended)

```scss
.my-component {
  border: 1px solid var(--color-border-default);
  background-color: var(--color-primary-bg-light);

  &:hover {
    border-color: var(--color-primary);
  }
}
```

### Method 2: SCSS Mixins (For common patterns)

```scss
.interactive-element {
  @include interactive-element; // Applies hover, selected, disabled states
}

.my-link {
  @include link-styles; // Applies consistent link styling
}
```

## Available Mixins

### `@include interactive-element`

Provides complete interactive behavior for clickable elements:

- Default border and styling
- Hover effects (border color, transform, shadow)
- Selected state (background, enhanced shadow)
- Disabled state (opacity, cursor)

### `@include link-styles`

Provides consistent link styling:

- Primary color for normal state
- Hover color and underline for hover state
- Smooth transitions

## Theme Switching

The system automatically switches themes based on user's system preference:

```scss
@media (prefers-color-scheme: light) {
  :root {
    --color-primary: #bcbdde; // Overrides dark theme value
    // ... other overrides
  }
}
```

## Adding New Colors

1. **Add to CSS custom properties** in `_colors.scss`:

```scss
:root {
  --color-new-feature: #your-color;
}

@media (prefers-color-scheme: light) {
  :root {
    --color-new-feature: #your-light-color;
  }
}
```

2. **Use in components**:

```scss
.new-component {
  color: var(--color-new-feature);
}
```

## Benefits

- ✅ **Maintainable**: Change colors in one place
- ✅ **Consistent**: All components use the same color palette
- ✅ **Accessible**: Proper contrast ratios maintained per theme
- ✅ **Flexible**: Easy to add new themes or modify existing ones
- ✅ **Performance**: CSS variables are fast and efficient
- ✅ **Developer Experience**: SCSS mixins reduce code duplication

## Migration from Hardcoded Colors

Before:

```scss
.button {
  border: 1px solid #780c0c;

  &:hover {
    border-color: #a0a1ab;
  }
}

@media (prefers-color-scheme: light) {
  .button {
    border-color: #bcbdde;

    &:hover {
      border-color: #a0a1ab;
    }
  }
}
```

After:

```scss
.button {
  @include interactive-element;
}
```

This reduces 15+ lines of CSS to 1 line while maintaining the same functionality!
