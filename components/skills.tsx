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
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const languagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure all content is visible by default
      gsap.set([headerRef.current, skillsRef.current, toolsRef.current, languagesRef.current], {
        opacity: 1,
        y: 0,
      })

      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      )

      // Skills section animation
      gsap.fromTo(
        skillsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            once: true,
          },
        },
      )

      // Tools section animation
      gsap.fromTo(
        toolsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 85%",
            once: true,
          },
        },
      )

      // Languages section animation - with more lenient trigger
      gsap.fromTo(
        languagesRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: languagesRef.current,
            start: "top 90%", // More lenient trigger for mobile
            once: true,
          },
        },
      )

      // Stagger animations for skill cards
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )

      // Stagger animations for tool items
      gsap.fromTo(
        ".tool-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )

      // Stagger animations for language cards
      gsap.fromTo(
        ".language-card",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: languagesRef.current,
            start: "top 85%", // More lenient for mobile
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
    <section id="skills" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-orange-500 rounded mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300">
            My diverse skill set allows me to create comprehensive documentation for various audiences and platforms.
          </p>
        </div>

        <div className="space-y-16">
          {/* Technical Skills Section */}
          <div ref={skillsRef}>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicalSkills.map((skill, index) => (
                <div key={skill.name} className="skill-card">
                  <Card className="h-full border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex-shrink-0">
                          <skill.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base mb-1">{skill.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{skill.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies Section */}
          <div ref={toolsRef}>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Tools & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {tools.map((tool, index) => (
                <div key={tool.name} className="tool-item">
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300">
                    <tool.icon className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{tool.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section - Fixed for mobile */}
          <div ref={languagesRef} className="w-full">
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Languages</h3>
            <div className="space-y-4 max-w-2xl mx-auto md:mx-0">
              {languages.map((lang, index) => (
                <div key={lang.language} className="language-card w-full">
                  <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                            <lang.icon className="h-5 w-5" />
                          </div>
                          <h4 className="font-semibold text-lg">{lang.language}</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className="font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                        >
                          {lang.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">{lang.description}</p>

                      {/* Progress bar for visual representation */}
                      <div className="mt-3 ml-11">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${lang.proficiency}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
