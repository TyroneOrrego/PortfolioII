"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/theme-context"
import { smoothScrollTo } from "@/lib/gsap-animations"

const navigationItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#writing-examples", label: "Writing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, setTheme, isDarkMode } = useTheme()

  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial navbar animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    )

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleSectionChange = () => {
      const sections = navigationItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("scroll", handleSectionChange, { passive: true })
    handleScroll()
    handleSectionChange()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleSectionChange)
    }
  }, [])

  // Mobile menu animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Open animation
      gsap.set([backdropRef.current, mobileMenuRef.current], { display: "block" })

      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

      gsap.fromTo(mobileMenuRef.current, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" })

      // Animate menu items
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.2,
          ease: "power2.out",
        },
      )

      document.body.style.overflow = "hidden"
    } else {
      // Close animation
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(backdropRef.current, { display: "none" })
        },
      })

      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" })
        },
      })

      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    smoothScrollTo(href.substring(1))
    setIsMobileMenuOpen(false)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"] as const
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="font-bold text-xl text-slate-900 dark:text-white">
              <button
                onClick={() => scrollToSection("#hero")}
                className="hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Go to homepage"
              >
                Tyrone Orrego
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative",
                    activeSection === item.href.substring(1)
                      ? "text-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800",
                  )}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-orange-500 rounded-full transform -translate-x-1/2" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} theme`}
              >
                {getThemeIcon()}
              </Button>
              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="text-slate-600 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {getThemeIcon()}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 relative z-50"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <>
        {/* Backdrop */}
        <div
          ref={backdropRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          style={{ display: "none" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 z-40 lg:hidden shadow-2xl border-l border-slate-200 dark:border-slate-700"
          style={{ display: "none" }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-600 dark:text-slate-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-2 px-6">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "mobile-nav-item flex items-center w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 group",
                      activeSection === item.href.substring(1)
                        ? "text-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800",
                    )}
                  >
                    <span className="flex-1">{item.label}</span>
                    {activeSection === item.href.substring(1) && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
              <Button
                onClick={() => scrollToSection("#contact")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get in Touch
              </Button>

              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 Tyrone Orrego</p>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}
