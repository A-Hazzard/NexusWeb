"use client";

import { motion } from "framer-motion";
import { ProcessStep } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type ProcessTimelineProps = {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function ProcessTimeline({
  steps,
  title = "How We Work",
  subtitle = "Our Process",
  description = "Our proven 5-step process ensures your project is delivered on time, on budget, and exceeds your expectations.",
  className = "",
}: ProcessTimelineProps) {
  return (
    <section className={`py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
          >
            <span className="text-[#FF8A00] font-semibold text-lg">
              🔄 Our Process
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

        {/* Process Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF8A00] to-[#FF4D00] rounded-full hidden lg:block" />

          <div className="space-y-20">
            {steps.map((step, index) => (
              <ScrollReveal key={step.id} delay={0.1 * index}>
                <motion.div
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  {/* Step Content */}
                  <div className="flex-1">
                    <motion.div
                      className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      <div className="relative z-10">
                        {/* Step Number */}
                        <div className="flex items-center mb-6">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                          >
                            {index + 1}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                              Step {index + 1}
                            </div>
                            <div className="text-sm text-gray-400">
                              {step.duration}
                            </div>
                          </div>
                        </div>

                        {/* Step Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                          {step.title}
                        </h3>

                        {/* Step Description */}
                        <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors mb-6">
                          {step.description}
                        </p>

                        {/* Deliverables */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">What You Get:</h4>
                          <ul className="space-y-2">
                            {step.deliverables.map((deliverable, i) => (
                              <motion.li
                                key={i}
                                className="flex items-center text-sm text-gray-600"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * i }}
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full mr-3" />
                                {deliverable}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl`}
                      >
                        <svg
                          className="w-12 h-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={step.icon}
                          />
                        </svg>
                      </div>
                      <motion.div
                        className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Process Summary */}
        <ScrollReveal className="text-center mt-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Why Our Process Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparent Communication",
                  description: "Regular updates and clear milestones keep you informed every step of the way.",
                  icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                },
                {
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality checks ensure your website performs flawlessly.",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                {
                  title: "Ongoing Support",
                  description: "24/7 support and maintenance to keep your website secure and up-to-date.",
                  icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                        d={benefit.icon}
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
