"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface UseTouchInteractionOptions {
  onTap?: () => void
  onSwipe?: (direction: "left" | "right" | "up" | "down") => void
  threshold?: number
}

export function useTouchInteraction(ref: React.RefObject<HTMLElement>, options: UseTouchInteractionOptions = {}) {
  const { onTap, onSwipe, threshold = 50 } = options
  const [isTouching, setIsTouching] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let startX = 0
    let startY = 0
    let startTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      startTime = Date.now()
      setIsTouching(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Implement if needed
    }

    const handleTouchEnd = (e: TouchEvent) => {
      setIsTouching(false)
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const endTime = Date.now()

      const diffX = endX - startX
      const diffY = endY - startY
      const timeDiff = endTime - startTime

      // Detect tap
      if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10 && timeDiff < 300) {
        onTap?.()
        return
      }

      // Detect swipe
      if (onSwipe) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          // Horizontal swipe
          if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
              onSwipe("right")
            } else {
              onSwipe("left")
            }
          }
        } else {
          // Vertical swipe
          if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
              onSwipe("down")
            } else {
              onSwipe("up")
            }
          }
        }
      }
    }

    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchmove", handleTouchMove, { passive: true })
    element.addEventListener("touchend", handleTouchEnd)

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [ref, onTap, onSwipe, threshold])

  return { isTouching }
}
