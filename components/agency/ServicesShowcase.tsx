"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsapTimelines } from "@/lib/animations/gsap/timelines";
import FlipCard from "@/components/interactive/FlipCard";
import type { ServicesShowcaseProps } from "@/lib/types/agency";

export default function ServicesShowcase({
  services,
  className = "",
  title = "Our Creative Services",
  subtitle = "Innovative Solutions",
  description = "Transform your digital presence with our cutting-edge creative services designed for the modern web."
}: ServicesShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && subtitleRef.current && descriptionRef.current) {
      // Create scroll-triggered animation
      const elements = [subtitleRef.current, titleRef.current, descriptionRef.current];
      gsapTimelines.createStaggeredEntrance(elements, 0.15);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden ${className}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            ref={subtitleRef}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "back.out(1.7)" }}
          >
            <span className="text-[#FF8A00] font-semibold text-lg">
              ⚡ {subtitle}
            </span>
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title.split(' ').map((word, index) => (
              <span key={index}>
                {word === 'Creative' || word === 'Services' ? (
                  <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                    {word}
                  </span>
                ) : (
                  word
                )}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </motion.h2>

          <motion.p
            ref={descriptionRef}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service) => (
            <FlipCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              features={service.features}
              className="h-full"
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-5 rounded-2xl text-lg font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(255, 138, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore All Services</span>
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
          </motion.button>
        </motion.div>
      </div>

      {/* Floating elements for depth */}
      <motion.div
        className="absolute top-1/4 left-8 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60"
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-12 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-60"
        animate={{
          rotate: [0, 360],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-60"
        animate={{
          x: [-5, 5, -5],
          y: [-5, 5, -5],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}
