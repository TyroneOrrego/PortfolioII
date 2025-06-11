"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations"

export default function Timeline() {
  const { ref: timelineRef, isInView: timelineInView } = useScrollAnimation(0.1)

  const experiences = [
    {
      title: "Freelance Technical Writer",
      period: "2024 - Present",
      description:
        "Worked with several start-ups and other small clients setting, managing and organizing their documentation knowledge bases, APIs Docs and other written outlets",
      type: "work",
    },
    {
      title: "Mid-Level Technical Writer",
      company: "Tradeview Markets",
      period: "2022 - 2024",
      description:
        "Developed end-user documentation for enterprise software as a service products. Collaborated with product managers, SMEs, stakeholders and developers to ensure accurate technical content. Redesigned the knowledge base structure and Style Guide resulting in a 20% reduction in support tickets.",
      type: "work",
    },
    {
      title: "Graduate Research Assistant and M.Ed",
      institution: "Pontifical Bolivarian University",
      period: "2019 - 2021",
      description:
        "Served as a research assistant to a research project where I was in charge of the recup of the data, systematization and codification of the data retrieved. Also, I wrote reports to several government agencies. Finally, participated in the writing, submission and presentation of 4+ papers and book chapters.",
      type: "work",
    },
    {
      title: "Undergraduate Research Assistant",
      company: "Pontifical Bolivarian University",
      period: "2013 - 2017",
      description:
        "Served as a research assistant to a research project where I was in charge of the management of data, deadlines for different submissions, newcomers, writting efforts and so forth. Then, I participated in the writing, submission and presentation of 14+ papers, articles and book chapters",
      type: "work",
    },
    {
      title: "B.A. in English & Spanish Education",
      institution: "Pontifical Bolivarian University",
      period: "2013 - 2018",
      description:
        "Program focused on the development of bilingual professional teacher researchers capable of detecting through their pedagogical eye, different outcomes, contexts and problematics that could be solved with help of research, pedagogy, curiosity and humanistic efforts.",
      type: "education",
    },
  ]

  return (
    <section id="experience" className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4" variants={fadeUp}>
            Experience Timeline
          </motion.h2>
          <motion.div className="h-1 w-20 bg-gray-800 rounded mb-8" variants={fadeIn}></motion.div>
          <motion.p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300" variants={fadeUp}>
            My professional journey as a technical writer so far has three years of solid development. Nonetheless, I
            have eight years of experience across various industries.
          </motion.p>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800 hidden md:block"
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5 }}
            style={{ originY: 0 }}
          ></motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-800 z-10 hidden md:flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + 0.2 * index }}
                >
                  {exp.type === "work" ? (
                    <Briefcase className="h-3 w-3 text-white" />
                  ) : (
                    <GraduationCap className="h-3 w-3 text-white" />
                  )}
                </motion.div>

                {/* Content card */}
                <motion.div
                  className={`md:w-5/12 ${index % 2 === 0 ? "md:ml-auto" : ""}`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className={`border-l-4 ${exp.type === "work" ? "border-l-gray-800" : "border-l-gray-600"}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-full ${exp.type === "work" ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"} md:hidden`}
                        >
                          {exp.type === "work" ? (
                            <Briefcase className="h-5 w-5" />
                          ) : (
                            <GraduationCap className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{exp.period}</div>
                          <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                          <div className="text-slate-600 dark:text-slate-400 mb-3">
                            {exp.type === "work" ? exp.company : exp.institution}
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
