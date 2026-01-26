# KICKS Global Theme Documentation

## Overview

This directory contains the global theme configuration for the KICKS application. **All components MUST use these predefined values.** Do not add arbitrary colors or fonts outside of this theme system.

## File Structure

- **`theme.scss`** - SCSS variables for use in stylesheets
- **`theme.js`** - JavaScript constants for use in React components
- **`mixins.scss`** - Reusable SCSS mixins and utilities
- **`fonts.scss`** - Font-face declarations
- **`global.scss`** - Global styles applied to the entire app

## Usage

### In SCSS Files

```scss
// ALWAYS import mixins.scss (which automatically imports theme.scss)
@import "../../styles/mixins.scss";

.myComponent {
  // Use theme variables
  color: $color-text-primary;
  background-color: $color-white;
  font-family: $font-primary;
  padding: $spacing-lg;
  border-radius: $border-radius-md;

  // Use mixins
  @include flexRow;
  @include mobile {
    padding: $spacing-md;
  }
}
```

### In React/JavaScript Files

```javascript
import { theme, colors } from '../../styles/theme';

const MyComponent = () => {
  return (
    <div
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        padding: theme.spacing.lg,
      }}
    >
      Content
    </div>
  );
};
```

## Color Palette

### DO ✅
```scss
color: $color-primary;           // #4a69e2
background: $color-dark-gray;    // #232321
border: 1px solid $color-border; // #e0e0e0
```

### DON'T ❌
```scss
color: #3498db;                  // Random color not in theme
background: #ff5733;             // Arbitrary color
border: 1px solid #abc123;       // Undefined color
```

## Typography

### Font Families (ONLY USE THESE)

- **`$font-primary`** / `fonts.primary` - 'RubikSemiBold' - For headings and emphasis
- **`$font-primary-regular`** / `fonts.primaryRegular` - 'RubikRegular' - For regular text
- **`$font-secondary`** / `fonts.secondary` - 'SansSemiBold' - For secondary headings
- **`$font-secondary-regular`** / `fonts.secondaryRegular` - 'SansRegular' - For body text

### DO ✅
```scss
.header {
  font-family: $font-primary;
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
}
```

### DON'T ❌
```scss
.header {
  font-family: 'Arial', sans-serif;  // Wrong font
  font-size: 25px;                   // Use predefined sizes
  font-weight: 550;                  // Use predefined weights
}
```

## Spacing

Use the spacing scale for consistent padding, margin, and gaps:

```scss
padding: $spacing-lg;      // 20px
margin-top: $spacing-xl;   // 24px
gap: $spacing-md;          // 12px
```

## Responsive Design

Use the provided mixins for responsive breakpoints:

```scss
.component {
  padding: $spacing-2xl;

  @include mobile {
    padding: $spacing-md;
  }

  @include tablet {
    padding: $spacing-lg;
  }

  @include desktop {
    padding: $spacing-2xl;
  }
}
```

## Common Patterns

### Flex Layouts

```scss
.container {
  @include flexRow;           // display: flex; flex-direction: row;
  @include flexCol;           // display: flex; flex-direction: column;
  @include flexCenter;        // flex + centered
  @include flexBetween;       // flex + space-between
}
```

### Cards

```scss
.card {
  @include card;  // Applies standard card styling with hover effect
}
```

### Buttons

```scss
.primaryButton {
  @include button-primary;    // Black button with white text
}

.secondaryButton {
  @include button-secondary;  // White button with black border
}
```

### Text Ellipsis

```scss
.truncated {
  @include text-ellipsis;  // Single line ellipsis
}

.multiline {
  @include text-multiline-ellipsis(3);  // 3 lines with ellipsis
}
```

## Complete Color Reference

### Primary Colors
- `$color-primary`: #4a69e2
- `$color-primary-dark`: #3d5bc4
- `$color-primary-light`: #6b82e9

### Neutral Colors
- `$color-dark-gray`: #232321
- `$color-medium-gray`: #666666
- `$color-light-gray`: #e0e0e0
- `$color-extra-light-gray`: #f5f5f5
- `$color-background`: #e7e7e3
- `$color-background-light`: #fafafa
- `$color-white`: #ffffff
- `$color-black`: #000000

### Semantic Colors
- `$color-success`: #4caf50
- `$color-error`: #ff4444
- `$color-warning`: #ffa52f
- `$color-info`: #2196f3

## Migration Guide

If you find hardcoded colors in existing components:

1. Identify the color value (e.g., `#232321`)
2. Find the matching theme variable (`$color-dark-gray`)
3. Replace the hardcoded value with the variable
4. Import `mixins.scss` if not already imported

## Questions?

If you need a color or font that's not in the theme:
1. **DON'T** add it directly to your component
2. Discuss with the team if it should be added to the global theme
3. Add it to `theme.scss` and `theme.js` if approved
4. Update this documentation

---

**Remember: Consistency is key! Always use the global theme.**
