"use client"

import { useRef, useState, useEffect, useCallback } from "react"

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
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsInView(true)
        if (once && observerRef.current) {
          observerRef.current.disconnect()
        }
      } else if (!once) {
        setIsInView(false)
      }
    },
    [once],
  )

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observerRef.current.observe(currentRef)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, handleIntersection])

  return { ref, isInView }
}
