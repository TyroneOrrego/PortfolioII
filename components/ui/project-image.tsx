"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface ProjectImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export function ProjectImage({ src, alt, priority = false, className }: ProjectImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Reset state when src changes
  useEffect(() => {
    setLoading(true)
    setError(false)
    setImageSrc(src)
  }, [src])

  // Generate a low-quality placeholder
  const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSIjMjAyMDIwIi8+PC9zdmc+"

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800",
        "aspect-[16/9]", // Fixed aspect ratio for consistency
        className,
      )}
    >
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse">
          <ImageIcon className="h-8 w-8 text-slate-400" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
          <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm text-slate-500">Failed to load image</p>
        </div>
      )}

      {/* Image */}
      {!error && (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn("object-cover transition-opacity duration-500", loading ? "opacity-0" : "opacity-100")}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setLoading(false)}
          onError={() => {
            setError(true)
            setLoading(false)
            // Fallback to placeholder if image fails to load
            setImageSrc("/placeholder.svg?height=400&width=600")
          }}
        />
      )}
    </div>
  )
}
