"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { NewsletterSignup as NewsletterSignupType, SocialProof } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type NewsletterSignupProps = {
  signup: NewsletterSignupType;
  benefits: string[];
  socialProof: SocialProof[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function NewsletterSignup({
  signup,
  benefits,
  socialProof,
  title = "Stay Updated",
  subtitle = "Get Our Newsletter",
  description = "Join thousands of business owners who receive our weekly insights, tips, and exclusive offers.",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 mb-8"
          >
            <span className="text-[#FF8A00] font-semibold text-lg">
              📧 Newsletter
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            {title}
            <span className="block mt-4 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
              {subtitle}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={signup.placeholder}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Subscribing...
                  </div>
                ) : isSubmitted ? (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Subscribed!
                  </div>
                ) : (
                  signup.buttonText
                )}
              </motion.button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              {signup.privacyText}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-300 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          {socialProof.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm mb-4">Join thousands of subscribers</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {socialProof.map((proof, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {proof.image && (
                      <Image
                        src={proof.image}
                        alt={proof.source || "Social proof"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-sm">
                      {proof.content}
                      {proof.verified && (
                        <svg className="w-4 h-4 inline ml-1 text-[#FF8A00]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
