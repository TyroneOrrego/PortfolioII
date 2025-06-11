import { cn } from "@/lib/utils"

// Common animation classes
export const animationClasses = {
  fadeIn: "transition-opacity duration-300",
  fadeUp: "transition-all duration-300",
  slideInLeft: "transition-all duration-300",
  slideInRight: "transition-all duration-300",
  staggerContainer: "transition-opacity duration-300",
}

// Helper function to apply animation classes
export function getAnimationClasses(
  animation: keyof typeof animationClasses,
  isActive: boolean,
  additionalClasses = "",
) {
  return cn(
    animationClasses[animation],
    {
      "opacity-0": !isActive,
      "opacity-100": isActive && animation === "fadeIn",
      "opacity-100 translate-y-0": isActive && animation === "fadeUp",
      "opacity-100 translate-x-0": isActive && (animation === "slideInLeft" || animation === "slideInRight"),
      "opacity-0 -translate-y-4": !isActive && animation === "fadeUp",
      "opacity-0 -translate-x-4": !isActive && animation === "slideInLeft",
      "opacity-0 translate-x-4": !isActive && animation === "slideInRight",
    },
    additionalClasses,
  )
}
