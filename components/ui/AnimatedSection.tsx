import { motion } from 'framer-motion'
import { animations } from '@/lib/styles/theme'

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        initial: animations.fadeIn.initial,
        animate: {
          ...animations.fadeIn.animate,
          transition: { ...animations.fadeIn.transition, delay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 