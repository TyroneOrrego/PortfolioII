"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme from localStorage if available
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  // Update isDarkMode based on theme and system preference
  useEffect(() => {
    const updateDarkMode = () => {
      if (theme === "system") {
        const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        setIsDarkMode(systemDarkMode)
      } else {
        setIsDarkMode(theme === "dark")
      }
    }

    updateDarkMode()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        updateDarkMode()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme, isDarkMode])

  return <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
