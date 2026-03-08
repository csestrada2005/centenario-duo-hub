

## Problem

The `AnimatePresence mode="wait"` unmounts/remounts the logo on each switch, causing the image to re-render and flash. Even though the animation is fast, the image appears to "load" each time.

## Solution

Render **both logos always** in the DOM side by side in a horizontal strip, and use `translateX` to slide between them — no mount/unmount, no re-rendering of images.

### Changes to `MobileLogoCarousel` in `src/pages/Index.tsx`:

1. **Remove `AnimatePresence`** — no more mount/unmount cycle
2. **Render all logos in a flex row** inside an `overflow-hidden` container with fixed width (e.g., `w-64`)
3. **Use `motion.div` with `animate={{ x: -current * 256 }}`** to slide the strip left/right
4. Each logo is always mounted, just translated off-screen when not active
5. Transition: `duration: 0.3, ease: "easeInOut"` for smooth sliding

This means both images are loaded once on mount and never re-created, eliminating any loading delay.

