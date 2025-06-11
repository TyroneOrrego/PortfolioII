"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  errorComponent?: (error: Error, reset: () => void) => ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)
  }

  resetErrorBoundary = (): void => {
    // Call the onReset callback if provided
    this.props.onReset?.()

    // Reset the error state
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom error component is provided, use it
      if (this.props.errorComponent && this.state.error) {
        return this.props.errorComponent(this.state.error, this.resetErrorBoundary)
      }

      // If a fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="p-6 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-center my-8">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We're sorry, but there was an error loading this section.
          </p>
          <Button onClick={this.resetErrorBoundary} className="bg-red-600 hover:bg-red-700 text-white">
            Try again
          </Button>
        </div>
      )
    }

    // When there's no error, render children normally
    return this.props.children
  }
}
