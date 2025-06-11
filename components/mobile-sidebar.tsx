"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Menu, Home, User, Briefcase, Clock, FileText, MessageSquare, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Briefcase },
  { id: "experience", label: "Experience", icon: Clock },
  { id: "projects", label: "Projects", icon: FileText },
  { id: "writing-examples", label: "Writing", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function MobileSidebar({ activeSection, onSectionChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onSectionChange(sectionId)
      setIsOpen(false)
    }
  }

  // Don't render on desktop
  if (!isMobile) return null

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200 dark:border-slate-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 md:hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Navigation</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                        isActive
                          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                  <p>© 2024 Tyrone Orrego</p>
                  <p>Technical Writer</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
