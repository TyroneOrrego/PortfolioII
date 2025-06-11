"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useImprovedScrollAnimation } from "@/hooks/useImprovedScrollAnimation"
import { useOptimizedAnimations } from "@/hooks/useOptimizedAnimations"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/ui/project-card"
import { projects } from "@/data/projects"

export default function Projects() {
  const { ref: sectionRef, isInView: sectionInView } = useImprovedScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const { fadeIn, fadeUp, staggerContainer } = useOptimizedAnimations()

  // Filter featured projects if needed
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section id="projects" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Featured Projects"
          description="A selection of my most impactful technical writing and documentation projects."
        />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2" ref={sectionRef}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={sectionInView} />
          ))}
        </div>

        <motion.div
          className="mt-10 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discuss Your Project
            </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
