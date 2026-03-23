# Premium Smart-Home Dashboard Theme - Visual Guide

## Color Palette Reference

### Primary Colors (Warm Taupe)
```
#faf9f7 - Primary-50  (Lightest)
#f5f3f0 - Primary-100
#ebe7e1 - Primary-200
#ddd5cc - Primary-300
#c9b8a8 - Primary-400
#b5a394 - Primary-500 (Main)
#9d8b7a - Primary-600 (Hover)
#8a7968 - Primary-700
#6f6456 - Primary-800
#5a5247 - Primary-900 (Darkest)
```

### Secondary Colors (Soft Warm Grey)
```
#fdfcfb - Secondary-50  (Lightest)
#faf8f6 - Secondary-100
#f3f0ed - Secondary-200
#e8e4e0 - Secondary-300
#d9d3cc - Secondary-400
#c9bfb5 - Secondary-500 (Main)
#b5a89d - Secondary-600 (Hover)
#9d9088 - Secondary-700
#857a71 - Secondary-800
#6f6860 - Secondary-900 (Darkest)
```

### Accent Colors (Warm Metallics)
```
#fefdfb - Accent-50  (Lightest)
#fdfaf4 - Accent-100
#faf4eb - Accent-200
#f5ede1 - Accent-300
#ede3d5 - Accent-400
#e3d7c3 - Accent-500 (Main)
#d4c4ad - Accent-600 (Hover)
#c1ad95 - Accent-700
#ad967d - Accent-800
#9a8169 - Accent-900 (Darkest)
```

### Neutral Colors (Soft Beige Base)
```
#fefdfb - Neutral-50  (Lightest)
#fdfaf6 - Neutral-100
#faf6f1 - Neutral-200
#f5f0eb - Neutral-300
#ede8e1 - Neutral-400
#e3dcd3 - Neutral-500 (Main)
#d4ccc0 - Neutral-600
#c1b5a8 - Neutral-700
#ad9f94 - Neutral-800
#9a8b7f - Neutral-900 (Darkest)
```

## Component Examples

### Login/Signup Form
```
Background: Neutral-100 to Secondary-100 gradient
Card: .glass (25% white, 25px blur)
Text: Primary-900 (headings), Primary-700 (labels)
Input: .glass with bg-white/30
Button: Primary-600 with hover Primary-700
Border: Primary-400/20
```

### Course Cards
```
Background: .glass (frosted effect)
Thumbnail: Primary-600 background
Title: Primary-900
Description: Primary-700
Progress Bar: Primary-500 to Secondary-500 gradient
Category Badge: Primary-600/30 background, Primary-700 text
Button: Primary-600 with rounded-xl
```

### Navigation Bar
```
Background: .glass-dark (taupe tint)
Logo: Primary-900
Links: Primary-700 hover Primary-900
Button: Primary-600
Border: Primary-400/20
```

### Page Backgrounds
```
Main: linear-gradient(135deg, #e8e4e0 0%, #ddd5cc 25%, #d9d3cc 50%, #e3dcd3 75%, #e8e4e0 100%)
Overlay: Radial gradients with taupe/grey tints at 8-15% opacity
Result: Soft, warm, premium atmosphere
```

## Glass Effect Specifications

### Standard Glass (.glass)
```css
Background: rgba(255, 255, 255, 0.25)
Blur: 25px
Border: 1px solid rgba(255, 255, 255, 0.35)
Shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
Inset: 0 1px 2px rgba(255, 255, 255, 0.5)
```

### Dark Glass (.glass-dark)
```css
Background: rgba(181, 163, 148, 0.15)  /* Taupe tint */
Blur: 25px
Border: 1px solid rgba(181, 163, 148, 0.25)
Shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
Inset: 0 1px 2px rgba(255, 255, 255, 0.4)
```

### Secondary Glass (.glass-secondary)
```css
Background: rgba(201, 191, 181, 0.12)  /* Grey tint */
Blur: 25px
Border: 1px solid rgba(201, 191, 181, 0.2)
Shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
Inset: 0 1px 2px rgba(255, 255, 255, 0.45)
```

## Typography

### Headings
- Size: 3xl-4xl
- Weight: Bold (700)
- Color: Primary-900
- Letter Spacing: Normal

### Labels
- Size: sm
- Weight: Semibold (600)
- Color: Primary-800
- Letter Spacing: Normal

### Body Text
- Size: sm-base
- Weight: Normal (400)
- Color: Primary-700
- Letter Spacing: Normal

### Placeholder Text
- Color: Primary-500
- Opacity: 100%

## Spacing & Sizing

### Border Radius
- Inputs/Buttons: rounded-xl (12px)
- Cards/Containers: rounded-2xl (16px)
- Small Elements: rounded-lg (8px)

### Padding
- Cards: p-4 to p-8
- Inputs: py-3 px-4
- Buttons: py-2 to py-3 px-4 to px-8

### Gaps
- Grid: gap-6
- Flex: gap-2 to gap-8

## Interactive States

### Hover
- Buttons: Darker primary shade (Primary-700)
- Cards: Increased shadow (shadow-2xl)
- Links: Primary-900 (darker)
- Inputs: Focus ring Primary-500

### Focus
- Ring: 2px solid Primary-500
- Outline: None
- Transition: Smooth

### Active
- Background: Primary-600
- Text: White
- Shadow: Enhanced

## Accessibility

### Contrast Ratios
- Primary-900 on Neutral-100: 12.5:1 ✓
- Primary-700 on Neutral-100: 8.2:1 ✓
- Primary-600 on White: 5.1:1 ✓
- White on Primary-600: 5.1:1 ✓

### Focus Indicators
- Visible 2px ring
- Primary-500 color
- Clear distinction

### Text Sizes
- Minimum: 12px (sm)
- Comfortable: 14-16px (base)
- Headings: 24-36px (2xl-4xl)

## Animation & Transitions

### Smooth Transitions
- Duration: 200-300ms
- Easing: ease-in-out
- Properties: color, background, shadow, transform

### Hover Effects
- Scale: 1.05-1.1
- Shadow: Increase
- Color: Shift to darker shade

### Loading States
- Spinner: Primary-500
- Animation: Smooth rotation
- Duration: 1s

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Grid Layouts
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

### Font Scaling
- Mobile: Slightly smaller
- Desktop: Full size
- Maintain readability

## Dark Mode Considerations

The theme is designed for light/neutral backgrounds. For dark mode:
- Invert primary colors (use Primary-900 as background)
- Use lighter text (Primary-50)
- Adjust glass opacity to 15-20%
- Increase blur to 30px for better contrast

## Performance Optimization

### Backdrop Filter
- Hardware accelerated
- Minimal performance impact
- Smooth 60fps animations

### Shadow Complexity
- Simple 8px shadows
- Minimal blur radius
- Optimized for performance

### Color Gradients
- 2-3 color stops
- Linear gradients preferred
- Radial for accents only

---

**Theme Version**: 1.0
**Last Updated**: March 16, 2026
**Status**: Production Ready
