"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { initPageAnimations } from "@/lib/utils/animations";
import ScrollReveal from "@/components/animations/ScrollReveal";

import MouseFollower3D from "@/components/animations/MouseFollower3D";
import FloatingGeometry from "@/components/three/FloatingGeometry";
import SmoothScroll from "@/components/ui/SmoothScroll";

// Import business components
import ClientTestimonials from "@/components/business/ClientTestimonials";
import ServiceCards from "@/components/business/ServiceCards";
import ProcessTimeline from "@/components/business/ProcessTimeline";
import PricingCards from "@/components/business/PricingCards";
import NewsletterSignup from "@/components/business/NewsletterSignup";

// Import section components
import TrustIndicators from "@/components/sections/TrustIndicators";
import BlogPreview from "@/components/sections/BlogPreview";

// Import landing page data
import {
  testimonials,
  services,
  processSteps,
  pricingTiers,
  blogPosts,
  trustIndicators,
  clientLogos,
  newsletterSignup,
  newsletterSocialProof,
  serviceFeatures,
} from "@/lib/data/landingData";

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

        {/* Trust Indicators Section */}
        <TrustIndicators
          indicators={trustIndicators}
          clientLogos={clientLogos}
          testimonials={testimonials}
          stats={[
            { number: "100+", label: "Projects Completed", description: "Successfully delivered" },
            { number: "50+", label: "Happy Clients", description: "Across Trinidad & Tobago" },
            { number: "5+", label: "Years Experience", description: "In web development" },
            { number: "24/7", label: "Support Available", description: "Always here to help" }
          ]}
        />

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

        {/* Services Section */}
        <ServiceCards
          services={services}
          features={serviceFeatures}
        />

        {/* Pricing Section */}
        <PricingCards
          tiers={pricingTiers}
        />

        {/* Testimonials Section */}
        <ClientTestimonials
          testimonials={testimonials}
        />



        {/* Process Section */}
        <ProcessTimeline
          steps={processSteps}
        />

        {/* Blog Preview Section */}
        <BlogPreview
          posts={blogPosts}
          categories={['Web Development', 'E-Commerce', 'SEO', 'Security', 'Design']}
        />

        {/* Contact & Newsletter Section - Truly unified, no cards */}
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
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Start Your
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Digital Journey?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Let&apos;s discuss your project and create something extraordinary together. 
                Get in touch with us today for a free consultation.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto mb-20">
              {/* Contact Form - No card, just the form */}
              <ScrollReveal>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                          placeholder="Your last name"
                        />
                      </div>
                        </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                        placeholder="+1 (868) 555-0123"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="web-design">Web Design</option>
                        <option value="ecommerce">E-Commerce Development</option>
                        <option value="seo">SEO & Marketing</option>
                        <option value="maintenance">Website Maintenance</option>
                        <option value="consultation">Consultation</option>
                      </select>
            </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
          </div>
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
            </ScrollReveal>

              {/* Contact Information */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      Ready to transform your digital presence? We&apos;re here to help you succeed. 
                      Reach out to us through any of the channels below.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                        <p className="text-gray-300">+1 (868) 555-0123</p>
                        <p className="text-gray-400 text-sm">Mon-Fri: 9AM-6PM AST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                        <p className="text-gray-300">info@nexusweb.tt</p>
                        <p className="text-gray-400 text-sm">We&apos;ll respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                        <p className="text-gray-300">Port of Spain, Trinidad & Tobago</p>
                        <p className="text-gray-400 text-sm">Serving the entire Caribbean</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <motion.a
                        href="https://www.instagram.com/nexuswebtt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-[#FF8A00] hover:border-[#FF8A00] transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Newsletter Section - Now truly part of the same section */}
            <div className="max-w-4xl mx-auto">
              <NewsletterSignup
                signup={newsletterSignup}
                benefits={newsletterSignup.benefits}
                socialProof={newsletterSocialProof}
              />
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}


