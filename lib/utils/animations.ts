import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MutableRefObject } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationTarget = string | Element | Element[] | NodeList | MutableRefObject<HTMLElement | null>;

const defaultEase = 'power3.out';

export const fadeInUp = (target: AnimationTarget, delay: number = 0, duration: number = 1) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
  return gsap.fromTo(
    elements,
    { 
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: defaultEase,
      clearProps: 'all',
    }
  );
};

export const fadeIn = (target: AnimationTarget, delay: number = 0, duration: number = 1) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
  return gsap.fromTo(
    elements,
    { 
      opacity: 0,
    },
    {
      opacity: 1,
      duration,
      delay,
      ease: defaultEase,
      clearProps: 'all',
    }
  );
};

export const staggerFadeInUp = (target: AnimationTarget, stagger: number = 0.2, delay: number = 0) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
  return gsap.fromTo(
    elements,
    { 
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      delay,
      ease: defaultEase,
      clearProps: 'all',
    }
  );
};

export const scaleIn = (target: AnimationTarget, delay: number = 0, duration: number = 1) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
  return gsap.fromTo(
    elements,
    { 
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: defaultEase,
      clearProps: 'all',
    }
  );
};

export const scrollReveal = (target: AnimationTarget) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
  return gsap.fromTo(
    elements,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: defaultEase,
      scrollTrigger: {
        trigger: elements as Element | Element[],
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      clearProps: 'all',
    }
  );
};

export const scrollRevealScale = (target: AnimationTarget) => {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
  return gsap.fromTo(
    elements,
    {
      scale: 0.9,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: defaultEase,
      scrollTrigger: {
        trigger: elements as Element | Element[],
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      clearProps: 'all',
    }
  );
};

export const initPageAnimations = (containerRef: React.RefObject<HTMLElement | null>) => {
  // Clear any existing ScrollTriggers to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  const ctx = gsap.context(() => {
    // Hero/Header Animations
    const heroElements = gsap.utils.toArray([
      '.hero-title',
      '.hero-description',
      '.hero-cta',
      '.header-content'
    ]);

    gsap.from(heroElements, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      clearProps: 'all'
    });

    // Feature Cards Animation
    gsap.from('.feature-card', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.feature-card',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      clearProps: 'all'
    });

    // Timeline Animation
    if (document.querySelector('.timeline-line')) {
      gsap.from('.timeline-line', {
        scaleY: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-line',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });

      // Timeline Items
      const timelineItems = gsap.utils.toArray<Element>('.timeline-item')
      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? 50 : -50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          clearProps: 'all'
        });
      });
    }

    // Testimonials Animation
    gsap.from('.testimonial-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.testimonial-card',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      clearProps: 'all'
    });

    // CTA Section Animation
    gsap.from('.cta-section', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      clearProps: 'all'
    });
  }, containerRef);

  // Return cleanup function
  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}; 