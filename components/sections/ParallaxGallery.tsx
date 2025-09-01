'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/animations/ParallaxSection'
import type { ParallaxGalleryProps, GalleryImage } from '@/lib/types/landing'

export default function ParallaxGallery({ images, className = '' }: ParallaxGalleryProps) {
  const gallery: GalleryImage[] = images ?? []

  return (
    <section className={`py-28 relative overflow-hidden ${className}`}>
      <ParallaxSection speed={0.25}>
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      </ParallaxSection>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
          {gallery.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`relative rounded-2xl overflow-hidden bg-gray-100 ${img.colSpan ? `md:col-span-${img.colSpan}` : 'md:col-span-2'} ${img.rowSpan ? `md:row-span-${img.rowSpan}` : ''}`}
            >
              <Image src={img.src} alt={img.alt} className="w-full h-full object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" placeholder="blur"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


