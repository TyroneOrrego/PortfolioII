"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
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
            <div className="flex flex-col items-center space-y-6">
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Email</h4>
                  <Link
                    href="mailto:tyrone@example.com"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    tyrone@example.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Phone</h4>
                  <Link href="tel:+1234567890" className="text-orange-600 dark:text-orange-400 hover:underline">
                    +1 (234) 567-8900
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Location</h4>
                  <p className="text-slate-600 dark:text-slate-400">Remote</p>
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
