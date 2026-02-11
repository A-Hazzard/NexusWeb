"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { OrbitControls, Sphere, Box, Float } from "@react-three/drei";
import type { CreativeHeroProps } from "@/lib/types/agency";

// 3D Scene Component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF8A00" />
      
      {/* Floating geometric shapes */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-2, 1, 0]}>
          <meshStandardMaterial color="#6366F1" transparent opacity={0.7} />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Box args={[0.8, 0.8, 0.8]} position={[2, -1, -1]}>
          <meshStandardMaterial color="#FF8A00" transparent opacity={0.8} />
        </Box>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={3}>
        <Sphere args={[0.3, 16, 16]} position={[0, 2, -2]}>
          <meshStandardMaterial color="#EF4444" transparent opacity={0.6} />
        </Sphere>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function CreativeHero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  stats
}: CreativeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Temporarily disable GSAP animations to debug rendering
    // if (titleRef.current && subtitleRef.current && descriptionRef.current && ctaRef.current) {
    //   // Create hero entrance animation
    //   gsapTimelines.createHeroEntrance(
    //     titleRef.current,
    //     subtitleRef.current,
    //     descriptionRef.current,
    //     ctaRef.current
    //   );
    // }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* 3D Background Scene - Temporarily disabled for debugging */}
      {/* <div className="absolute inset-0 opacity-30">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <HeroScene />
          </Canvas>
        </Suspense>
      </div> */}

      {/* Animated Background Layers */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ y: textY, scale: scaleValue }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Subtitle Badge */}
          <motion.div
            ref={subtitleRef}
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm mb-12 border border-orange-500/30"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#FF8A00] font-bold text-xl">
              ✨ {subtitle}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-12 leading-none"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
                         transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            {title.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block ${
                  word.toLowerCase().includes('nexus') || word.toLowerCase().includes('creative') || word.toLowerCase().includes('digital')
                    ? 'bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text'
                    : ''
                }`}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                 transition={{
                   duration: 0.8,
                   delay: 0.4 + index * 0.1,
                   ease: "easeOut"
                 }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 20px rgba(255, 138, 0, 0.5)"
                }}
              >
                {word}
                {index < title.split(' ').length - 1 && '\u00A0'}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            ref={descriptionRef}
            className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href={ctaLink}>
              <motion.button
                className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(255, 138, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{ctaText}</span>
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
            </Link>

            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink}>
                <motion.button
                  className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {secondaryCtaText}
                  <motion.div
                    className="w-3 h-3 bg-[#FF8A00] rounded-full ml-3"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Stats */}
          {stats && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-5xl md:text-6xl font-black text-[#FF8A00] mb-3 group-hover:text-[#FF6B00] transition-colors">
                    {stat.number}
                  </div>
                  <p className="text-gray-300 font-medium text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
