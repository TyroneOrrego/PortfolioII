"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, Award, TrendingUp, Download, Mail } from "lucide-react"
import Link from "next/link"
import { smoothScrollTo } from "@/lib/gsap-animations"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )

      // Achievements grid animation
      gsap.fromTo(
        achievementsRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )

      // Achievement cards stagger animation
      gsap.fromTo(
        ".achievement-card",
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 70%",
            once: true,
          },
        },
      )

      // Expertise badges animation
      gsap.fromTo(
        ".expertise-badge",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".expertise-container",
            start: "top 80%",
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const achievements = [
    {
      icon: FileText,
      value: "60+",
      label: "Documentation Projects",
      description: "Comprehensive guides, APIs, and user manuals",
    },
    {
      icon: Users,
      value: "10+",
      label: "Happy Clients",
      description: "Startups to International Companies",
    },
    {
      icon: Award,
      value: "3+",
      label: "Years Experience",
      description: "Technical writing",
    },
    {
      icon: TrendingUp,
      value: "25%",
      label: "Support Reduction",
      description: "Average decrease in support tickets",
    },
  ]

  const expertise = [
    "API Documentation",
    "User Experience Writing",
    "Technical Specifications",
    "Process Documentation",
    "Training Materials",
    "Knowledge Base Management",
    "Software Development Kit",
    "Information Architecture",
  ]

  return (
    <section id="about" className="py-12 md:py-24 bg-white dark:bg-slate-950" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">About Me</h2>
          <div className="h-1 w-20 bg-gray-800 rounded mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300">
            Passionate about transforming complex technical concepts into clear, actionable documentation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Bridging the Gap Between Technology and Understanding
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                With over 3 years of experience in technical writing, I specialize in creating documentation that not
                only informs but empowers users to achieve their goals efficiently. My approach combines deep technical
                understanding with user-centered design principles.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I've worked with diverse teams across industries, from early-stage startups to established enterprises,
                helping them communicate complex ideas clearly and effectively. My documentation has consistently
                reduced support overhead while improving user satisfaction and product adoption.
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="expertise-container">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="expertise-badge bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => smoothScrollTo("contact")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                <Mail className="h-4 w-4 mr-2" />
                Let's Work Together
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
              >
                <Link
                  href="https://drive.google.com/file/d/1F6Zx1itVkHY13vDWXkTMKst3J5VWsX04/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Achievements Grid */}
          <div ref={achievementsRef} className="grid sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="achievement-card">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-4">
                      <achievement.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{achievement.value}</div>
                    <div className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{achievement.label}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{achievement.description}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
