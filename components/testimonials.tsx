"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { useImprovedScrollAnimation } from "@/hooks/useImprovedScrollAnimation"
import { SectionHeader } from "@/components/ui/section-header"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  projectType: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carlos Ladino",
    role: "Director of Trading Platforms",
    company: "Tradeview Markets",
    content:
      "Tyrone is an excellent technical Writer with english and spanish domain, capable to develope and maintain IT documentation, users guides and related activities.",
    rating: 5,
    projectType: "Overall",
  },
  {
    id: "2",
    name: "Hector Carreno",
    role: "Software Architect",
    company: "Tradeview Markets",
    content:
      "Tyrone demonstrated his skills as a top-notch technical writer, excellent communication, teamwork orientation, and proficiency in English.",
    rating: 5,
    projectType: "Overall",
  },
  {
    id: "3",
    name: "Jose Benitez",
    role: "Trading Platforms Backend Leader",
    company: "Tradeview Markets",
    content:
      "Tyrone and I worked together at Tradeview Markets, where he was responsible for documenting projects developed by the area's development team. I appreciated his meticulous approach to detailing technical documentation. His contribution was valuable to better understand the projects and facilitated collaboration on the team. greetings",
    rating: 5,
    projectType: "Overall",
  },
  {
    id: "4",
    name: "Carlos Vasco",
    role: "Contract Administrator",
    company: "Valiant Migration Consultancy",
    content:
      "I had a fantastic experience with Tyrone. He is a professional as both an English tutor and a translator. His expertise and dedication truly stand out. I highly recommend his services to anyone looking to improve their English or needing high-quality translation work!",
    rating: 5,
    projectType: "General Documentation",
  },
  {
    id: "5",
    name: "George Luis da Silva Dias",
    role: "Service Delivery Manager",
    company: "SupportYourApp",
    content:
      "The documentation standards and style guide Tyrone created for our client have improved consistency across all our technical content. His strategic approach to documentation has been invaluable.",
    rating: 5,
    projectType: "Training Materials",
  },
  {
    id: "6",
    name: "Shey Bergman",
    role: "Director of Marketing",
    company: "FloWater",
    content:
      "Tyrone's technical writing skills are top-notch. His work on our user guides, research schemas and tutorials has received overwhelmingly positive feedback. He has a talent for making complex workflows seem simple",
    rating: 5,
    projectType: "Process Documentation, Research",
  },
]

export default function Testimonials() {
  const { ref, isInView } = useImprovedScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300 dark:text-slate-600"
        }`}
      />
    ))
  }

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Client Testimonials"
          description="What clients say about working with me and the impact of quality technical documentation."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">{testimonial.company}</p>
                      </div>
                    </div>
                    <Quote className="h-6 w-6 text-orange-400 flex-shrink-0" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">{renderStars(testimonial.rating)}</div>

                  {/* Content */}
                  <blockquote className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Project Type Badge */}
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    {testimonial.projectType}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Let's discuss how quality technical documentation can transform your user experience and reduce support
              overhead.
            </p>
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
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
