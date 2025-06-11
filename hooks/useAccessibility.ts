"use client"

import { useEffect, useRef } from "react"

interface UseAccessibilityOptions {
  trapFocus?: boolean
  autoFocus?: boolean
  returnFocus?: boolean
  focusFirst?: boolean
}

export function useAccessibility(isOpen: boolean, options: UseAccessibilityOptions = {}) {
  const { trapFocus = true, autoFocus = true, returnFocus = true, focusFirst = true } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Store the previously focused element when opening
  useEffect(() => {
    if (isOpen && returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement
    }
  }, [isOpen, returnFocus])

  // Return focus to the previously focused element when closing
  useEffect(() => {
    if (!isOpen && returnFocus && previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [isOpen, returnFocus])

  // Auto-focus the first focusable element when opening
  useEffect(() => {
    if (isOpen && autoFocus && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length > 0 && focusFirst) {
        focusableElements[0].focus()
      }
    }
  }, [isOpen, autoFocus, focusFirst])

  // Trap focus within the container when open
  useEffect(() => {
    if (!isOpen || !trapFocus || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, trapFocus])

  return { containerRef }
}
