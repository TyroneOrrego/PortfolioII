"use client"

import {
  FileText,
  Code,
  PenTool,
  BookOpen,
  Layers,
  Globe,
  Database,
  Terminal,
  FileCode,
  Workflow,
  GitBranch,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useAnimations } from "@/lib/animation"

export default function Skills() {
  const { ref: skillsRef, isInView: skillsInView } = useScrollAnimation({ threshold: 0.1 })
  const { ref: toolsRef, isInView: toolsInView } = useScrollAnimation({ threshold: 0.1 })
  const { fadeIn, fadeUp, staggerContainer } = useAnimations()

  // Technical skills with icons and descriptions
  const technicalSkills = [
    {
      name: "Technical Writing",
      icon: FileText,
      description: "Creating clear, concise documentation for technical products and processes",
    },
    {
      name: "API Documentation",
      icon: Code,
      description: "Documenting RESTful APIs, endpoints, and integration guides",
    },
    {
      name: "User Guides",
      icon: PenTool,
      description: "Developing comprehensive guides for end-users of software products",
    },
    {
      name: "Information Architecture",
      icon: Layers,
      description: "Structuring content for optimal user experience and findability",
    },
    {
      name: "Knowledge Base",
      icon: BookOpen,
      description: "Building and maintaining searchable repositories of technical information",
    },
    {
      name: "Process Documentation",
      icon: Workflow,
      description: "Documenting workflows, procedures, and business processes",
    },
  ]

  // Tools and technologies
  const tools = [
    { name: "Markdown", icon: FileCode },
    { name: "Swagger/Postman", icon: Code },
    { name: "Confluence", icon: BookOpen },
    { name: "Jira", icon: Layers },
    { name: "Git", icon: GitBranch },
    { name: "GitHub", icon: Terminal },
    { name: "AI writing tools", icon: PenTool },
    { name: "Agile Development", icon: Workflow },
    { name: "Database Documentation", icon: Database },
  ]

  // Languages with standardized proficiency levels
  const languages = [
    {
      language: "Spanish",
      level: "Native (C2)",
      icon: Globe,
      proficiency: 100,
      description: "Native speaker with full command of the language",
    },
    {
      language: "English",
      level: "Professional (C1+)",
      icon: Globe,
      proficiency: 90,
      description: "Advanced professional proficiency for technical writing",
    },
    {
      language: "French",
      level: "Intermediate (B2)",
      icon: Globe,
      proficiency: 70,
      description: "Intermediate working proficiency",
    },
  ]

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4" variants={fadeUp}>
            Skills & Expertise
          </motion.h2>
          <motion.div className="h-1 w-20 bg-gray-800 rounded mb-8" variants={fadeIn}></motion.div>
          <motion.p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300" variants={fadeUp}>
            My diverse skill set allows me to create comprehensive documentation for various audiences and platforms.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills Section */}
          <div ref={skillsRef}>
            <motion.h3
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Technical Skills
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                          <skill.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base">{skill.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{skill.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div ref={toolsRef}>
            {/* Tools & Technologies Section */}
            <motion.h3
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Tools & Technologies
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={toolsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex items-center gap-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <tool.icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm">{tool.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Languages Section */}
            <motion.h3
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Languages
            </motion.h3>

            <div className="space-y-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.language}
                  initial={{ opacity: 0, y: 20 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <lang.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                          <h4 className="font-semibold">{lang.language}</h4>
                        </div>
                        <Badge variant="secondary" className="font-medium">
                          {lang.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{lang.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
