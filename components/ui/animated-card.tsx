"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  index?: number
  delay?: number
  isInView?: boolean
}

export function AnimatedCard({ children, className = "", index = 0, delay = 0.1, isInView = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * index }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={className}
    >
      <Card className="h-full">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </motion.div>
  )
}
