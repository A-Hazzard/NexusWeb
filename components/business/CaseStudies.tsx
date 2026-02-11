"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CaseStudy, IndustryExpertise } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type CaseStudiesProps = {
  caseStudies: CaseStudy[];
  industries?: IndustryExpertise[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function CaseStudies({
  caseStudies,
  industries, // eslint-disable-line @typescript-eslint/no-unused-vars
  title = "Success Stories",
  subtitle = "Real Results",
  description = "See how we've helped businesses across Trinidad & Tobago achieve their digital goals with measurable results.",
  className = "",
}: CaseStudiesProps) {
  return (
    <section className={`py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
          >
            <span className="text-[#FF8A00] font-semibold text-lg">
              📈 Case Studies
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {caseStudies.slice(0, 2).map((caseStudy, index) => (
            <ScrollReveal key={caseStudy.id} delay={0.1 * index}>
              <motion.div
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00]/5 to-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Case Study Image */}
                  <div className="relative mb-6">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                    
                    {/* Featured Badge */}
                    {caseStudy.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-30">
                        Featured
                      </div>
                    )}
                    
                    {/* Industry Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {caseStudy.industry}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {caseStudy.client} • {caseStudy.duration}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge:</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Solution:</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Results:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {caseStudy.results.map((result, i) => (
                        <motion.div
                          key={i}
                          className="p-4 bg-gradient-to-r from-[#FF8A00]/10 to-[#FF4D00]/10 rounded-xl border border-[#FF8A00]/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <div className="text-2xl font-bold text-[#FF8A00] mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-gray-600">
                            {result.improvement}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {caseStudy.testimonial && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-[#FF8A00]">
                      <blockquote className="text-gray-700 italic">
                        &ldquo;{caseStudy.testimonial}&rdquo;
                      </blockquote>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/portfolio#${caseStudy.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    View Full Case Study
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Industries We Serve - Infinite Horizontal Slider */}
        <ScrollReveal className="text-center mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Industries We Serve
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[
                { name: "Restaurants", count: "25+", icon: "🍽️" },
                { name: "Retail", count: "30+", icon: "🛍️" },
                { name: "Healthcare", count: "15+", icon: "🏥" },
                { name: "Professional Services", count: "20+", icon: "💼" },
                { name: "E-commerce", count: "18+", icon: "🛒" },
                { name: "Real Estate", count: "12+", icon: "🏠" },
                { name: "Education", count: "8+", icon: "🎓" },
                { name: "Finance", count: "10+", icon: "💰" },
                { name: "Manufacturing", count: "6+", icon: "🏭" },
                { name: "Tourism", count: "14+", icon: "✈️" },
                { name: "Construction", count: "9+", icon: "🏗️" },
                { name: "Technology", count: "22+", icon: "💻" },
                { name: "Legal Services", count: "7+", icon: "⚖️" },
                { name: "Consulting", count: "11+", icon: "📊" },
                { name: "Non-Profit", count: "5+", icon: "🤝" },
                { name: "Entertainment", count: "13+", icon: "🎭" },
                { name: "Automotive", count: "8+", icon: "🚗" },
                { name: "Beauty & Wellness", count: "16+", icon: "💄" },
                { name: "Food & Beverage", count: "19+", icon: "🥤" },
                { name: "Sports & Fitness", count: "7+", icon: "⚽" },
                { name: "Art & Design", count: "9+", icon: "🎨" },
                { name: "Music & Events", count: "6+", icon: "🎵" },
                { name: "Photography", count: "4+", icon: "📸" },
                { name: "Transportation", count: "5+", icon: "🚚" },
                { name: "Agriculture", count: "3+", icon: "🌾" },
                { name: "Energy", count: "2+", icon: "⚡" },
                { name: "Telecommunications", count: "4+", icon: "📱" },
                { name: "Insurance", count: "6+", icon: "🛡️" },
                { name: "Government", count: "3+", icon: "🏛️" },
                { name: "Media & Publishing", count: "5+", icon: "📰" },
              ].map((industry, index) => (
                <div key={`${industry.name}-${index}`} className="flex-shrink-0 mx-4">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-48">
                    <div className="text-4xl mb-3">{industry.icon}</div>
                    <div className="text-2xl font-bold text-[#FF8A00] mb-2">
                      {industry.count}
                    </div>
                    <p className="text-gray-600 font-medium">{industry.name}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate the array for seamless loop */}
              {[
                { name: "Restaurants", count: "25+", icon: "🍽️" },
                { name: "Retail", count: "30+", icon: "🛍️" },
                { name: "Healthcare", count: "15+", icon: "🏥" },
                { name: "Professional Services", count: "20+", icon: "💼" },
                { name: "E-commerce", count: "18+", icon: "🛒" },
                { name: "Real Estate", count: "12+", icon: "🏠" },
                { name: "Education", count: "8+", icon: "🎓" },
                { name: "Finance", count: "10+", icon: "💰" },
                { name: "Manufacturing", count: "6+", icon: "🏭" },
                { name: "Tourism", count: "14+", icon: "✈️" },
                { name: "Construction", count: "9+", icon: "🏗️" },
                { name: "Technology", count: "22+", icon: "💻" },
                { name: "Legal Services", count: "7+", icon: "⚖️" },
                { name: "Consulting", count: "11+", icon: "📊" },
                { name: "Non-Profit", count: "5+", icon: "🤝" },
                { name: "Entertainment", count: "13+", icon: "🎭" },
                { name: "Automotive", count: "8+", icon: "🚗" },
                { name: "Beauty & Wellness", count: "16+", icon: "💄" },
                { name: "Food & Beverage", count: "19+", icon: "🥤" },
                { name: "Sports & Fitness", count: "7+", icon: "⚽" },
                { name: "Art & Design", count: "9+", icon: "🎨" },
                { name: "Music & Events", count: "6+", icon: "🎵" },
                { name: "Photography", count: "4+", icon: "📸" },
                { name: "Transportation", count: "5+", icon: "🚚" },
                { name: "Agriculture", count: "3+", icon: "🌾" },
                { name: "Energy", count: "2+", icon: "⚡" },
                { name: "Telecommunications", count: "4+", icon: "📱" },
                { name: "Insurance", count: "6+", icon: "🛡️" },
                { name: "Government", count: "3+", icon: "🏛️" },
                { name: "Media & Publishing", count: "5+", icon: "📰" },
              ].map((industry, index) => (
                <div key={`${industry.name}-duplicate-${index}`} className="flex-shrink-0 mx-4">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-48">
                    <div className="text-4xl mb-3">{industry.icon}</div>
                    <div className="text-2xl font-bold text-[#FF8A00] mb-2">
                      {industry.count}
                    </div>
                    <p className="text-gray-600 font-medium">{industry.name}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fade overlays for the wall effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
