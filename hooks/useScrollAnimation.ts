"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollAnimationOptions {
  threshold?: number
  once?: boolean
  rootMargin?: string
  start?: string
  end?: string
}

export function useScrollAnimation({
  threshold = 0.1,
  once = true,
  rootMargin = "0px",
  start = "top 80%",
  end = "bottom 20%",
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial state
    gsap.set(element, { opacity: 0, y: 30 })

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      once,
      onEnter: () => {
        isInView.current = true
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
      },
      onLeave: () => {
        if (!once) {
          isInView.current = false
          gsap.to(element, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "power2.in",
          })
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [once, start, end])

  return { ref, isInView: isInView.current }
}
