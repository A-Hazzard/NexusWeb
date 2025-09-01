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
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    industry: "",
    interests: [] as string[],
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const industryOptions = [
    "E-commerce",
    "Restaurant & Food",
    "Healthcare",
    "Real Estate",
    "Education",
    "Professional Services",
    "Manufacturing",
    "Retail",
    "Technology",
    "Other"
  ];

  const interestOptions = [
    "Web Development",
    "E-commerce Solutions",
    "SEO & Marketing",
    "Mobile Apps",
    "Website Maintenance",
    "Digital Strategy",
    "Local Business Growth"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, gdprConsent: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.gdprConsent) {
      setError("Please accept the GDPR consent to continue");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'landing-page'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Subscription failed');
      }

      setIsSubmitted(true);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        industry: "",
        interests: [],
        gdprConsent: false,
      });
      
      // Reset after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription failed');
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Enhanced Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto mb-12"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to Nexus Web!</h3>
                <p className="text-gray-300">Thank you for subscribing. Check your email for our welcome message and exclusive resources.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Company and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select your industry</option>
                      {industryOptions.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 text-left">
                    What interests you most? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map(interest => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="w-4 h-4 text-[#FF8A00] bg-white/10 border-white/20 rounded focus:ring-[#FF8A00] focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleCheckboxChange}
                    required
                    className="w-5 h-5 mt-1 text-[#FF8A00] bg-white/10 border-white/20 rounded focus:ring-[#FF8A00] focus:ring-2"
                  />
                  <label htmlFor="gdprConsent" className="text-sm text-gray-300 leading-relaxed">
                    I consent to receiving marketing emails from Nexus Web. I understand that I can unsubscribe at any time and that my data will be handled in accordance with our privacy policy. *
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formData.gdprConsent}
                  className="w-full py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Subscribing...
                    </div>
                  ) : (
                    signup.buttonText
                  )}
                </motion.button>

                <p className="text-gray-400 text-sm">
                  {signup.privacyText}
                </p>
              </form>
            )}
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
