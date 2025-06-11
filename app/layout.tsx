import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SkipLink } from "@/components/skip-link"
import { ThemeProvider } from "@/contexts/theme-context"
import { UIProvider } from "@/contexts/ui-context"

// Load Inter font with optimized subsets and display strategy
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://tyrone-orrego.vercel.app"),
  title: {
    default: "Tyrone Orrego | Technical Writer & Documentation Specialist",
    template: "%s | Tyrone Orrego",
  },
  description:
    "Professional technical writer specializing in API documentation, user guides, and knowledge base management. 3+ years of experience helping startups and enterprises create clear, user-friendly documentation.",
  keywords: [
    "technical writer",
    "API documentation",
    "user guides",
    "technical documentation",
    "documentation specialist",
    "Tyrone Orrego",
    "freelance technical writer",
    "software documentation",
    "knowledge base",
    "content strategy",
  ],
  authors: [{ name: "Tyrone Orrego", url: "https://github.com/TyroneOrrego" }],
  creator: "Tyrone Orrego",
  publisher: "Tyrone Orrego",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tyrone-orrego.vercel.app",
    title: "Tyrone Orrego | Technical Writer & Documentation Specialist",
    description:
      "Professional technical writer specializing in API documentation, user guides, and knowledge base management. 3+ years of experience helping startups and enterprises create clear, user-friendly documentation.",
    siteName: "Tyrone Orrego Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tyrone Orrego - Technical Writer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyrone Orrego | Technical Writer & Documentation Specialist",
    description:
      "Professional technical writer specializing in API documentation, user guides, and knowledge base management.",
    images: ["/og-image.jpg"],
  },
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/apple-icon.png", sizes: "180x180" },
    { rel: "manifest", url: "/manifest.json" },
  ],
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://tyrone-orrego.vercel.app",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tyrone Orrego",
              jobTitle: "Technical Writer",
              description: "Professional technical writer specializing in API documentation and user guides",
              url: "https://tyrone-orrego.vercel.app",
              sameAs: ["https://www.linkedin.com/in/tyrone-orrego/", "https://github.com/TyroneOrrego"],
              knowsAbout: [
                "Technical Writing",
                "API Documentation",
                "User Experience Writing",
                "Content Strategy",
                "Software Documentation",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Pontifical Bolivarian University",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <UIProvider>
            <SkipLink />
            <div id="root">{children}</div>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
