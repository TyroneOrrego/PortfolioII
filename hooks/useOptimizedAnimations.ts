"use client"

import { useMemo } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"
import { usePrefersReducedMotion, createOptimizedAnimations } from "@/lib/animation-utils"

export function useOptimizedAnimations() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = usePrefersReducedMotion()

  const animations = useMemo(() => {
    return createOptimizedAnimations(isMobile, prefersReducedMotion)
  }, [isMobile, prefersReducedMotion])

  return {
    ...animations,
    prefersReducedMotion,
    isMobile,
  }
}
