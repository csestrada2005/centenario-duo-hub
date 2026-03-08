

## Problem

When switching between logos in the mobile carousel, `LogoDoor` has a heavy entrance animation: it drops from `y: -400` with a `rotateY: 360` spin over 1.2 seconds, plus a 0.3s fade. Even with `delay={0}`, the full animation takes ~1.5s before the logo is fully visible. This runs every time the carousel switches because `AnimatePresence mode="wait"` unmounts/remounts the `LogoDoor` component.

## Solution

Create a lightweight version of `LogoDoor` specifically for the mobile carousel that skips the dramatic drop-in animation and shows the logo immediately with a quick, subtle transition.

### Changes to `src/pages/Index.tsx`:

1. **In `MobileLogoCarousel`**, replace `<LogoDoor>` with a simpler inline element:
   - Keep the `<Link>` wrapper with the same `to` prop
   - Render the logo `<img>` directly (same styling: white filter, drop-shadow, size)
   - The `AnimatePresence` slide transition (`opacity + x`) already provides the visual feedback — no need for the heavy drop/spin animation on top

2. **Keep `LogoDoor` unchanged** for desktop (it only plays once on page load there, which is fine)

Specifically, inside the `AnimatePresence` block, replace:
```jsx
<LogoDoor to={door.to} logo={door.logo} delay={0} />
```
with a simple `<Link>` + `<img>` that renders instantly within the existing motion.div fade/slide transition. The carousel transition itself (0.3s slide) provides sufficient visual polish.

This reduces perceived load time from ~1.5s to ~0.3s per carousel switch.

