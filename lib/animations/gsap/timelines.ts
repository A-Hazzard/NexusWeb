"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export class GSAPTimelines {
  private static instance: GSAPTimelines;

  private constructor() {}

  static getInstance(): GSAPTimelines {
    if (!GSAPTimelines.instance) {
      GSAPTimelines.instance = new GSAPTimelines();
    }
    return GSAPTimelines.instance;
  }

  /**
   * Creates a card flip animation timeline
   */
  createCardFlipTimeline(frontElement: Element, backElement: Element): gsap.core.Timeline {
    const tl = gsap.timeline({ paused: true });

    tl.to(frontElement, {
      rotationY: -90,
      duration: 0.3,
      ease: "power2.inOut",
    })
      .set(backElement, { rotationY: 90 })
      .to(backElement, {
        rotationY: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, "-=0.1");

    return tl;
  }

  /**
   * Creates a staggered entrance animation
   */
  createStaggeredEntrance(elements: Element[], delay: number = 0.1): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.fromTo(elements, {
      y: 60,
      opacity: 0,
      scale: 0.8,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: delay,
    });

    return tl;
  }

  /**
   * Creates a hero entrance animation
   */
  createHeroEntrance(titleElement: Element, subtitleElement: Element, descriptionElement: Element, ctaElement: Element): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.fromTo(subtitleElement, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .fromTo(titleElement, {
        y: 50,
        opacity: 0,
        scale: 0.9,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6")
      .fromTo(descriptionElement, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .fromTo(ctaElement, {
        y: 30,
        opacity: 0,
        scale: 0.9,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4");

    return tl;
  }

  /**
   * Creates a morphing shape animation
   */
  createMorphingShape(element: Element): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(element, {
      scale: 1.2,
      rotation: 45,
      borderRadius: "50%",
      duration: 3,
      ease: "power2.inOut",
    })
      .to(element, {
        scale: 0.8,
        rotation: 90,
        borderRadius: "20%",
        duration: 3,
        ease: "power2.inOut",
      })
      .to(element, {
        scale: 1,
        rotation: 0,
        borderRadius: "25%",
        duration: 3,
        ease: "power2.inOut",
      });

    return tl;
  }

  /**
   * Creates a floating animation
   */
  createFloatingAnimation(element: Element, intensity: number = 20): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(element, {
      y: -intensity,
      rotation: 5,
      duration: 2 + Math.random() * 2,
      ease: "power2.inOut",
    })
      .to(element, {
        x: intensity / 2,
        rotation: -5,
        duration: 2 + Math.random() * 2,
        ease: "power2.inOut",
      })
      .to(element, {
        y: intensity,
        x: -intensity / 2,
        rotation: 2,
        duration: 2 + Math.random() * 2,
        ease: "power2.inOut",
      });

    return tl;
  }

  /**
   * Creates a text reveal animation with split characters
   */
  createTextReveal(element: Element): gsap.core.Timeline {
    const text = element.textContent || "";
    const chars = text.split("").map(char => `<span class="char">${char}</span>`).join("");
    element.innerHTML = chars;

    const charElements = element.querySelectorAll(".char");
    const tl = gsap.timeline();

    tl.fromTo(charElements, {
      y: 100,
      opacity: 0,
      rotationX: -90,
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.02,
    });

    return tl;
  }

  /**
   * Creates a scroll-triggered parallax effect
   */
  createScrollParallax(element: Element, speed: number = 0.5): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const yPos = -(self.progress * speed * 100);
        gsap.set(element, { y: yPos });
      },
    });
  }

  /**
   * Creates a magnetic hover effect
   */
  createMagneticHover(element: Element, strength: number = 0.3): void {
    const magnetic = element as HTMLElement;

    magnetic.addEventListener("mousemove", (e) => {
      const rect = magnetic.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(magnetic, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    magnetic.addEventListener("mouseleave", () => {
      gsap.to(magnetic, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  }

  /**
   * Clean up all animations and ScrollTriggers
   */
  cleanup(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");
  }
}

export const gsapTimelines = GSAPTimelines.getInstance();
