"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, Award, TrendingUp, Download, Mail } from "lucide-react"
import Link from "next/link"
import { useImprovedScrollAnimation } from "@/hooks/useImprovedScrollAnimation"
import { SectionHeader } from "@/components/ui/section-header"

export default function About() {
  const { ref, isInView } = useImprovedScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const achievements = [
    {
      icon: FileText,
      value: "60+",
      label: "Documentation Projects",
      description: "Comprehensive guides, APIs, and user manuals",
    },
    {
      icon: Users,
      value: "25+",
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
    <section id="about" className="py-12 md:py-24 bg-white dark:bg-slate-950" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          description="Passionate about transforming complex technical concepts into clear, actionable documentation."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
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
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                <Link href="#contact" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Let's Work Together</span>
                </Link>
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
            </motion.div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
