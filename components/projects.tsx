"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollAnimation, useStaggerAnimation } from "@/lib/gsap-animations"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/project-card"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Projects() {
  const sectionRef = useScrollAnimation({ once: true })
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useStaggerAnimation(".project-card", 0.2)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-orange-500 rounded mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300">
            A selection of my most impactful technical writing and documentation projects.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} index={index} isInView={true} />
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-10 md:mt-12 text-center">
          <button
            onClick={() => {
              const element = document.getElementById("contact")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  )
}
