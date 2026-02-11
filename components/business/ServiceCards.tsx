"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/lib/contexts/BookingContext";
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
  const { openBooking } = useBooking();
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
    <section className={` bg-gradient-to-b from-gray-50 to-white relative overflow-hidden ${className}`}>
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
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100" // Removed overflow-hidden to allow tooltips to pop out
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${getServiceColor(service.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} // Added rounded-3xl
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
                  <div className="mb-6 relative">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
                      What&apos;s Included:
                    </h4>
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
                        <li className="relative group/more">
                          <button className="text-sm text-[#FF8A00] font-semibold ml-5 hover:underline cursor-pointer flex items-center">
                            +{service.features.length - 4} more features
                            <svg className="w-4 h-4 ml-1 transform group-hover/more:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          {/* Tooltip for Features - Shows only the hidden features */}
                          <div className="absolute left-0 bottom-full mb-3 w-64 bg-gray-900 rounded-2xl p-4 shadow-2xl border border-white/10 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible group-focus-within/more:opacity-100 group-focus-within/more:visible transition-all duration-300 z-[100]">
                            <h5 className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-3">Additional Features</h5>
                            <ul className="space-y-2">
                              {service.features.slice(4).map((feature, i) => (
                                <li key={i} className="flex items-center text-xs text-gray-200">
                                  <div className="w-1.5 h-1.5 rounded-full mr-2 bg-orange-400" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <div className="absolute bottom-[-6px] left-10 w-3 h-3 bg-gray-900 rotate-45" />
                          </div>
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
                          className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded-full font-medium border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <div className="relative group/tech">
                          <button className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-[#FF8A00] text-xs rounded-full font-bold cursor-pointer border border-orange-100 focus:outline-none">
                            +{service.technologies.length - 3} more
                          </button>

                          {/* Tooltip for Technologies - Shows only the hidden techs */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-gray-900 rounded-xl p-3 shadow-2xl opacity-0 invisible group-hover/tech:opacity-100 group-hover/tech:visible group-focus-within/tech:opacity-100 group-focus-within/tech:visible transition-all duration-300 z-[100]">
                            <div className="flex flex-wrap gap-1.5">
                              {service.technologies.slice(3).map((tech, i) => (
                                <span key={i} className="px-2 py-0.5 text-[10px] rounded-md bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/30">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>



                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Link
                      href="/contact"
                      className={`flex-1 inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r ${getServiceColor(service.category)} text-white rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm`}
                    >
                      Get In Touch
                    </Link>
                    <button
                      onClick={openBooking}
                      className="flex-1 inline-flex items-center justify-center px-4 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-xl font-bold transition-all duration-300 hover:border-gray-200 hover:bg-gray-50 active:scale-[0.98] cursor-pointer text-sm"
                    >
                      Book a Call
                    </button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center my-16">
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
