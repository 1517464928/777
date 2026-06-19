import type { Transition, Variants } from "framer-motion";

// Shared easing for cohesive motion across all screens.
const EASE = [0.25, 0.1, 0.25, 1] as const;

const mk = (duration: number, delay: number): Transition =>
  ({ duration, delay, ease: EASE }) as Transition;

const mkReduced = (): Transition => ({ duration: 0 });

// ─── Vertical screen transitions (up/down scroll) ───
// Each screen type gets a unique entrance that fits the warm, minimal aesthetic.

/** IntroScreen: gentle scale + fade, like a poster materializing. */
export const introVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, scale: 1, transition: mk(0.7, delay) },
});

/** Experience hero page: slide in from left with slight rotation. */
export const expHeroVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, x: -80, rotateY: 8 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, x: 0, rotateY: 0, transition: mk(0.6, delay) },
});

/** Experience detail page: rise from bottom with depth. */
export const expDetailVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.96 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, y: 0, scale: 1, transition: mk(0.55, delay) },
});

/** Advantages screen: staggered fade-up, like cards being dealt. */
export const advantagesVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 50 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, y: 0, transition: mk(0.5, delay) },
});

/** Projects screen: zoom in from depth, like entering a gallery. */
export const projectsVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08, y: 30 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, scale: 1, y: 0, transition: mk(0.6, delay) },
});

// ─── Horizontal page transitions (left/right swipe) ───

/** Hero → Detail: slide left with slight upward drift. */
export const heroToDetailVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 120, y: 20 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, x: 0, y: 0, transition: mk(0.5, delay) },
});

/** Detail → Detail: parallax slide with scale depth. */
export const detailToDetailVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 100, scale: 0.92 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, x: 0, scale: 1, transition: mk(0.5, delay) },
});

/** Detail → Hero: slide right with settle. */
export const detailToHeroVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, x: -120, scale: 0.95 },
  visible: (delay: number = 0) =>
    reduced
      ? { opacity: 1, transition: mkReduced() }
      : { opacity: 1, x: 0, scale: 1, transition: mk(0.5, delay) },
});

// ─── Helper: pick horizontal variant based on direction ───

export function pickHorizontalVariant(
  direction: number,
  pageIndex: number,
  reduced: boolean
): Variants {
  // direction: -1 = going left (next), 1 = going right (prev)
  if (pageIndex === 0) {
    // Hero page
    return direction <= 0 ? heroToDetailVariants(reduced) : detailToHeroVariants(reduced);
  }
  return direction <= 0 ? detailToDetailVariants(reduced) : detailToHeroVariants(reduced);
}
