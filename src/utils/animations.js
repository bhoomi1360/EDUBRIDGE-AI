import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to animate elements on view mount with smooth staggered fade-in & upward translation
 */
export function useGsapStagger(containerRef, selector = '.gsap-reveal', options = {}) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options.y || 24,
          scale: options.scale || 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.6,
          stagger: options.stagger !== undefined ? options.stagger : 0.08,
          ease: options.ease || 'power3.out',
          delay: options.delay || 0.05,
          clearProps: 'transform,opacity',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, options.triggerDep]);
}

/**
 * Hook to animate metric counter roll-up from 0 to end value
 */
export function useGsapCounter(value, duration = 1.2) {
  const countRef = useRef(null);
  const targetVal = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    if (!countRef.current) return;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: targetVal,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.round(obj.val).toString();
        }
      },
    });

    return () => tween.kill();
  }, [targetVal, duration]);

  return countRef;
}

/**
 * GSAP Quick Modal Reveal
 */
export function animateModalOpen(modalElement) {
  if (!modalElement) return;
  return gsap.fromTo(
    modalElement,
    { opacity: 0, scale: 0.92, y: 16 },
    { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
  );
}

/**
 * ScrollTrigger batch reveal for long lists
 */
export function animateScrollTriggerBatch(containerRef, selector = '.scroll-card') {
  if (!containerRef?.current) return;

  const elements = containerRef.current.querySelectorAll(selector);
  if (!elements || elements.length === 0) return;

  const ctx = gsap.context(() => {
    ScrollTrigger.batch(elements, {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }
        ),
      start: 'top 92%',
      once: true,
    });
  }, containerRef);

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
