"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { PricingTier } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type PricingCardsProps = {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function PricingCards({
  tiers,
  title = "Simple, Transparent Pricing",
  subtitle = "Choose Your Plan",
  description = "No hidden fees, no surprises. Choose the plan that fits your business needs and budget.",
  className = "",
}: PricingCardsProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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
              💰 Pricing Plans
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.id} delay={0.1 * index}>
              <motion.div
                className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                  tier.popular 
                    ? 'border-[#FF8A00] scale-105' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                whileHover={{ y: -8, scale: tier.popular ? 1.05 : 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute z-20 -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {tier.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {tier.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Included:</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <div className="w-5 h-5 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {tier.limitations && tier.limitations.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Limitations:</h4>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-start text-gray-500 text-sm">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={tier.ctaLink}
                    className={`w-full inline-flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {tier.ctaText}
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

        {/* Pricing FAQ - Toggleable List */}
        <ScrollReveal className="text-center mt-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  question: "Can I change my plan later?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any differences."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe."
                },
                {
                  question: "Is there a setup fee?",
                  answer: "No setup fees! The price you see is exactly what you pay. We believe in transparent pricing with no hidden costs."
                },
                {
                  question: "Do you offer custom solutions?",
                  answer: "Absolutely! If none of our standard plans fit your needs, we can create a custom solution tailored to your specific requirements."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h4>
                    <motion.svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === index ? "auto" : 0,
                      opacity: openFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* View More FAQs Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/faq"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                View All FAQs
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
            </motion.div>
          </div>
        </ScrollReveal>


      </div>
    </section>
  );
}
