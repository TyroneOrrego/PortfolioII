"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export default function SimpleContact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    once: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  return (
    <section id="contact" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-center">
            Let's Work Together
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300">
            Ready to transform your technical documentation? Get in touch to discuss your project.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">Get in Touch</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
                I specialize in creating clear, comprehensive technical documentation that helps your users succeed and
                reduces support overhead. Let's discuss how I can help your project.
              </p>
            </div>

            {/* Contact Details - Centered Layout */}
            <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
              {/* Email */}
              <div className="flex items-center space-x-4 w-full">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">Email</h4>
                  <Link
                    href="mailto:steven.orrego93@gmail.com"
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:underline text-base transition-colors duration-200"
                  >
                    steven.orrego93@gmail.com
                  </Link>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 w-full">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">Phone</h4>
                  <Link
                    href="tel:+573024374193"
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:underline text-base transition-colors duration-200"
                  >
                    +57 3024374193
                  </Link>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 w-full">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-1">Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-base">Remote Available</p>
                </div>
              </div>
            </div>

            {/* Response Time - Centered */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200/50 dark:border-orange-700/50 max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Quick Response</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-center">
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
