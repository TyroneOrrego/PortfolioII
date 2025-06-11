"use client"

import { useEffect, useState } from "react"

export function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "translateY(-100%)"
      }}
    >
      Skip to main content
    </a>
  )
}
