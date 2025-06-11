"use client"

import { useRef, useState, useEffect } from "react"
import { useThrottledScroll } from "./useThrottledScroll"

interface UseImprovedScrollAnimationOptions {
  threshold?: number
  once?: boolean
  rootMargin?: string
}

export function useImprovedScrollAnimation({
  threshold = 0.1,
  once = true,
  rootMargin = "0px",
}: UseImprovedScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const { scrollY } = useThrottledScroll()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, once, rootMargin])

  // This is just to trigger a re-render when scrolling
  // The actual visibility detection is done by IntersectionObserver
  useEffect(() => {}, [scrollY])

  return { ref, isInView }
}
