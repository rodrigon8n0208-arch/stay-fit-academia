import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReduced } from './gsap';

let lenis: Lenis | null = null;

/** Scroll suave sincronizado com o ScrollTrigger. Desligado com movimento reduzido. */
export function initLenis() {
  if (prefersReduced()) return null;
  lenis = new Lenis({ duration: 1.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = () => lenis;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function scrollToTarget(el: HTMLElement) {
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth' });
  }
}

/** Links âncora (#secao) passam pelo Lenis e movem o foco para a seção (acessibilidade). */
export function initAnchors() {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')!;
    if (id === '#') return;
    const target = document.querySelector<HTMLElement>(id);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.pushState(null, '', id);
  });
}
