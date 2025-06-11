"use client"

import Image, { type ImageProps } from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  showLoadingIndicator?: boolean
  fallbackSrc?: string
}

export function OptimizedImage({
  src,
  alt,
  className,
  showLoadingIndicator = true,
  fallbackSrc = "/placeholder.svg",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Reset state when src changes
  useEffect(() => {
    setIsLoading(true)
    setError(false)
    setImageSrc(src)
  }, [src])

  // Generate a low-quality placeholder
  const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSIjMjAyMDIwIi8+PC9zdmc+"

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading indicator */}
      {showLoadingIndicator && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse">
          <ImageIcon className="h-8 w-8 text-slate-400" />
          <span className="sr-only">Loading image...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
          <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm text-slate-500">Image failed to load</p>
        </div>
      )}

      {/* Image */}
      {!error && (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true)
            setIsLoading(false)
            // Try to load fallback if provided
            if (imageSrc !== fallbackSrc) {
              setImageSrc(fallbackSrc)
              setError(false)
              setIsLoading(true)
            }
          }}
          {...props}
        />
      )}
    </div>
  )
}
