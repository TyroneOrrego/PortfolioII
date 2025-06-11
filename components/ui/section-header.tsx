"use client"

import { motion } from "framer-motion"
import { useOptimizedAnimations } from "@/hooks/useOptimizedAnimations"

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ title, description, className = "" }: SectionHeaderProps) {
  const { fadeIn, fadeUp, staggerContainer } = useOptimizedAnimations()

  return (
    <motion.div
      className={`flex flex-col items-center mb-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4" variants={fadeUp}>
        {title}
      </motion.h2>
      <motion.div className="h-1 w-20 bg-gray-800 rounded mb-8" variants={fadeIn}></motion.div>
      {description && (
        <motion.p className="text-lg text-center max-w-3xl text-slate-700 dark:text-slate-300" variants={fadeUp}>
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
