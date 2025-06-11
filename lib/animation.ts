"use client"

import { useEffect, useState, useMemo } from "react"
import type { Variants } from "framer-motion"
import useMediaQuery from "@/hooks/useMediaQuery"

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

// Base animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Hook to get optimized animations based on device and preferences
export function useAnimations() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = usePrefersReducedMotion()

  return useMemo(() => {
    // If user prefers reduced motion, return simplified animations
    if (prefersReducedMotion) {
      return {
        fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } },
        fadeUp: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } },
        staggerContainer: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0, delayChildren: 0 },
          },
        },
        slideInLeft: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } },
        slideInRight: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } },
        isMobile,
        prefersReducedMotion,
      }
    }

    // Return standard animations with adjusted timing for mobile
    const duration = isMobile ? 0.4 : 0.6

    return {
      fadeIn: {
        ...fadeIn,
        visible: {
          ...fadeIn.visible,
          transition: { duration: duration * 0.8, ease: "easeOut" },
        },
      },
      fadeUp: {
        ...fadeUp,
        visible: {
          ...fadeUp.visible,
          transition: { duration, ease: "easeOut" },
        },
      },
      staggerContainer,
      slideInLeft: {
        ...slideInLeft,
        visible: {
          ...slideInLeft.visible,
          transition: { duration, ease: "easeOut" },
        },
      },
      slideInRight: {
        ...slideInRight,
        visible: {
          ...slideInRight.visible,
          transition: { duration, ease: "easeOut" },
        },
      },
      isMobile,
      prefersReducedMotion,
    }
  }, [isMobile, prefersReducedMotion])
}
