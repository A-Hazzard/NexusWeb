"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { initPageAnimations } from "@/lib/utils/animations";
import ParallaxSection from "@/components/animations/ParallaxSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    slug: string;
}

interface PublicBlogListProps {
    posts: BlogPost[];
}

// Comprehensive recursive HTML decoder
const decodeHTMLEntities = (text: string): string => {
    if (!text) return '';
    const entities: { [key: string]: string } = {
        '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ',
        '&ldquo;': '"', '&rdquo;': '"', '&lsquo;': "'", '&rsquo;': "'", '&ndash;': '-', '&mdash;': '—'
    };
    const decoded = text.replace(/&[a-z0-9#]+;/gi, (match) => entities[match.toLowerCase()] || match);
    if (decoded !== text && decoded.includes('&')) {
        return decodeHTMLEntities(decoded);
    }
    return decoded;
};

export default function PublicBlogList({ posts }: PublicBlogListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const cleanup = initPageAnimations(containerRef);
        return cleanup;
    }, []);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(posts.map(post => post.category).filter(Boolean));
        return ["All", ...Array.from(cats)];
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        if (activeCategory === "All") return posts;
        return posts.filter(post => post.category === activeCategory);
    }, [posts, activeCategory]);

    return (
        <main ref={containerRef} className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
                <ParallaxSection speed={0.5}>
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl"></div>
                    </div>
                </ParallaxSection>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <ScrollReveal>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 mb-8"
                        >
                            <span className="text-blue-400 font-semibold text-lg">
                                📚 Knowledge Hub
                            </span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                            Latest Insights & <br />
                            <span className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-transparent bg-clip-text">
                                Tech Trends
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Expert articles on web development, digital marketing, and business growth strategies for the Caribbean market.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat, index) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? "bg-[#FF8A00] text-white shadow-lg scale-105"
                                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-[#FF8A00]"
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {filteredPosts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20"
                            >
                                <h3 className="text-2xl font-semibold text-gray-700">No posts found.</h3>
                                <p className="text-gray-500 mt-2">Try selecting a different category.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredPosts.map((post, index) => (
                                    <ScrollReveal key={post.id} delay={index * 0.1}>
                                        <Link href={`/blogs/${post.slug}`} className="group block h-full">
                                            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
                                                <div className="relative h-64 overflow-hidden">
                                                    <Image
                                                        src={post.image || "https://picsum.photos/800/600?random=1"} // Fallback
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-semibold text-[#FF8A00] shadow-sm">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-8 flex-1 flex flex-col">
                                                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x4">
                                                        <span className="flex items-center mr-4">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                            {post.date}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FF8A00] transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h2>
                                                    <div
                                                        className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed prose prose-sm prose-orange"
                                                        dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(post.excerpt) }}
                                                    />

                                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] flex items-center justify-center text-white text-xs font-bold mr-3">
                                                                {post.author?.charAt(0) || "A"}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">{post.author}</span>
                                                        </div>
                                                        <span className="text-[#FF8A00] font-semibold group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                                                            Read Article <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
