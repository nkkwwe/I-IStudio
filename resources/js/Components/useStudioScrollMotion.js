import { useEffect } from 'react';

// Progressive enhancement: content is always visible without animation support.
export default function useStudioScrollMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    const seen = new WeakSet();
    const selector = '.section-header, .startup-service-card, .startup-principle-card, .workflow-card, .studio-pricing-copy, .studio-pricing-image, .studio-faq-layout > div:first-child, .startup-faq, .studio-contact-heading, .startup-contact-card, .client-review-card';
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target;
        observer.unobserve(node);
        if (seen.has(node)) continue;
        seen.add(node);
        if (reducedMotion.matches || node.contains(document.activeElement)) continue;
        const photo = node.matches('.studio-pricing-image');
        const card = node.matches('.startup-service-card, .client-review-card');
        const siblings = [...node.parentElement.children].filter((child) => child.matches(selector));
        const delay = Math.min(siblings.indexOf(node), 3) * 85;
        const keyframes = photo
          ? [{ opacity: 0, clipPath: 'inset(0 0 0 24%)' }, { opacity: 1, clipPath: 'inset(0 0 0 0)' }]
          : card
            ? [{ opacity: 0, transform: 'perspective(1200px) translateY(28px) rotateX(3deg)' }, { opacity: 1, transform: 'perspective(1200px) translateY(0) rotateX(0)' }]
            : [{ opacity: 0, transform: 'translateY(20px)', clipPath: 'inset(0 0 15% 0)' }, { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' }];
        const animation = node.animate(keyframes, { duration: photo ? 1100 : 800, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      }
    }, { threshold: 0, rootMargin: '0px 0px -36px 0px' });
    root.querySelectorAll(selector).forEach((node) => observer.observe(node));
    const cancelMotion = () => {
      if (reducedMotion.matches) animations.forEach((animation) => animation.cancel());
    };
    // Keyboard focus and anchor navigation must never wait for a reveal.
    const revealFocused = (event) => {
      animations.forEach((animation) => {
        if (animation.effect?.target?.contains(event.target)) animation.cancel();
      });
    };
    reducedMotion.addEventListener('change', cancelMotion);
    root.addEventListener('focusin', revealFocused);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener('change', cancelMotion);
      root.removeEventListener('focusin', revealFocused);
    };
  }, [rootRef]);
}
