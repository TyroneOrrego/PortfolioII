import type React from "react"
import type { ReactNode } from "react"

// Common section props
export interface SectionProps {
  id?: string
  className?: string
  children?: ReactNode
}

// Navigation link props
export interface NavLinkProps {
  href: string
  title: string
  isActive: boolean
  onClick: () => void
  isMobile?: boolean
  index?: number
}

// Project item props
export interface ProjectProps {
  title: string
  description: string
  image?: string
  tags: string[]
  links: {
    demo?: string
    github?: string
    case?: string
  }
}

// Testimonial props
export interface TestimonialProps {
  id: number
  name: string
  company: string
  role: string
  comment: string
  thumbnail: string
}

// Skill props
export interface SkillProps {
  name: string
  level: number
  icon: React.ComponentType<{ className?: string }>
}

// Experience props
export interface ExperienceProps {
  title: string
  company?: string
  institution?: string
  period: string
  description: string
  type: "work" | "education"
}
