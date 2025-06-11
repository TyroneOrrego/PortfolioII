"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for responsive media queries
 * @param query CSS media query string (e.g., "(min-width: 768px)")
 * @returns Boolean indicating if the media query matches
 */
export default function useMediaQuery(query: string): boolean {
  // Initialize with a default value to avoid hydration mismatch
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Create the media query list
    const mediaQuery = window.matchMedia(query)

    // Set the initial value
    setMatches(mediaQuery.matches)

    // Define the event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add the event listener
    // Use the modern API if available, fall back to deprecated method
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
}
