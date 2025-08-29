"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { initPageAnimations } from "@/lib/utils/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ParallaxSection from "@/components/animations/ParallaxSection";
import MouseFollower3D from "@/components/animations/MouseFollower3D";
import FloatingGeometry from "@/components/three/FloatingGeometry";
import SmoothScroll from "@/components/ui/SmoothScroll";

// Import landing image for pre-rendering and optimization
import landingImage from "../public/landingimage.jpg";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef);
    return cleanup;
  }, []);

  return (
    <SmoothScroll>
      <main
        ref={containerRef}
        className="select-none touch-pan-y overscroll-none"
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]"
        >
          {/* 3D Floating Geometry */}
          <FloatingGeometry />

          {/* Parallax Background */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 opacity-30"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <motion.div
                style={{ y: textY }}
                className="flex-1 text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm mb-8 border border-orange-500/30"
                >
                  <span className="text-[#FF8A00] font-semibold">
                    ✨ Web Development & Design Excellence
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hero-title text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                >
                  Nexus
                  <span className="block bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text animate-pulse">
                    Web
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="hero-description text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
                >
                  Crafting extraordinary digital experiences that captivate,
                  convert, and scale your business to new heights.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16"
                >
                  <Link
                    href="/contact"
                    className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#FF8A00]"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.svg
                      className="w-6 h-6 ml-3 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </Link>

                  <Link
                    href="/portfolio"
                    className="group border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Explore Our Work
                    <motion.div
                      className="w-2 h-2 bg-[#FF8A00] rounded-full ml-3"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF8A00] mb-2">
                      100+
                    </div>
                    <p className="text-gray-400 text-sm">Projects Delivered</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF8A00] mb-2">
                      5+
                    </div>
                    <p className="text-gray-400 text-sm">Years Experience</p>
                  </div>
                  <div className="text-center col-span-2 md:col-span-1">
                    <div className="text-3xl font-bold text-[#FF8A00] mb-2">
                      24/7
                    </div>
                    <p className="text-gray-400 text-sm">Support</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex-1 relative max-w-2xl"
              >
                <div className="relative">
                  {/* Floating elements around the main image */}
                  <motion.div
                    animate={{ y: [-20, 20, -20] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-sm opacity-70 z-10"
                  />
                  <motion.div
                    animate={{ y: [20, -20, 20] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm opacity-70 z-10"
                  />

                  <MouseFollower3D
                    className="relative cursor-pointer"
                    strength={12}
                    perspective={1200}
                  >
                    <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl overflow-hidden">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00]/20 to-[#FF4D00]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 relative">
                        <Image
                          src={landingImage}
                          alt="Nexus Web - Modern Web Development and Digital Solutions"
                          className="w-full h-full object-cover object-center opacity-90 transition-transform duration-500"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          fill
                        />

                        {/* Overlay with business elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {/* Floating UI elements for business context */}
                        <motion.div
                          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-gray-800">
                              Revenue +24%
                            </span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                          animate={{ y: [0, 5, 0] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-gray-800">
                              Users 1.2K
                            </span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-gray-800">
                              Conversion 12.5%
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </MouseFollower3D>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    number: "100+",
                    label: "Projects Completed",
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                  {
                    number: "50+",
                    label: "Happy Clients",
                    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239",
                  },
                  {
                    number: "5+",
                    label: "Years Experience",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  },
                  {
                    number: "24/7",
                    label: "Support Available",
                    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={stat.icon}
                        />
                      </svg>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Why Choose
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Nexus Web?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We&apos;re not just another web agency. We&apos;re your digital
                growth partners, specializing in the Caribbean market.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Trinidad & Tobago Expertise",
                  description:
                    "Deep understanding of the local market, culture, and business landscape. We know what works in the Caribbean.",
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Proven Track Record",
                  description:
                    "5+ years of experience with 100+ successful projects. From startups to established businesses, we deliver results.",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  title: "Modern Technology Stack",
                  description:
                    "We use cutting-edge technologies like React, Next.js, and modern design principles to build future-proof websites.",
                  icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Mobile-First Approach",
                  description:
                    "With 80% of Caribbean users browsing on mobile, we ensure your website looks perfect on every device.",
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                  color: "from-orange-500 to-red-500",
                },
                {
                  title: "SEO & Local Marketing",
                  description:
                    "Dominate local search results and reach your target audience in Trinidad, Tobago, and the wider Caribbean.",
                  icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  title: "Ongoing Support",
                  description:
                    "24/7 technical support, regular updates, and maintenance to keep your website secure and performing optimally.",
                  icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364",
                  color: "from-teal-500 to-cyan-500",
                },
              ].map((benefit, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <motion.div
                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={benefit.icon}
                          />
                        </svg>
                      </div>

                      <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <ParallaxSection speed={0.3}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50" />
          </ParallaxSection>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="text-center mb-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
              >
                <span className="text-[#FF8A00] font-semibold text-lg">
                  🎯 Our Services
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Complete Digital Solutions
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  For Your Business
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From stunning websites to powerful digital marketing, we provide
                everything your Trinidad & Tobago business needs to succeed
                online.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
              {[
                {
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Web Design & Development",
                  description:
                    "Custom websites and web applications built with modern technologies. Responsive, fast, and optimized for the Caribbean market.",
                  color: "from-blue-500 to-cyan-500",
                  delay: 0.2,
                },
                {
                  icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                  title: "SEO & Digital Marketing",
                  description:
                    "Dominate local search results and reach your target audience in Trinidad, Tobago, and throughout the Caribbean region.",
                  color: "from-green-500 to-emerald-500",
                  delay: 0.4,
                },
                {
                  icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                  title: "E-Commerce Solutions",
                  description:
                    "Complete online store solutions with secure payments, inventory management, and mobile-optimized shopping experiences.",
                  color: "from-purple-500 to-pink-500",
                  delay: 0.6,
                },
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={feature.delay}>
                  <motion.div
                    className="feature-card group relative p-10 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="relative mb-8"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={feature.icon}
                            />
                          </svg>
                        </div>
                        <motion.div
                          className={`absolute -inset-4 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                        />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors mb-6">
                        {feature.description}
                      </p>

                      <Link
                        href="/services"
                        className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:underline`}
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="text-center mt-16">
              <Link
                href="/services"
                className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10">View All Services</span>
                <motion.svg
                  className="w-6 h-6 ml-3 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
          <ParallaxSection speed={0.2}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-purple-50/30" />
          </ParallaxSection>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="text-center mb-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
              >
                <span className="text-[#FF8A00] font-semibold text-lg">
                  💬 Client Stories
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Trusted by Businesses
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Worldwide
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                See what our clients have to say about their transformative
                experience working with Nexus Web
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {[
                {
                  name: "Alex Rodriguez",
                  position: "CEO, TechVenture",
                  image: "https://picsum.photos/150/150?random=10",
                  quote:
                    "Nexus Web delivered exceptional results that exceeded our expectations. Their expertise in modern web development and attention to detail transformed our online presence completely. The new website has significantly improved our user engagement and conversion rates.",
                  rating: 5,
                  delay: 0.2,
                },
                {
                  name: "Sarah Chen",
                  position: "Marketing Director, InnovateCorp",
                  image: "https://picsum.photos/150/150?random=11",
                  quote:
                    "Working with Nexus Web was a game-changer for our business. Their modern approach to web development, innovative design solutions, and commitment to performance helped us achieve our digital goals faster than we imagined.",
                  rating: 5,
                  delay: 0.4,
                },
              ].map((testimonial, index) => (
                <ScrollReveal key={index} delay={testimonial.delay}>
                  <motion.div
                    className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00]/5 to-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Stars */}
                      <div className="flex gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className="w-6 h-6 text-[#FF8A00]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </motion.svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#FF8A00]/20">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full p-1.5 shadow-lg">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </motion.div>
                        <div className="ml-4">
                          <h4 className="font-bold text-xl text-gray-900 mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 font-medium">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(245, 101, 101, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(245, 101, 101, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(245, 101, 101, 0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 mb-8"
              >
                <span className="text-[#FF8A00] font-semibold text-lg">
                  🚀 Start Building Today
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Ready to Transform Your
                <span className="block mt-4 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Digital Future?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
              >
                Join the hundreds of businesses that have already elevated their
                online presence with our expert web development services and
                cutting-edge design solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
              >
                <Link
                  href="/contact"
                  className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  <span className="relative z-10">
                    Schedule Free Consultation
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#FF8A00]"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.svg
                    className="w-6 h-6 ml-3 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </Link>

                <Link
                  href="/portfolio"
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  View Success Stories
                  <motion.div
                    className="w-3 h-3 bg-[#FF8A00] rounded-full ml-3"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto"
              >
                {[
                  { number: "100+", label: "Projects Delivered" },
                  { number: "100%", label: "Client Satisfaction" },
                  { number: "24/7", label: "Support Available" },
                  { number: "5+", label: "Years Experience" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-4xl md:text-5xl font-bold text-[#FF8A00] mb-3">
                      {stat.number}
                    </div>
                    <p className="text-gray-300 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
