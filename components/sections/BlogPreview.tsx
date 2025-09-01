"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types/business";
import ScrollReveal from "@/components/animations/ScrollReveal";

type BlogPreviewProps = {
  posts: BlogPost[];
  categories: string[];
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export default function BlogPreview({
  posts,
  categories,
  title = "Latest Insights",
  subtitle = "From Our Blog",
  description = "Stay updated with the latest web development trends, business tips, and digital marketing insights.",
  className = "",
}: BlogPreviewProps) {
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
              📝 Blog & Insights
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

        {/* Featured Post */}
        {posts.length > 0 && (
          <ScrollReveal className="mb-16">
            <motion.div
              className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={posts[0].image}
                      alt={posts[0].title}
                      width={600}
                      height={375}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {posts[0].featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#FF8A00]/10 to-[#FF4D00]/10 text-[#FF8A00] rounded-full text-sm font-medium">
                      {posts[0].category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {posts[0].readTime} read
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {posts[0].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {posts[0].author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{posts[0].author}</p>
                        <p className="text-gray-500 text-sm">{posts[0].date}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${posts[0].slug}`}
                      className="inline-flex items-center text-[#FF8A00] font-semibold hover:text-[#FF4D00] transition-colors"
                    >
                      Read More
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
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.slice(1, 4).map((post, index) => (
            <ScrollReveal key={post.id} delay={0.1 * index}>
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00]/5 to-[#FF4D00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Post Image */}
                    <div className="relative mb-4">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                      {post.excerpt}
                    </p>

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                          {post.author.charAt(0)}
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Categories */}
        <ScrollReveal className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Popular Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gray-700 font-medium">{category}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <Link
            href="/blog"
            className="group relative bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
          >
            <span className="relative z-10">View All Posts</span>
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
