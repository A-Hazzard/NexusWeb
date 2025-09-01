"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrustIndicator, ClientLogo, ClientTestimonial } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type TrustIndicatorsProps = {
  indicators: TrustIndicator[];
  clientLogos: ClientLogo[];
  testimonials?: ClientTestimonial[];
  stats: Array<{
    number: string;
    label: string;
    description?: string;
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function TrustIndicators({
  indicators,
  clientLogos, // eslint-disable-line @typescript-eslint/no-unused-vars
  testimonials = [],
  stats,
  title = "Trusted by Businesses",
  subtitle = "Across Trinidad & Tobago",
  className = "",
}: TrustIndicatorsProps) {
  return (
    <section className={`py-20 bg-white relative ${className}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </ScrollReveal>

        {/* Client Testimonials Slider */}
        {testimonials.length > 0 && (
          <ScrollReveal className="mb-16">
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
                  <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 mx-4">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-80">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.company}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Fade overlays for the wall effect */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>
          </ScrollReveal>
        )}

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {indicators.map((indicator, index) => (
            <ScrollReveal key={indicator.id} delay={0.1 * index}>
              <motion.div
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {indicator.image && (
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <Image
                      src={indicator.image}
                      alt={indicator.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {indicator.title}
                </h3>
                {indicator.value && (
                  <div className="text-2xl font-bold text-[#FF8A00] mb-2">
                    {indicator.value}
                  </div>
                )}
                {indicator.description && (
                  <p className="text-gray-600 text-sm">
                    {indicator.description}
                  </p>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
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
                {stat.description && (
                  <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Trust Badges */}
        <ScrollReveal className="text-center mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { name: "SSL Secured", icon: "🔒" },
              { name: "GDPR Compliant", icon: "🛡️" },
              { name: "24/7 Support", icon: "🚀" },
              { name: "Money Back Guarantee", icon: "💰" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg mr-2">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
