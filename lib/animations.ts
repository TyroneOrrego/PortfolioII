"use client"

import type { Variants } from "framer-motion"

// Check if the user prefers reduced motion
export const shouldReduceMotion =
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

// Fade in animation (subtle)
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// Fade up animation
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Staggered children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.1,
      delayChildren: 0.1,
    },
  },
}

// Scale animation for cards and interactive elements
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: shouldReduceMotion ? 0 : -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: shouldReduceMotion ? 0 : 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Animation for the navbar
export const navAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

// Animation for the mobile menu - updated for full-screen
export const mobileMenuAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
}

// Animation for the mobile menu backdrop
export const backdropAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}
