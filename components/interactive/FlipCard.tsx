"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

type FlipCardProps = {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  className?: string;
};

export default function FlipCard({ 
  title, 
  description, 
  icon, 
  color, 
  features, 
  className = "" 
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative w-full h-80 cursor-pointer perspective-1000 ${className}`}
      onClick={handleFlip}
    >
      <div
        className="relative w-full h-full preserve-3d"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s ease-in-out"
        }}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl border border-gray-700 p-8 flex flex-col items-center justify-center text-center group hover:border-gray-600 transition-all duration-300"
          style={{ 
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`w-20 h-20 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors">
              {description}
            </p>

            {/* Flip indicator */}
            <motion.div
              className="mt-6 text-orange-400 text-sm font-medium"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to flip →
            </motion.div>
          </div>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-8 flex flex-col justify-center"
          style={{ 
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)"
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-6">
              {title}
            </h3>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wide">
                What&apos;s Included
              </h4>
              <ul className="space-y-2">
                {features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center text-gray-200 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <motion.button
              className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
