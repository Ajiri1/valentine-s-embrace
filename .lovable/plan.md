# 💖 Premium Valentine's Day Interactive Webpage

## Overview

A luxurious, romantic single-page interactive experience with elegant animations, playful button interactions, and a celebratory reveal — all designed to feel classy and premium.

---

## Design System

- **Color palette**: Soft blush pink, deep rose, warm cream, and gold accents
- **Typography**: Playfair Display (headings) + Inter (body) via Google Fonts
- **Style**: Glassmorphism card, generous whitespace, soft glows, luxury feel

## Page Structure

### Background Layer

- Warm cream/blush gradient background
- Floating blurred heart particles drifting slowly across the screen
- Subtle parallax-like depth effect

### Main Card (Centered, Glassmorphic)

1. **Animated heart icon** at the top with a gentle floating/pulsing animation
2. **Headline**: "Will you be my Valentine?" in elegant serif font
3. **Subtext**: "This is a very important question… choose wisely."
4. **Two buttons**: "Yes 💖" (rose/gold) and "No 😅" (muted)

### Footer

- Small "Made with ❤️ by Jirid" text

---

## Interactions & Animations

### Card Entrance

- Fade in + subtle scale-up on page load

### "No" Button Behavior

- On hover/click, the button dodges away to a random nearby position
- Shrinks slightly each time it's interacted with
- Creates a playful but classy chase effect

### "Yes" Button Behavior

- Gradually grows slightly larger each time "No" is attempted
- Subtle glow intensifies over time

### After "Yes" is Clicked

- Smooth full-screen transition (fade to rose/cream)
- Confetti burst animation (canvas-based or CSS)
- Floating animated hearts rising across the screen
- Celebratory message: "You just made me the happiest person alive ❤️"
- Soft romantic background music begins (only after this user interaction)

### General

- All animations use smooth ease-in-out curves
- Hover glow effects on buttons
- Fully mobile responsive