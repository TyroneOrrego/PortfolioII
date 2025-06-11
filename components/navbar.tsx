"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleSectionChange)
    handleScroll()
    handleSectionChange()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleSectionChange)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="font-bold text-xl text-slate-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button onClick={() => scrollToSection("#hero")} className="hover:text-orange-500 transition-colors">
              Tyrone Orrego
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-500",
                  activeSection === item.href.substring(1) ? "text-orange-500" : "text-slate-600 dark:text-slate-300",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      activeSection === item.href.substring(1)
                        ? "text-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-800",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={() => scrollToSection("#contact")}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
