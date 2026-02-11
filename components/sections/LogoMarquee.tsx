'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { LogoMarqueeProps, LogoMarqueeItem } from '@/lib/types/landing'

export default function LogoMarquee({ items, speed = 60, className = '' }: LogoMarqueeProps) {
  const list: LogoMarqueeItem[] = useMemo(() => items ?? [
    { label: 'Next.js', iconPath: '/logo.png' },
    { label: 'React', iconPath: '/logo.png' },
    { label: 'Three.js', iconPath: '/logo.png' },
    { label: 'Framer', iconPath: '/logo.png' },
    { label: 'Tailwind', iconPath: '/logo.png' },
  ], [items])

  const total = list.length
  const duration = (total * 200) / speed

  return (
    <section className={`py-16 ${className}`}>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration }}
        >
          {[...list, ...list].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              {item.iconPath ? (
                <Image src={item.iconPath} alt={item.label} width={32} height={32} />
              ) : null}
              <span className="text-sm font-semibold text-white">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


