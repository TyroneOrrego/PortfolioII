"use client"

import { useEffect, useState } from "react"
import type { Variants } from "framer-motion"

// Check if the user prefers reduced motion
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

// Create optimized animation variants based on device and preferences
export function createOptimizedAnimations(isMobile: boolean, prefersReducedMotion: boolean) {
  // Base durations
  const baseDuration = prefersReducedMotion ? 0.2 : isMobile ? 0.4 : 0.6
  const baseDelay = prefersReducedMotion ? 0 : isMobile ? 0.05 : 0.1

  // Simplified animations for reduced motion or mobile
  const simplifiedFadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: baseDuration,
        ease: "easeOut",
      },
    },
  }

  // Regular animations for desktop
  const fadeIn: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: baseDuration,
        ease: "easeOut",
      },
    },
  }

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: baseDuration,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : baseDelay,
        delayChildren: baseDelay,
      },
    },
  }

  const slideInLeft: Variants =
    prefersReducedMotion || isMobile
      ? simplifiedFadeIn
      : {
          hidden: {
            opacity: 0,
            x: -30,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: baseDuration,
              ease: "easeOut",
            },
          },
        }

  const slideInRight: Variants =
    prefersReducedMotion || isMobile
      ? simplifiedFadeIn
      : {
          hidden: {
            opacity: 0,
            x: 30,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: baseDuration,
              ease: "easeOut",
            },
          },
        }

  return {
    fadeIn,
    fadeUp,
    staggerContainer,
    slideInLeft,
    slideInRight,
    simplifiedFadeIn,
  }
}
