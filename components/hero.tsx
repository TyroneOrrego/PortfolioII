"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Sparkles, Award, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { smoothScrollTo } from "@/lib/gsap-animations"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states - ensure content is visible by default
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, statsRef.current, trustRef.current], {
        opacity: 1,
        y: 0,
      })

      // Create main timeline with subtle animations
      const tl = gsap.timeline({ delay: 0.2 })

      // Animate title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .fromTo(
          trustRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        )

      // Animate stats cards with stagger
      gsap.fromTo(
        ".stat-card",
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 1.5,
        },
      )

      // Animate trust indicators
      gsap.fromTo(
        ".trust-item",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 2,
        },
      )

      // Subtle parallax effect for background elements
      gsap.to(".bg-element-1", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(".bg-element-2", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { icon: FileText, value: "60+", label: "Projects Completed" },
    { icon: Users, value: "10+", label: "Happy Clients" },
    { icon: Award, value: "3+", label: "Years Experience" },
  ]

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900/50 relative overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="bg-element-1 absolute top-20 left-10 w-64 h-64 bg-orange-200/40 dark:bg-orange-900/20 rounded-full blur-3xl" />
        <div className="bg-element-2 absolute bottom-20 right-10 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/15 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white leading-tight sm:leading-[1.1] tracking-tight px-2 sm:px-0"
              >
                <span className="block sm:inline">Technical Writer</span>
                <span className="block sm:inline"> & </span>
                <span className="text-orange-500 relative block sm:inline">
                  Documentation
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-orange-300/60"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C50 2 100 2 150 6C200 10 250 4 298 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="block sm:inline"> Expert</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light px-4"
            >
              Transforming complex technical concepts into{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                clear, user-friendly documentation
              </span>{" "}
              that drives adoption and reduces support overhead.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 px-4"
            >
              <Button
                onClick={() => smoothScrollTo("projects")}
                size="lg"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                View My Work
              </Button>
              <Button
                onClick={() => smoothScrollTo("contact")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full"
              >
                Let's Talk
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="mt-16 sm:mt-20 lg:mt-24 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group stat-card">
                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div ref={trustRef} className="mt-12 sm:mt-16 text-center px-4">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
              Trusted by companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-60">
              {["Tradeview Markets", "SupportYourApp", "FloWater", "Valiant Migration"].map((company, index) => (
                <div
                  key={company}
                  className="trust-item text-slate-400 dark:text-slate-500 font-medium text-xs sm:text-sm hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
