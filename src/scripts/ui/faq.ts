import { gsap, ScrollTrigger, prefersReduced, qa } from '../lib/gsap';

/** Acordeão com <details>: funciona sem JS; com JS a abertura/fechamento é animada. */
export function initFaq() {
  qa<HTMLDetailsElement>('[data-faq]').forEach((item) => {
    const summary = item.querySelector('summary');
    const body = item.querySelector<HTMLElement>('[data-faq-body]');
    if (!summary || !body) return;
    let animating = false;

    summary.addEventListener('click', (e) => {
      if (prefersReduced()) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }
      e.preventDefault();
      if (animating) return;
      animating = true;

      if (item.open) {
        gsap.to(body, {
          height: 0,
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            item.open = false;
            gsap.set(body, { clearProps: 'all' });
            animating = false;
            ScrollTrigger.refresh();
          },
        });
      } else {
        item.open = true;
        gsap.from(body, {
          height: 0,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power3.out',
          clearProps: 'all',
          onComplete: () => {
            animating = false;
            ScrollTrigger.refresh();
          },
        });
      }
    });
  });
}
