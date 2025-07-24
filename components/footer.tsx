"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Linkedin, Github, FileText, ArrowUp } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#writing-examples", label: "Writing Samples" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  const services = [
    "API Documentation",
    "User Guides",
    "Technical Specifications",
    "Training Materials",
    "Process Documentation",
    "Knowledge Base Articles",
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: "steven.orrego93@gmail.com",
      href: "mailto:steven.orrego93@gmail.com",
      type: "email",
    },
    {
      icon: Phone,
      label: "+57 3024374193",
      href: "tel:+573024374193",
      type: "phone",
    },
    {
      icon: MapPin,
      label: "Remote Available",
      href: null,
      type: "location",
    },
  ]

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/tyrone-orrego", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/TyroneOrrego", label: "GitHub" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Tyrone Orrego</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Technical Writer specializing in clear, comprehensive documentation that bridges the gap between complex
                technology and user understanding.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-slate-700 text-slate-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 bg-transparent"
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.href.substring(1))
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className="text-slate-400 hover:text-orange-400 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service} className="text-slate-400 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info - Fixed Alignment */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-4">
                {contactInfo.map((contact) => (
                  <li key={contact.label} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <contact.icon className="h-4 w-4 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {contact.href ? (
                        <Link
                          href={contact.href}
                          className="text-slate-400 hover:text-orange-400 transition-colors text-sm break-words"
                        >
                          {contact.label}
                        </Link>
                      ) : (
                        <span className="text-slate-400 text-sm">{contact.label}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Download CV */}
              <div className="mt-6">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  <Link
                    href="https://drive.google.com/file/d/1F6Zx1itVkHY13vDWXkTMKst3J5VWsX04/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Download CV</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-slate-400 text-sm"
          >
            © {currentYear} Tyrone Orrego. All rights reserved.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            <button
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="text-slate-400 hover:text-orange-400 transition-colors text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="text-slate-400 hover:text-orange-400 transition-colors text-sm"
            >
              Terms of Service
            </button>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="border-slate-700 text-slate-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 bg-transparent"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
