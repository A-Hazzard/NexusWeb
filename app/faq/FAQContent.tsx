"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

type FAQCategory = {
  id: string;
  title: string;
  icon: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

const faqCategories: FAQCategory[] = [
  {
    id: "general",
    title: "General Questions",
    icon: "❓",
    faqs: [
      {
        question: "What services does Nexus Web offer?",
        answer: "We offer comprehensive web development services including custom website design, e-commerce solutions, SEO optimization, website maintenance, and digital marketing. We specialize in serving businesses in Trinidad & Tobago and the wider Caribbean region."
      },
      {
        question: "How long does it take to build a website?",
        answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex e-commerce sites can take 6-8 weeks. We'll provide a detailed timeline during our initial consultation."
      },
      {
        question: "Do you work with businesses outside Trinidad & Tobago?",
        answer: "Yes! While we specialize in the Caribbean market, we work with businesses worldwide. Our expertise in local markets gives us unique insights that benefit all our clients."
      },
      {
        question: "What makes Nexus Web different from other web agencies?",
        answer: "Our deep understanding of Caribbean business culture, proven track record with 100+ successful projects, modern technology stack, and commitment to ongoing support set us apart. We're not just developers - we're your digital growth partners."
      },
      {
        question: "Do you provide ongoing support after launch?",
        answer: "Absolutely! We offer 24/7 technical support, regular updates, security monitoring, and maintenance packages to ensure your website continues performing optimally."
      }
    ]
  },
  {
    id: "pricing",
    title: "Pricing & Payment",
    icon: "💰",
    faqs: [
      {
        question: "What are your pricing plans?",
        answer: "We offer transparent pricing with three main tiers: Starter ($999), Professional ($1,999), and Enterprise ($3,999). Each plan includes different features and support levels. Custom solutions are also available."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes! We offer flexible payment plans with 50% upfront and the remainder upon completion. We also accept monthly payments for ongoing services."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees! Our pricing is completely transparent. The price you see is exactly what you pay. We'll clearly outline all costs during our initial consultation."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, bank transfers, and local payment methods. All payments are processed securely through Stripe."
      },
      {
        question: "Do you offer discounts for non-profits or startups?",
        answer: "Yes! We offer special pricing for non-profit organizations, startups, and small businesses. Contact us to discuss your specific needs and budget."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Questions",
    icon: "⚙️",
    faqs: [
      {
        question: "What technologies do you use?",
        answer: "We use modern, industry-standard technologies including React, Next.js, TypeScript, Tailwind CSS, and more. We choose the best technology stack for each project's specific needs."
      },
      {
        question: "Will my website be mobile-friendly?",
        answer: "Absolutely! All our websites are built with a mobile-first approach. With 80% of Caribbean users browsing on mobile, we ensure your site looks perfect on every device."
      },
      {
        question: "How fast will my website load?",
        answer: "We optimize all websites for speed, typically achieving 90+ Lighthouse scores. Fast loading times are crucial for user experience and SEO rankings."
      },
      {
        question: "Do you provide hosting services?",
        answer: "Yes! We offer reliable hosting with 99.9% uptime guarantee, SSL certificates, daily backups, and security monitoring. We can also work with your existing hosting provider."
      },
      {
        question: "What about SEO optimization?",
        answer: "All our websites include basic SEO optimization. We also offer comprehensive SEO services including keyword research, content optimization, and ongoing SEO management."
      }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    icon: "🛒",
    faqs: [
      {
        question: "Can you build an online store?",
        answer: "Yes! We specialize in e-commerce development using platforms like Shopify, WooCommerce, and custom solutions. We'll recommend the best platform for your business needs."
      },
      {
        question: "What payment gateways do you integrate?",
        answer: "We integrate with all major payment gateways including Stripe, PayPal, Square, and local Caribbean payment processors. We'll set up the payment methods your customers prefer."
      },
      {
        question: "How do you handle inventory management?",
        answer: "We implement robust inventory management systems that sync with your physical stock, track sales, and provide low-stock alerts. You can manage everything from one dashboard."
      },
      {
        question: "Can customers order online and pick up in store?",
        answer: "Yes! We can implement click-and-collect functionality, allowing customers to order online and pick up at your physical location. This is especially popular in the Caribbean market."
      },
      {
        question: "Do you provide training for managing the online store?",
        answer: "Absolutely! We provide comprehensive training for you and your team on how to manage products, process orders, handle customer service, and use all e-commerce features."
      }
    ]
  },
  {
    id: "support",
    title: "Support & Maintenance",
    icon: "🛠️",
    faqs: [
      {
        question: "What kind of support do you provide?",
        answer: "We offer 24/7 technical support, regular maintenance updates, security monitoring, performance optimization, and content updates. We're always here when you need us."
      },
      {
        question: "How quickly do you respond to support requests?",
        answer: "We typically respond to urgent issues within 2-4 hours, and non-urgent requests within 24 hours. Premium support clients get even faster response times."
      },
      {
        question: "Do you provide content updates?",
        answer: "Yes! We can help with content updates, image changes, text modifications, and adding new pages. We offer both one-time updates and ongoing content management packages."
      },
      {
        question: "What happens if my website goes down?",
        answer: "We monitor all websites 24/7 and are immediately notified of any issues. Our team works quickly to restore service, and we'll keep you updated throughout the process."
      },
      {
        question: "Do you provide backup services?",
        answer: "Yes! We perform daily automated backups of your website and database. In case of any issues, we can quickly restore your site to a previous working state."
      }
    ]
  },
  {
    id: "seo",
    title: "SEO & Marketing",
    icon: "📈",
    faqs: [
      {
        question: "How long does it take to see SEO results?",
        answer: "SEO is a long-term strategy. You may see initial improvements in 4-8 weeks, but significant results typically take 3-6 months. We provide regular reports to track progress."
      },
      {
        question: "Do you guarantee first page rankings?",
        answer: "While we can&apos;t guarantee specific rankings (as search engines control this), we have a proven track record of improving rankings for our clients. We focus on sustainable, long-term SEO strategies."
      },
      {
        question: "What SEO services do you include?",
        answer: "Our SEO services include keyword research, on-page optimization, technical SEO, content creation, local SEO, link building, and ongoing monitoring and reporting."
      },
      {
        question: "Do you work with Google Ads or social media ads?",
        answer: "Yes! We offer comprehensive digital marketing services including Google Ads, Facebook/Instagram ads, and other social media advertising. We can manage your entire digital marketing strategy."
      },
      {
        question: "How do you track SEO performance?",
        answer: "We use advanced analytics tools to track keyword rankings, organic traffic, conversion rates, and other key metrics. We provide monthly reports with actionable insights."
      }
    ]
  }
];

export default function FAQContent() {
  const [openFAQs, setOpenFAQs] = useState<Record<string, number | null>>({});

  const toggleFAQ = (categoryId: string, index: number) => {
    setOpenFAQs(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
            >
              <span className="text-[#FF8A00] font-semibold text-lg">
                ❓ FAQ
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Frequently Asked
              <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
                Questions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about our web development services, pricing, and support. Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
              <ScrollReveal key={category.id} delay={0.1 * categoryIndex}>
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {category.faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <button
                          onClick={() => toggleFAQ(category.id, index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <motion.svg
                            className="w-6 h-6 text-gray-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: openFAQs[category.id] === index ? 180 : 0 }}
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
                            height: openFAQs[category.id] === index ? "auto" : 0,
                            opacity: openFAQs[category.id] === index ? 1 : 0
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
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact CTA */}
          <ScrollReveal className="text-center mt-20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-8">
                Can&apos;t find the answer you&apos;re looking for? Our team is here to help. Contact us and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Contact Us
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
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 border-2 border-[#FF8A00] text-[#FF8A00] rounded-xl font-semibold transition-all duration-300 hover:bg-[#FF8A00] hover:text-white"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
