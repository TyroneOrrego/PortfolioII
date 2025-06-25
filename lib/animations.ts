"use client"

import { useEffect, useState, useMemo } from "react"
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

// Base animation variants - exported individually
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
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()

    const handleResize = () => checkMobile()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return useMemo(() => {
    // If user prefers reduced motion, return simplified animations
    if (prefersReducedMotion) {
      return {
        fadeIn: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        } as Variants,
        fadeUp: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        } as Variants,
        staggerContainer: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0, delayChildren: 0 },
          },
        } as Variants,
        slideInLeft: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        } as Variants,
        slideInRight: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        } as Variants,
        isMobile,
        prefersReducedMotion,
      }
    }

    // Return standard animations with adjusted timing for mobile
    const duration = isMobile ? 0.4 : 0.6

    return {
      fadeIn: {
        hidden: { opacity: 0, y: isMobile ? 5 : 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration * 0.8, ease: "easeOut" },
        },
      } as Variants,
      fadeUp: {
        hidden: { opacity: 0, y: isMobile ? 15 : 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: "easeOut" },
        },
      } as Variants,
      staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: isMobile ? 0.05 : 0.1,
            delayChildren: isMobile ? 0.05 : 0.1,
          },
        },
      } as Variants,
      slideInLeft: {
        hidden: { opacity: 0, x: isMobile ? -15 : -30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration, ease: "easeOut" },
        },
      } as Variants,
      slideInRight: {
        hidden: { opacity: 0, x: isMobile ? 15 : 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration, ease: "easeOut" },
        },
      } as Variants,
      isMobile,
      prefersReducedMotion,
    }
  }, [prefersReducedMotion, isMobile])
}
