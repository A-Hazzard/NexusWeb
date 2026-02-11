"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CallToActionProps } from "@/lib/types/landing";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function CallToAction({
  title,
  description,
  primaryButton,
  secondaryButton,
  background = "gradient",
  className = "",
}: CallToActionProps) {
  const getBackgroundClasses = () => {
    switch (background) {
      case "white":
        return "bg-white";
      case "gray":
        return "bg-gray-50";
      case "dark":
        return "bg-gray-900";
      case "gradient":
      default:
        return "bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]";
    }
  };

  const getTextColor = () => {
    switch (background) {
      case "white":
      case "gray":
        return "text-gray-900";
      case "dark":
      case "gradient":
      default:
        return "text-white";
    }
  };

  const getDescriptionColor = () => {
    switch (background) {
      case "white":
      case "gray":
        return "text-gray-600";
      case "dark":
      case "gradient":
      default:
        return "text-gray-300";
    }
  };

  return (
    <section className={`py-32 relative overflow-hidden ${getBackgroundClasses()} ${className}`}>
      {/* Animated background elements for gradient */}
      {background === "gradient" && (
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
      )}

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 mb-8"
          >
            <span className="text-[#FF8A00] font-semibold text-lg">
              🚀 Ready to Get Started?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${getTextColor()}`}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed ${getDescriptionColor()}`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            {/* Primary Button */}
            <Link
              href={primaryButton.link}
              className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40"
            >
              <span className="relative z-10">
                {primaryButton.text}
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

            {/* Secondary Button */}
            {secondaryButton && (
              <Link
                href={secondaryButton.link}
                className={`group border-2 ${
                  background === "gradient" || background === "dark"
                    ? "border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50"
                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400"
                } px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center`}
              >
                {secondaryButton.text}
                <motion.div
                  className={`w-3 h-3 rounded-full ml-3 ${
                    background === "gradient" || background === "dark"
                      ? "bg-[#FF8A00]"
                      : "bg-gray-400"
                  }`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            )}
          </motion.div>

          {/* Trust Indicators */}
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
                <div className={`text-4xl md:text-5xl font-bold mb-3 ${
                  background === "gradient" || background === "dark"
                    ? "text-[#FF8A00]"
                    : "text-[#FF8A00]"
                }`}>
                  {stat.number}
                </div>
                <p className={`font-medium ${
                  background === "gradient" || background === "dark"
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
