"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollPosition {
  scrollX: number
  scrollY: number
}

export function useThrottledScroll(delay = 100) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ scrollX: 0, scrollY: 0 })
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null)
  const previousPosition = useRef<ScrollPosition>({ scrollX: 0, scrollY: 0 })

  const getScrollPosition = useCallback(
    (): ScrollPosition => ({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }),
    [],
  )

  const handleScroll = useCallback(() => {
    if (throttleTimeout.current === null) {
      throttleTimeout.current = setTimeout(() => {
        const currentPosition = getScrollPosition()
        if (
          previousPosition.current.scrollX !== currentPosition.scrollX ||
          previousPosition.current.scrollY !== currentPosition.scrollY
        ) {
          previousPosition.current = currentPosition
          setScrollPosition(currentPosition)
        }
        throttleTimeout.current = null
      }, delay)
    }
  }, [getScrollPosition, delay])

  useEffect(() => {
    // Set initial position
    setScrollPosition(getScrollPosition())

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current)
      }
    }
  }, [getScrollPosition, handleScroll])

  return scrollPosition
}
