"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

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
  const [activeSection, setActiveSection] = useState("hero")
  const [isTopOfPage, setIsTopOfPage] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsTopOfPage(scrollY < 50)

          // Simplified section detection
          const sections = [
            "hero",
            "about",
            "skills",
            "experience",
            "projects",
            "writing-examples",
            "testimonials",
            "contact",
          ]

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveSection(section)
                break
              }
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Optimized body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        width: 100%;
        overflow: hidden;
      `
    } else {
      const scrollY = document.body.style.top
      document.body.style.cssText = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.cssText = ""
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
