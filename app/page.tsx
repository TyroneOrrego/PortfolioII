"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
import { pageTransitions } from "@/lib/gsap-animations"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const { setActiveSection } = useUI()

  useEffect(() => {
    // Page entrance animation
    pageTransitions.slideUp()

    // Optimized intersection observer for section tracking
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

    // Global scroll animations
    gsap.utils.toArray(".fade-in-up").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
        },
      )
    })

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [setActiveSection])

  return (
    <div className="min-h-screen">
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
    </div>
  )
}
