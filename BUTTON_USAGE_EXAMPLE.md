# ButtonBooking Component Usage

The `ButtonBooking.vue` component provides a single size prop with responsive behavior and theme awareness.

## Props
- `size`: Button size across all breakpoints (default: 'md')
  - Options: `'sm' | 'md' | 'lg'`

## Size Configurations

Each size automatically adapts across breakpoints with appropriate text sizing:

### Small (`size="sm"`)
- **Mobile**: 100px × 32px, text-xs, px-3 py-2
- **Tablet**: 120px × 36px, text-sm, px-4 py-2  
- **Desktop**: 140px × 40px, text-sm, px-5 py-2.5

### Medium (`size="md"`) - Default
- **Mobile**: 120px × 40px, text-sm, px-4 py-2.5
- **Tablet**: 160px × 44px, text-base, px-6 py-3
- **Desktop**: 209px × 56px, text-base, px-8 py-4

### Large (`size="lg"`)
- **Mobile**: 140px × 44px, text-sm, px-5 py-3
- **Tablet**: 200px × 52px, text-base, px-8 py-4
- **Desktop**: 240px × 64px, text-lg, px-10 py-5

## Theme Awareness
- Uses CSS custom properties for theming
- `background-color: var(--color-primary-500)`
- `color: var(--theme-bg)`
- Automatically adapts to light/dark themes

## Usage Examples

```vue
<!-- Default medium size -->
<ButtonBooking />

<!-- Small size -->
<ButtonBooking size="sm" />

<!-- Large size -->
<ButtonBooking size="lg" />
```

## Features
- ✅ Single prop controls all breakpoints
- ✅ Text size scales appropriately  
- ✅ Theme-aware styling
- ✅ Responsive design (mobile-first)
- ✅ Hover and active states
- ✅ Maintains Button.astro styling consistency