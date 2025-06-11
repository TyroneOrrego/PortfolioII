"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"
import { useImprovedScrollAnimation } from "@/hooks/useImprovedScrollAnimation"
import { useOptimizedAnimations } from "@/hooks/useOptimizedAnimations"
import { SectionHeader } from "@/components/ui/section-header"
import { ConsistentButton } from "@/components/ui/consistent-button"

interface WritingExample {
  id: string
  title: string
  description: string
  category: string
  pages: number
  fileSize: string
  downloadUrl: string
  tags: string[]
}

const writingExamples: WritingExample[] = [
  {
    id: "api-documentation-guide",
    title: "Crafting Effective API Documentation: A Comprehensive Guide",
    description:
      "A detailed guide covering API environments, controllers, endpoint details, authentication methods, and troubleshooting. Perfect for developers and technical writers looking to create clear, comprehensive API documentation.",
    category: "API Documentation",
    pages: 8,
    fileSize: "1.2 MB",
    downloadUrl: "/examples/api-documentation-guide.pdf",
    tags: ["API", "Documentation", "Swagger", "Postman", "Authentication"],
  },
  {
    id: "technical-writing-interviews",
    title: "Technical Writing Interviews: Your Complete Handbook",
    description:
      "A comprehensive handbook for conducting effective technical writing interviews. Covers everything from preparation and question design to execution and troubleshooting common issues.",
    category: "Research Methods",
    pages: 8,
    fileSize: "950 KB",
    downloadUrl: "/examples/technical-writing-interviews.pdf",
    tags: ["Interviews", "Research", "SME", "Data Collection", "Protocol"],
  },
  {
    id: "single-sourcing-handbook",
    title: "Single Sourcing Handbook: A Practical Guide to Modular Technical Documentation",
    description:
      "A practical guide to implementing single sourcing methodology for creating efficient, flexible, and cost-effective technical documentation. Includes a 10-step conversion process and best practices.",
    category: "Documentation Strategy",
    pages: 7,
    fileSize: "875 KB",
    downloadUrl: "/examples/single-sourcing-handbook.pdf",
    tags: ["Single Sourcing", "Modular Writing", "Content Strategy", "Efficiency", "Methodology"],
  },
]

export default function WritingExamples() {
  const { ref: sectionRef, isInView: sectionInView } = useImprovedScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const { fadeIn, fadeUp, staggerContainer } = useOptimizedAnimations()

  const handleDownload = (example: WritingExample) => {
    // Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "download", {
        event_category: "Writing Examples",
        event_label: example.title,
        value: 1,
      })
    }

    // Create download link
    const link = document.createElement("a")
    link.href = example.downloadUrl
    link.download = `${example.id}.pdf`
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="writing-examples" className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Writing Examples"
          description="Download comprehensive guides and handbooks showcasing my technical writing expertise across various domains and methodologies."
        />

        <div className="grid gap-6 md:gap-8 max-w-5xl mx-auto" ref={sectionRef}>
          {writingExamples.map((example, index) => (
            <motion.article
              key={example.id}
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    {/* Content Section */}
                    <div className="md:col-span-3 space-y-4">
                      {/* Header */}
                      <header className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
                            {example.category}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span>{example.pages} pages</span>
                            <span>•</span>
                            <span>{example.fileSize}</span>
                          </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
                          {example.title}
                        </h3>
                      </header>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                        {example.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {example.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs px-2 py-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                      {/* File Icon */}
                      <div className="flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>

                      {/* Download Button */}
                      <ConsistentButton
                        onClick={() => handleDownload(example)}
                        variant="primary"
                        size="default"
                        animation="scale"
                        icon={<Download className="h-4 w-4" />}
                        iconPosition="left"
                        className="min-w-[140px] font-semibold"
                        aria-label={`Download ${example.title} PDF`}
                      >
                        Download PDF
                      </ConsistentButton>

                      {/* Download Info */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        PDF format • Free download
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Need Custom Documentation?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
              These examples showcase my approach to technical writing. Let's discuss how I can create tailored
              documentation for your project.
            </p>
            <ConsistentButton asChild variant="primary" size="lg" animation="scale" className="font-semibold">
              <a href="#writing-examples">Get in Touch</a>
            </ConsistentButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
