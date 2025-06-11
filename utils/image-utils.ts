/**
 * Checks if an image URL is valid and accessible
 * @param url The image URL to check
 * @returns A promise that resolves to a boolean indicating if the image is valid
 */
export async function isImageValid(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * Gets a fallback image URL if the original fails to load
 * @param originalUrl The original image URL
 * @param width Optional width for the placeholder
 * @param height Optional height for the placeholder
 * @returns A fallback image URL
 */
export function getFallbackImageUrl(originalUrl: string, width = 800, height = 600): string {
  // Try to extract a color from the original URL to use as background
  const colorMatch = originalUrl.match(/#([0-9a-f]{3,6})/i)
  const color = colorMatch ? colorMatch[1] : "202020"

  return `/placeholder.svg?height=${height}&width=${width}&color=${color}`
}

/**
 * Generates a blur data URL for an image
 * @param color Optional hex color for the blur (without #)
 * @returns A data URL for a blurred placeholder
 */
export function generateBlurDataURL(color = "202020"): string {
  return `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSIjJHtjb2xvcn0iLz48L3N2Zz4=`
}
