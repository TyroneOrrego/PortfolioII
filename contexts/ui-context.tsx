"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface UIContextType {
  activeSection: string
  setActiveSection: (section: string) => void
  isTopOfPage: boolean
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  toggleMenu: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("home")
  const [isTopOfPage, setIsTopOfPage] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  // Enhanced scroll detection with performance optimization
  useEffect(() => {
    let ticking = false
    let lastScrollY = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Update isTopOfPage with hysteresis to prevent flickering
      setIsTopOfPage(currentScrollY < 50)

      // Determine active section based on scroll position with improved logic
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "writing-examples",
        "testimonials",
        "contact",
      ]

      // Find the section that's most visible in the viewport
      let activeSection = "home"
      let maxVisibility = 0

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const viewportHeight = window.innerHeight

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
          const visibility = visibleTop / viewportHeight

          if (visibility > maxVisibility && rect.top < viewportHeight * 0.5) {
            maxVisibility = visibility
            activeSection = section
          }
        }
      }

      setActiveSection(activeSection)
      lastScrollY = currentScrollY
    }

    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better performance
    window.addEventListener("scroll", throttledHandleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [])

  // Enhanced body scroll lock with better mobile support
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.classList.add("mobile-menu-open")
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.classList.remove("mobile-menu-open")
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.classList.remove("mobile-menu-open")
    }
  }, [isMenuOpen])

  return (
    <UIContext.Provider
      value={{
        activeSection,
        setActiveSection,
        isTopOfPage,
        isMenuOpen,
        setIsMenuOpen,
        toggleMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
