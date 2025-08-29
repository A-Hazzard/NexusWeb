'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { initPageAnimations } from '@/lib/utils/animations'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ParallaxSection from '@/components/animations/ParallaxSection'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateBreadcrumbStructuredData } from '@/lib/seo/utils'
import { SITE_CONFIG } from '@/lib/seo/config'

// Breadcrumb structured data
const breadcrumbStructuredData = generateBreadcrumbStructuredData([
  { name: 'Home', url: SITE_CONFIG.url },
  { name: 'Contact', url: `${SITE_CONFIG.url}/contact` },
])

type ContactFormData = {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}

type FormStatus = {
  type: 'success' | 'error' | null
  message: string
}

type ValidationError = {
  field: string
  message: string
}

const validateForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = []
  
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' })
  }
  
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }
  
  if (!data.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' })
  }
  
  return errors
}

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = initPageAnimations(containerRef)
    return cleanup
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationErrors([])
    setFormStatus({ type: null, message: '' })
    
    const form = e.currentTarget
    const formData: ContactFormData = {
      name: (form.elements.namedItem('name') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value || '',
      service: (form.elements.namedItem('service') as HTMLSelectElement)?.value || '',
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '',
    }
    
    const errors = validateForm(formData)
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setFormStatus({
          type: 'success',
          message: result.message,
        })
        formRef.current?.reset()
      } else {
        setFormStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (err) {
      console.error('Failed to send email:', err)
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact us directly at nexuswebtt@gmail.com',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SmoothScroll>
      <main ref={containerRef} className="select-none touch-pan-y overscroll-none">
        <StructuredData data={[breadcrumbStructuredData]} />
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] flex items-center">
          <ParallaxSection speed={0.5}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
            </div>
          </ParallaxSection>

          <div className="container mx-auto px-4 relative z-10 py-32">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 mb-8"
              >
                <span className="text-[#FF8A00] font-semibold text-lg">💬 Get In Touch</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Let&apos;s Create Something
                <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                  Amazing Together
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Ready to transform your digital presence? We&apos;d love to hear about your project and discuss how Nexus Web can help bring your vision to life.
              </motion.p>
            </div>

            {/* Contact Form */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">
                        Full Name *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300 text-white placeholder-gray-400 ${
                          validationErrors.find(e => e.field === 'name')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#FF8A00] focus:border-[#FF8A00]'
                        }`}
                        placeholder="Your full name"
                      />
                      {validationErrors.find(e => e.field === 'name') && (
                        <p className="mt-2 text-sm text-red-400">
                          {validationErrors.find(e => e.field === 'name')?.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                        Email Address *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300 text-white placeholder-gray-400 ${
                          validationErrors.find(e => e.field === 'email')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#FF8A00] focus:border-[#FF8A00]'
                        }`}
                        placeholder="your@email.com"
                      />
                      {validationErrors.find(e => e.field === 'email') && (
                        <p className="mt-2 text-sm text-red-400">
                          {validationErrors.find(e => e.field === 'email')?.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-white mb-3">
                        Phone Number
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 text-white placeholder-gray-400 focus:ring-[#FF8A00] focus:border-[#FF8A00]"
                        placeholder="+1 (868) 123-4567"
                      />
                    </div>

                    {/* Service Field */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-white mb-3">
                        Service Interest
                      </label>
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        id="service"
                        name="service"
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 text-white focus:ring-[#FF8A00] focus:border-[#FF8A00]"
                      >
                        <option value="" className="text-gray-900">Select a service</option>
                        <option value="web-development" className="text-gray-900">Web Development</option>
                        <option value="seo-marketing" className="text-gray-900">SEO & Digital Marketing</option>
                        <option value="ecommerce" className="text-gray-900">E-Commerce Solutions</option>
                        <option value="maintenance" className="text-gray-900">Website Maintenance</option>
                        <option value="consultation" className="text-gray-900">Free Consultation</option>
                      </motion.select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
                      Project Details *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300 text-white placeholder-gray-400 resize-none ${
                        validationErrors.find(e => e.field === 'message')
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-white/20 focus:ring-[#FF8A00] focus:border-[#FF8A00]'
                      }`}
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    />
                    {validationErrors.find(e => e.field === 'message') && (
                      <p className="mt-2 text-sm text-red-400">
                        {validationErrors.find(e => e.field === 'message')?.message}
                      </p>
                    )}
                  </div>

                  {/* Status Message */}
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 rounded-xl border ${
                        formStatus.type === 'success'
                          ? 'bg-green-500/10 border-green-500/20 text-green-400'
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      <div className="flex items-center">
                        {formStatus.type === 'success' ? (
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {formStatus.message}
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message
                          <motion.svg
                            className="w-6 h-6 ml-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Other Ways to Reach Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prefer to reach out directly? Here are all the ways you can get in touch with our team in Trinidad & Tobago.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
              {([
                {
                  icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Email Us",
                  info: "nexuswebtt@gmail.com",
                  description: "Send us an email anytime. We typically respond within 24 hours.",
                  link: "mailto:nexuswebtt@gmail.com",
                  isEmail: true,
                  isInstagram: false
                },
                {
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  title: "Call Us",
                  info: "+1 (868) 352-1435",
                  description: "Call us during business hours (9 AM - 6 PM AST) for immediate assistance.",
                  link: "tel:+18683521435",
                  isEmail: false,
                  isInstagram: false
                },
                {
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  title: "Visit Us",
                  info: "Trinidad & Tobago",
                  description: "Based in the beautiful twin-island nation, serving the entire Caribbean region.",
                  link: "#",
                  isEmail: false,
                  isInstagram: false
                },
                {
                  icon: "",
                  title: "Follow Us",
                  info: "@nexuswebtt",
                  description: "Follow us on Instagram for updates, behind-the-scenes content, and our latest work.",
                  link: "https://www.instagram.com/nexuswebtt/",
                  isEmail: false,
                  isInstagram: true
                }
              ] as const).map((contact, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <motion.div
                    className="group text-center p-6 md:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 min-h-[280px] flex flex-col justify-center"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      {contact.isInstagram ? (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                        </svg>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{contact.title}</h3>
                    
                    {contact.link !== "#" ? (
                      <a 
                        href={contact.link}
                        {...(contact.isInstagram ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`font-bold text-[#FF8A00] hover:text-[#FF4D00] transition-colors mb-4 block break-all ${
                          contact.isEmail 
                            ? 'text-base md:text-lg lg:text-xl leading-tight' 
                            : 'text-lg md:text-xl lg:text-2xl'
                        }`}
                      >
                        {contact.info}
                      </a>
                    ) : (
                      <div className={`font-bold text-[#FF8A00] mb-4 break-all ${
                        contact.isEmail 
                          ? 'text-base md:text-lg lg:text-xl leading-tight' 
                          : 'text-lg md:text-xl lg:text-2xl'
                      }`}>
                        {contact.info}
                      </div>
                    )}
                    
                    <p className="text-gray-600 leading-relaxed">{contact.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  )
} 