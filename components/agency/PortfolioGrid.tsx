"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsapTimelines } from "@/lib/animations/gsap/timelines";
import type { PortfolioGridProps, PortfolioItem } from "@/lib/types/agency";

export default function PortfolioGrid({ 
  items, 
  className = "", 
  showFilters = true,
  categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'design', label: 'Design' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ecommerce', label: 'E-commerce' }
  ]
}: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  useEffect(() => {
    if (gridRef.current) {
      const gridItems = gridRef.current.querySelectorAll('.portfolio-item');
      gsapTimelines.createStaggeredEntrance(Array.from(gridItems), 0.1);
    }
  }, [filteredItems]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <section className={`py-32 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden ${className}`}>
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[#FF8A00] font-semibold text-lg">
              💼 Our Portfolio
            </span>
          </motion.div>

                     <motion.h2
             className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Creative
            <span className="block mt-2 bg-gradient-to-r from-[#FF8A00] via-[#FF6B00] to-[#FF4D00] text-transparent bg-clip-text">
              Masterpieces
            </span>
          </motion.h2>

                     <motion.p
             className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our diverse portfolio of cutting-edge digital experiences and innovative solutions.
          </motion.p>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioCard
              key={`${item.id}-${selectedCategory}`}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Portfolio Card Component
function PortfolioCard({ 
  item, 
  index, 
  onClick 
}: { 
  item: PortfolioItem; 
  index: number; 
  onClick: () => void; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsapTimelines.createMagneticHover(cardRef.current, 0.2);
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`portfolio-item group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
        item.colSpan ? `md:col-span-${item.colSpan}` : ''
      } ${item.rowSpan ? `md:row-span-${item.rowSpan}` : ''}`}
      style={{ aspectRatio: item.featured ? '16/10' : '4/3' }}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay: index * 0.1,
          ease: "easeOut"
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.3 }
      }}
      whileHover={{ 
        y: -15,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-2/3 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#FF8A00] text-white text-sm font-semibold rounded-full">
            {item.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 h-1/3 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF8A00] transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {item.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{item.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF8A00]/20 to-[#FF4D00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

// Portfolio Modal Component
function PortfolioModal({ 
  item, 
  onClose 
}: { 
  item: PortfolioItem; 
  onClose: () => void; 
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          onClick={onClose}
        >
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">{item.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {item.link && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Project
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
