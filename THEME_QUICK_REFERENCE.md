# Premium Smart-Home Theme - Quick Reference Card

## 🎨 Color Palette (Copy-Paste Ready)

### Primary (Warm Taupe)
```
Primary-50:   #faf9f7
Primary-100:  #f5f3f0
Primary-200:  #ebe7e1
Primary-300:  #ddd5cc
Primary-400:  #c9b8a8
Primary-500:  #b5a394  ← Main
Primary-600:  #9d8b7a  ← Hover
Primary-700:  #8a7968
Primary-800:  #6f6456
Primary-900:  #5a5247  ← Dark text
```

### Secondary (Soft Grey)
```
Secondary-50:   #fdfcfb
Secondary-100:  #faf8f6
Secondary-200:  #f3f0ed
Secondary-300:  #e8e4e0
Secondary-400:  #d9d3cc
Secondary-500:  #c9bfb5  ← Main
Secondary-600:  #b5a89d  ← Hover
Secondary-700:  #9d9088
Secondary-800:  #857a71
Secondary-900:  #6f6860
```

### Accent (Warm Metallics)
```
Accent-50:   #fefdfb
Accent-100:  #fdfaf4
Accent-200:  #faf4eb
Accent-300:  #f5ede1
Accent-400:  #ede3d5
Accent-500:  #e3d7c3  ← Main
Accent-600:  #d4c4ad  ← Hover
Accent-700:  #c1ad95
Accent-800:  #ad967d
Accent-900:  #9a8169
```

### Neutral (Soft Beige)
```
Neutral-50:   #fefdfb
Neutral-100:  #fdfaf6
Neutral-200:  #faf6f1
Neutral-300:  #f5f0eb
Neutral-400:  #ede8e1
Neutral-500:  #e3dcd3  ← Main
Neutral-600:  #d4ccc0
Neutral-700:  #c1b5a8
Neutral-800:  #ad9f94
Neutral-900:  #9a8b7f
```

## 🎯 Common Patterns

### Page Background
```jsx
<div className="min-h-screen bg-gradient-to-br from-neutral-100 via-secondary-100 to-neutral-200">
```

### Glass Card
```jsx
<div className="glass rounded-2xl p-6">
```

### Glass Header
```jsx
<div className="glass-dark rounded-2xl p-6 border-b border-primary-400/20">
```

### Button
```jsx
<button className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition">
```

### Input
```jsx
<input className="glass rounded-xl px-4 py-3 text-primary-900 placeholder-primary-500 bg-white/40" />
```

### Heading
```jsx
<h1 className="text-4xl font-bold text-primary-900">
```

### Secondary Text
```jsx
<p className="text-primary-700">
```

### Progress Bar
```jsx
<div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" />
```

## 🔧 CSS Classes

### Glass Effects
```css
.glass              /* Standard frosted glass */
.glass-dark         /* Taupe-tinted glass */
.glass-secondary    /* Grey-tinted glass */
.glow-soft          /* Ambient glow effect */
.gradient-overlay   /* Subtle gradient */
```

### Tailwind Utilities
```
rounded-xl          /* 12px - inputs/buttons */
rounded-2xl         /* 16px - cards/containers */
rounded-lg          /* 8px - small elements */

bg-gradient-to-br   /* Diagonal gradient */
from-neutral-100    /* Start color */
via-secondary-100   /* Middle color */
to-neutral-200      /* End color */

text-primary-900    /* Dark text */
text-primary-700    /* Secondary text */
text-primary-600    /* Links/accents */

bg-primary-600      /* Button background */
hover:bg-primary-700 /* Button hover */

border-primary-400/20 /* Subtle borders */
```

## 📐 Spacing Guide

### Padding
```
p-4   → 1rem (16px)
p-6   → 1.5rem (24px)
p-8   → 2rem (32px)

px-4  → 1rem horizontal
py-3  → 0.75rem vertical
```

### Gaps
```
gap-2   → 0.5rem (8px)
gap-4   → 1rem (16px)
gap-6   → 1.5rem (24px)
gap-8   → 2rem (32px)
```

### Margins
```
mb-2   → 0.5rem bottom
mb-4   → 1rem bottom
mb-6   → 1.5rem bottom
mt-2   → 0.5rem top
```

## 🎬 Animation

### Hover Transition
```jsx
className="transition hover:bg-primary-700"
```

### Smooth Transition
```jsx
className="transition-all duration-300"
```

### Scale on Hover
```jsx
className="hover:scale-110 transition"
```

## ✅ Checklist for New Components

- [ ] Use `bg-gradient-to-br from-neutral-100 via-secondary-100 to-neutral-200` for page background
- [ ] Apply `.glass` or `.glass-dark` to containers
- [ ] Use `rounded-2xl` for cards, `rounded-xl` for inputs
- [ ] Text: `text-primary-900` for headings, `text-primary-700` for body
- [ ] Buttons: `bg-primary-600 hover:bg-primary-700`
- [ ] Borders: `border-primary-400/20`
- [ ] Add `transition` for smooth hover effects
- [ ] Test contrast ratio (should be 5:1+)
- [ ] Verify focus states visible
- [ ] Check mobile responsiveness

## 🚀 Quick Copy-Paste Templates

### Login Form
```jsx
<div className="min-h-screen bg-gradient-to-br from-neutral-100 via-secondary-100 to-neutral-200 flex items-center justify-center">
  <div className="glass rounded-3xl p-8 w-full max-w-md">
    <h2 className="text-3xl font-bold text-primary-900 mb-2">Welcome</h2>
    <input className="glass rounded-xl px-4 py-3 w-full text-primary-900 placeholder-primary-500 bg-white/40" />
    <button className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition">Login</button>
  </div>
</div>
```

### Course Card
```jsx
<div className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition">
  <div className="h-40 bg-primary-600"></div>
  <div className="p-4">
    <h3 className="font-bold text-primary-900">Course Title</h3>
    <p className="text-primary-700 text-sm">Description</p>
    <button className="bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition">Enroll</button>
  </div>
</div>
```

### Header
```jsx
<div className="glass-dark py-12 px-4 border-b border-primary-400/20">
  <h1 className="text-4xl font-bold text-primary-900">Page Title</h1>
  <p className="text-primary-700">Subtitle</p>
</div>
```

## 📱 Responsive Breakpoints

```
Mobile:  < 768px   (1 column)
Tablet:  768-1024px (2 columns)
Desktop: > 1024px  (3-4 columns)
```

## 🎓 Design Principles

1. **Warm & Inviting** - Use warm taupe/grey palette
2. **Premium Feel** - Apply glass effects consistently
3. **Minimalistic** - Avoid clutter, use whitespace
4. **Accessible** - Maintain high contrast ratios
5. **Smooth** - Add transitions to all interactions
6. **Consistent** - Follow spacing and sizing rules

## 🔗 Related Files

- `frontend/tailwind.config.js` - Color definitions
- `frontend/src/index.css` - Glass effects
- `PREMIUM_SMART_HOME_THEME_COMPLETE.md` - Full documentation
- `SMART_HOME_THEME_VISUAL_GUIDE.md` - Visual examples
- `THEME_IMPLEMENTATION_CHECKLIST.md` - Implementation guide

---

**Quick Reference Version**: 1.0
**Last Updated**: March 16, 2026
**Status**: Ready to Use
