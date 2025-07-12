"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation presets
export const animationPresets = {
  fadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
  },
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
  },
  slideInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  },
  slideInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
  },
}

// Smooth scroll utility function
export const smoothScrollTo = (target: string | Element, offset = 80) => {
  const element = typeof target === "string" ? document.getElementById(target.replace("#", "")) : target

  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
}

// Safe scroll animation hook
export function useScrollAnimation(
  options: {
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
    once?: boolean
  } = {},
) {
  const elementRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween>()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const { trigger = element, start = "top 80%", end = "bottom 20%", scrub = false, once = true } = options

    // Set initial state - ensure content is visible by default
    gsap.set(element, { opacity: 1, y: 0 })

    // Create scroll-triggered animation
    animationRef.current = gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          once,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      },
    )

    return () => {
      animationRef.current?.kill()
    }
  }, [options])

  return elementRef
}

// Stagger animation hook
export function useStaggerAnimation(selector: string, stagger = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (elements.length === 0) return

    // Ensure elements are visible by default
    gsap.set(elements, { opacity: 1, y: 0 })

    // Create stagger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    })

    tl.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger,
      },
    )

    return () => {
      tl.kill()
    }
  }, [selector, stagger])

  return containerRef
}

// Hover animation hook
export function useHoverAnimation(
  hoverAnimation = { scale: 1.05, duration: 0.3 },
  leaveAnimation = { scale: 1, duration: 0.3 },
) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      gsap.to(element, hoverAnimation)
    }

    const handleMouseLeave = () => {
      gsap.to(element, leaveAnimation)
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hoverAnimation, leaveAnimation])

  return elementRef
}

// Parallax effect hook
export function useParallax(speed = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speed])

  return elementRef
}

// Magnetic cursor effect hook
export function useMagnetic(strength = 0.3) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return elementRef
}

// Page transition animations
export const pageTransitions = {
  fadeIn: () => {
    gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })
  },
  slideUp: () => {
    gsap.fromTo("main", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
  },
}

// Utility functions
export const gsapUtils = {
  killAll: () => {
    gsap.killTweensOf("*")
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  },
  refresh: () => {
    ScrollTrigger.refresh()
  },
  setReducedMotion: (reduced: boolean) => {
    if (reduced) {
      gsap.globalTimeline.timeScale(0.01)
      ScrollTrigger.config({ ignoreMobileResize: true })
    } else {
      gsap.globalTimeline.timeScale(1)
    }
  },
}
