"use client"

import { useRef, useState, useEffect } from "react"

interface UseScrollAnimationOptions {
  threshold?: number
  once?: boolean
  rootMargin?: string
}

export function useScrollAnimation({
  threshold = 0.1,
  once = true,
  rootMargin = "0px",
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

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

  return { ref, isInView }
}
