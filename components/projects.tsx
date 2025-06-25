"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useAnimations } from "@/lib/animations"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/project-card"

export default function Projects() {
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const { fadeIn, fadeUp, staggerContainer } = useAnimations()

  return (
    <section id="projects" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4" variants={fadeUp}>
            Featured Projects
          </motion.h2>
          <motion.div className="h-1 w-20 bg-gray-800 rounded mb-8" variants={fadeIn}></motion.div>
          <motion.p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300" variants={fadeUp}>
            A selection of my most impactful technical writing and documentation projects.
          </motion.p>
        </motion.div>

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
