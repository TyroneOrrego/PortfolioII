"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Star, Clock, HardDrive, TrendingUp, Search } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface WritingSample {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  downloadUrl: string
  previewUrl?: string
  tags: string[]
  featured: boolean
  lastUpdated: string
}

const writingSamples: WritingSample[] = [
  {
    id: "api-docs",
    title: "API Documentation Guide",
    description:
      "Comprehensive guide for documenting REST APIs with interactive examples, best practices, and real-world case studies from enterprise implementations.",
    category: "API Documentation",
    difficulty: "Intermediate",
    downloadUrl: "https://drive.google.com/file/d/194AWC9YHC48HdNUSfAuVkS-8AfKyD-wQ/view?usp=drive_link"
    tags: ["REST API", "OpenAPI", "Swagger", "Developer Tools", "Best Practices"],
    featured: true,
    lastUpdated: "2024-01-15",
  },
  {
    id: "tech-interviews",
    title: "Technical Writing Interview Guide",
    description:
      "Complete preparation guide for technical writing interviews with sample questions, portfolio tips, and salary negotiation strategies.",
    category: "Career Development",
    difficulty: "Beginner",
    downloadUrl: "https://drive.google.com/file/d/1GtPq3V2EXVfPBsEsfg7_74ajsij-v7Xj/view?usp=drive_link",
    tags: ["Career", "Interviews", "Portfolio", "Skills", "Salary"],
    featured: true,
    lastUpdated: "2024-01-10",
  },
  {
    id: "single-sourcing",
    title: "Single-Sourcing Handbook",
    description:
      "Advanced techniques for maintaining documentation across multiple platforms and formats using modern tools and automation workflows.",
    category: "Documentation Strategy",
    difficulty: "Advanced",
    downloadUrl: "https://drive.google.com/file/d/1iN444I9XnOnU1YP93K98vU9BN9fKNbhn/view?usp=drive_link",
    tags: ["DITA", "Markdown", "Automation", "Workflow", "Multi-platform"],
    featured: false,
    lastUpdated: "2024-01-05",
  },
  {
    id: "Docs as Code",
    title: "Docs as Code made simple and approachable.",
    description:
      "Introduction to Docs-as-Code.",
    category: "Techwitring ",
    difficulty: "Intermediate",
    downloadUrl: "https://drive.google.com/file/d/1DkQgkEYm1s6RYyCTFmx-Q4sr_w7U9ThF/view",
    tags: ["Docs-as-code", "Technical Writing", "Git", "Documentation", "simplified"],
    featured: false,
    lastUpdated: "2023-12-20",
  },
  {
    id: "Starter Pack",
    title: "Technical Writing: Beginners Starter Pack",
    description:
      "Some tools and gadgets that every single TW should have in mind..",
    category: "Tools & Technology",
    difficulty: "Beginner",
    downloadUrl: "https://drive.google.com/file/d/1_w5XBv6nJ55t1YnI25SiSepyQKR7u5rE/view",
    tags: ["Tools", "Platforms", "Technology", "Implementation"],
    featured: false,
    lastUpdated: "2023-12-15",
  },
  {
    id: "Writing methods",
    title: "Elevate Your Documentation:Master These Writing Styles &Methods",
    description:
      "Not every single user persona is the same. The acknowledgement of that gives you a lot of leverage, the following guide provides insights about that.",
    category: "API Documentation",
    difficulty: "Advanced",
    downloadUrl: "https://drive.google.com/file/d/1YkoUmJq9KPG0HBBHUqLWp_5wKNPOP3DU/view",
    tags: ["Tools", "Writing styles", "Methods", "Documentation", "+1"],
    featured: false,
    lastUpdated: "2023-12-10",
  },
]

export default function WritingShowcase() {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  // Filter and sort samples
  const filteredAndSortedSamples = useMemo(() => {
    const filtered = writingSamples

    // Sort samples
    filtered.sort((a, b) => {
      // First sort by featured status (featured items first)
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      // If both have same featured status, sort by downloads as secondary
      return (b.downloads || 0) - (a.downloads || 0)
    })

    return filtered
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
      case "Intermediate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  return (
    <section id="writing-examples" className="py-16 md:py-24 bg-white dark:bg-slate-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            Writing Portfolio
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-center max-w-4xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore my comprehensive collection of technical writing samples, guides, and documentation examples crafted
            for diverse industries and audiences.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredAndSortedSamples.length > 0 ? (
            <motion.div
              key="samples-grid"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredAndSortedSamples.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {sample.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="font-medium">
                              {sample.category}
                            </Badge>
                            <Badge className={getDifficultyColor(sample.difficulty)}>{sample.difficulty}</Badge>
                          </div>
                        </div>
                        {sample.featured && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {sample.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {sample.tags.slice(0, 4).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs hover:bg-orange-50 hover:border-orange-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {sample.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{sample.tags.length - 4} more
                          </Badge>
                        )}
                      </div>

                      {/* Enhanced Actions */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Link
                            href={sample.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Link>
                        </Button>

                        {sample.previewUrl && (
                          <Button asChild variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                            <Link
                              href={sample.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4" />
                              Preview
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">No samples found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  We couldn't find any writing samples matching your criteria. Try adjusting your search or filters.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Clear All Filters</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl p-8 md:p-12 border border-orange-200/50 dark:border-orange-700/50">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Need Custom Documentation?
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create documentation that transforms your user experience and drives business
              results.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Start Your Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
