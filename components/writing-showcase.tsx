"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, FileText, Star, Clock, Users } from "lucide-react"
import Link from "next/link"
import { useImprovedScrollAnimation } from "@/hooks/useImprovedScrollAnimation"
import { SectionHeader } from "@/components/ui/section-header"

interface WritingSample {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  downloadUrl: string
  previewUrl?: string
  fileSize: string
  readTime: string
  downloads: number
  rating: number
  tags: string[]
  featured: boolean
}

const writingSamples: WritingSample[] = [
  {
    id: "api-docs",
    title: "API Documentation Guide",
    description: "Comprehensive guide for documenting REST APIs with interactive examples and best practices.",
    category: "API Documentation",
    difficulty: "Intermediate",
    downloadUrl: "https://drive.google.com/file/d/194AWC9YHC48HdNUSfAuVkS-8AfKyD-wQ/view?usp=drive_link",
    tags: ["REST API", "OpenAPI", "Swagger", "Developer Tools"],
    featured: true,
  },
  {
    id: "tech-interviews",
    title: "Technical Writing Interview Guide",
    description: "Complete preparation guide for technical writing interviews with sample questions and answers.",
    category: "Career Development",
    difficulty: "Beginner",
    downloadUrl: "https://drive.google.com/file/d/1GtPq3V2EXVfPBsEsfg7_74ajsij-v7Xj/view?usp=drive_link",
    tags: ["Career", "Interviews", "Portfolio", "Skills"],
    featured: true,
  },
  {
    id: "single-sourcing",
    title: "Single-Sourcing Handbook",
    description: "Advanced techniques for maintaining documentation across multiple platforms and formats.",
    category: "Documentation Strategy",
    difficulty: "Advanced",
    downloadUrl: "https://drive.google.com/file/d/1iN444I9XnOnU1YP93K98vU9BN9fKNbhn/view?usp=drive_link",
    tags: ["DITA", "Markdown", "Automation", "Workflow"],
    featured: false,
  },
   {
    id: "Docs as Code",
    title: "Docs as Code Essentials: A Seasoned Writer's View ",
    description: "Docs as Code made simple and approachable.",
    category: "Continuous Learning",
    difficulty: "Beginner",
    downloadUrl: "https://drive.google.com/file/d/1DkQgkEYm1s6RYyCTFmx-Q4sr_w7U9ThF/view?usp=drive_link",
    tags: ["SSG", "Docusaurus", "Git", "CI/CD"],
    featured: false,
  },
  {
    id: "Technical Writing: Beginners Starting Pack",
    title: "Technical Writing: Beginners Starting Pack ",
    description: "Some tools and gadgets that every single TW should have in mind.",
    category: "Continuous Learning",
    difficulty: "Beginner",
    downloadUrl: "https://drive.google.com/file/d/1_w5XBv6nJ55t1YnI25SiSepyQKR7u5rE/view?usp=drive_link",
    tags: ["Tools", "Productivity", "Workflow", "Detail-oriented"],
    featured: false,
  },
  {
    id: "Methods and Approaches: Writing to the right audience",
    title: "Elevate Your Documentation:Master These Writing Styles &Methods ",
    description: "Not every single user persona is the same. The acknowledgement of that gives you a lot of leverage, the following guide provides insights about that.",
    category: "Continuous Learning",
    difficulty: "Beginner",
    downloadUrl: "https://drive.google.com/file/d/1YkoUmJq9KPG0HBBHUqLWp_5wKNPOP3DU/view?usp=drive_link",
    tags: ["Tools", "Styles", "Methods", "Management"],
    featured: false,
  },
]

export default function WritingShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const { ref, isInView } = useImprovedScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  // Get unique categories
  const categories = Array.from(new Set(writingSamples.map((sample) => sample.category)))

  // Filter samples
  const filteredSamples = writingSamples.filter((sample) => {
    const matchesSearch =
      sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || sample.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || sample.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <section id="writing-examples" className="py-12 md:py-24 bg-white dark:bg-slate-950" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Writing Portfolio"
          description="Explore my technical writing samples, guides, and documentation examples."
        />

       

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 text-sm text-slate-600 dark:text-slate-400"
        >
          Showing {filteredSamples.length} of {writingSamples.length} writing samples
        </motion.div>

        {/* Writing Samples Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSamples.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">{sample.title}</CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {sample.category}
                      </Badge>
                    </div>
                    {sample.featured && (
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{sample.description}</p>


                  {/* Difficulty Badge */}
                  <Badge className={getDifficultyColor(sample.difficulty)}>{sample.difficulty}</Badge>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {sample.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {sample.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{sample.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button asChild size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      <Link
                        href={sample.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Link>
                    </Button>

                    {sample.previewUrl && (
                      <Button asChild variant="outline" size="sm">
                        <Link
                          href={sample.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Preview</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">Need custom documentation for your project?</p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            onClick={() => {
              const element = document.getElementById("contact")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Let's Discuss Your Project
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
