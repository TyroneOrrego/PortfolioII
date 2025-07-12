"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Github } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ProjectProps } from "@/types/project-types"

interface ProjectCardProps {
  project: ProjectProps
  index: number
  isInView: boolean
}

export function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hover effects
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const card = cardRef.current
      if (card) {
        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)
      }

      return () => {
        if (card) {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
        }
      }
    }, cardRef)

    return () => ctx.revert()
  }, [])

  const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSIjMjAyMDIwIi8+PC9zdmc+"

  return (
    <div ref={cardRef} className="h-full">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[16/9]">
          <Image
            src={project.image.src || "/placeholder.svg"}
            alt={project.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={index < 2}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white p-4 sm:p-6">{project.title}</h3>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {project.tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className={cn("text-xs sm:text-sm bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors")}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
            {project.links.demo && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm h-8 sm:h-10 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  View Live
                </Link>
              </Button>
            )}

            {project.links.github && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm h-8 sm:h-10 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  GitHub
                </Link>
              </Button>
            )}

            {project.links.case && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm h-8 sm:h-10 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link
                  href={project.links.case}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  Case Study
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
