"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useImprovedScrollAnimation } from "@/hooks/useImprovedScrollAnimation"
import { SectionHeader } from "@/components/ui/section-header"

export default function SimpleContact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { ref, isInView } = useImprovedScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  return (
    <section id="contact" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4 items-center text-center">
        <SectionHeader
          title="Let's Work Together"
          description="Ready to transform your technical documentation? Get in touch to discuss your project."
        />

        <div className="text-center lg:grid-cols-2 content:justify gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="items-center space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                I specialize in creating clear, comprehensive technical documentation that helps your users succeed and
                reduces support overhead. Let's discuss how I can help your project.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 sm:justify-center">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Email</h4>
                  <Link
                    href="mailto:steven.orrego93@gmail.com"
                    className="text-orange-600 dark:text-orange-400 hover:underline text-sm sm:text-base break-all"
                  >
                    steven.orrego93@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Phone</h4>
                  <Link
                    href="tel:+573024374193"
                    className="text-orange-600 dark:text-orange-400 hover:underline text-sm sm:text-base"
                  >
                    +57 3024374193
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Remote</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Quick Response</h4>
              <p className="text-slate-600 dark:text-slate-400">
                I typically respond to project inquiries within 24 hours. For urgent requests, feel free to call
                directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
