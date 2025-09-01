"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ClientTestimonial } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type ClientTestimonialsProps = {
  testimonials: ClientTestimonial[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function ClientTestimonials({
  testimonials,
  title = "Trusted by Businesses",
  subtitle = "Worldwide",
  description = "See what our clients have to say about their transformative experience working with Nexus Web",
  className = "",
}: ClientTestimonialsProps) {
  return (
    <section className={`py-32 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden ${className}`}>
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
            {title}
            <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
              {subtitle}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={0.1 * index}>
              <motion.div
                className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00]/5 to-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Industry Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
                    {testimonial.industry}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-5 h-5 text-[#FF8A00]"
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
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Results */}
                  {testimonial.results.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Results:</h4>
                      <ul className="space-y-2">
                        {testimonial.results.map((result, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center text-sm text-gray-600"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full mr-3" />
                            {result}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#FF8A00]/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full p-1 shadow-lg">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </motion.div>
                    <div className="ml-4">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 font-medium text-sm">
                        {testimonial.position}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Indicators */}
        <ScrollReveal className="text-center mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "100+", label: "Happy Clients" },
              { number: "5.0", label: "Average Rating" },
              { number: "98%", label: "Would Recommend" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#FF8A00] mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
