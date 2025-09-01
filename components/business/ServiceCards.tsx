"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ServicePackage, ServiceFeature } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type ServiceCardsProps = {
  services: ServicePackage[];
  features?: ServiceFeature[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function ServiceCards({
  services,
  features, // eslint-disable-line @typescript-eslint/no-unused-vars
  title = "Complete Digital Solutions",
  subtitle = "For Your Business",
  description = "From stunning websites to powerful digital marketing, we provide everything your Trinidad & Tobago business needs to succeed online.",
  className = "",
}: ServiceCardsProps) {
  const getServiceIcon = (category: string) => {
    const icons = {
      'web-development': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      'e-commerce': 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      'seo': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      'maintenance': 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364'
    };
    return icons[category as keyof typeof icons] || icons['web-development'];
  };

  const getServiceColor = (category: string) => {
    const colors = {
      'web-development': 'from-blue-500 to-cyan-500',
      'e-commerce': 'from-green-500 to-emerald-500',
      'seo': 'from-purple-500 to-pink-500',
      'maintenance': 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || colors['web-development'];
  };

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
              🎯 Our Services
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={0.1 * index}>
              <motion.div
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${getServiceColor(service.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute z-30 -top-4 -right-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Service Image */}
                  <div className="relative mb-6">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  </div>

                  {/* Service Icon */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${getServiceColor(service.category)} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
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
                          d={getServiceIcon(service.category)}
                        />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">What&apos;s Included:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full mr-3" />
                          {feature}
                        </motion.li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-sm text-gray-500 ml-5">
                          +{service.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{service.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>



                  {/* CTA Button */}
                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${getServiceColor(service.category)} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105`}
                  >
                    Get Started
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

        <ScrollReveal className="text-center mt-16">
          <Link
            href="/services"
            className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
          >
            <span className="relative z-10">View All Services</span>
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
        </ScrollReveal>
      </div>
    </section>
  );
}
