"use client"

import { useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import MobileSidebar from "@/components/mobile-sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { useUI } from "@/contexts/ui-context"

// Optimized dynamic imports with better loading states
const About = dynamic(() => import("@/components/about"), {
  loading: () => <div className="h-96 bg-white dark:bg-slate-950 animate-pulse" />,
  ssr: true,
})

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900 animate-pulse" />,
  ssr: true,
})

const Timeline = dynamic(() => import("@/components/timeline"), {
  loading: () => <div className="h-96 bg-white dark:bg-slate-950 animate-pulse" />,
  ssr: true,
})

const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900 animate-pulse" />,
  ssr: true,
})

const WritingShowcase = dynamic(() => import("@/components/writing-showcase"), {
  loading: () => <div className="h-96 bg-white dark:bg-slate-950 animate-pulse" />,
  ssr: true,
})

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900 animate-pulse" />,
  ssr: true,
})

const SimpleContact = dynamic(() => import("@/components/simple-contact"), {
  loading: () => <div className="h-96 bg-slate-50 dark:bg-slate-900 animate-pulse" />,
  ssr: true,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-32 bg-slate-900 animate-pulse" />,
  ssr: true,
})

export default function Home() {
  const { activeSection, setActiveSection } = useUI()

  // Optimized scroll handling with intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: [0.5],
        rootMargin: "-80px 0px -80px 0px",
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [setActiveSection])

  // Preload critical resources
  useEffect(() => {
    const preloadLinks = [
      "/examples/api-documentation-guide.pdf",
      "/examples/technical-writing-interviews.pdf",
      "/examples/single-sourcing-handbook.pdf",
      "/cv/tyrone-orrego-cv.pdf",
    ]

    preloadLinks.forEach((href) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = href
      document.head.appendChild(link)
    })
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Navigation */}
        <ErrorBoundary>
          <Navbar />
          <MobileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </ErrorBoundary>

        {/* Main Content */}
        <main id="main-content" role="main">
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>

          <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
            <ErrorBoundary>
              <Timeline />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
            <ErrorBoundary>
              <WritingShowcase />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
            <ErrorBoundary>
              <Testimonials />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
            <ErrorBoundary>
              <SimpleContact />
            </ErrorBoundary>
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={<div className="h-32 bg-slate-900 animate-pulse" />}>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
