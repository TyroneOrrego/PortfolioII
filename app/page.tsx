"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Timeline from "@/components/timeline"
import Projects from "@/components/projects"
import WritingShowcase from "@/components/writing-showcase"
import Testimonials from "@/components/testimonials"
import SimpleContact from "@/components/simple-contact"
import Footer from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import { useUI } from "@/contexts/ui-context"

// Simple loading component
const SectionLoader = ({ className }: { className: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="container mx-auto px-4 py-12">
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto" />
      </div>
    </div>
  </div>
)

export default function Home() {
  const { setActiveSection } = useUI()

  // Optimized intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting && entry.intersectionRatio > 0.5)
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-80px 0px",
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>

        <main id="main-content" role="main">
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>

          <ErrorBoundary>
            <About />
          </ErrorBoundary>

          <ErrorBoundary>
            <Skills />
          </ErrorBoundary>

          <ErrorBoundary>
            <Timeline />
          </ErrorBoundary>

          <ErrorBoundary>
            <Projects />
          </ErrorBoundary>

          <ErrorBoundary>
            <WritingShowcase />
          </ErrorBoundary>

          <ErrorBoundary>
            <Testimonials />
          </ErrorBoundary>

          <ErrorBoundary>
            <SimpleContact />
          </ErrorBoundary>

          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </main>
      </motion.div>
    </AnimatePresence>
  )
}
