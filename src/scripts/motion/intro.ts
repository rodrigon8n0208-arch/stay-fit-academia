import { gsap, ScrollTrigger, SplitText, prefersReduced, q, qa } from '../lib/gsap';

const done = () => document.documentElement.classList.add('preloader-done');

/**
 * Preloader (≤ 1,5s): símbolo PF se desenhando + barra de progresso,
 * depois a cortina vermelha sobe revelando o hero.
 * Resolve no momento em que a cortina começa a revelar a página.
 */
export function runPreloader(): Promise<void> {
  const root = q('[data-preloader]');
  if (!root || prefersReduced()) {
    done();
    return Promise.resolve();
  }

  const paths = qa<SVGPathElement>('.preloader__logo path', root);
  const curtain = q('[data-preloader-curtain]', root);
  const inner = q('.preloader__inner', root);

  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { stroke: p.getAttribute('fill') ?? '#FFFFFF', strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
  });
  gsap.set(curtain, { yPercent: 110, skewY: -4 });

  return new Promise((resolve) => {
    gsap
      .timeline({ onComplete: done })
      .to(paths, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut', stagger: 0.08 }, 0)
      .to('[data-preloader-bar]', { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
      .to(paths, { fillOpacity: 1, duration: 0.2 }, 0.5)
      .to(inner, { autoAlpha: 0, y: -16, duration: 0.25, ease: 'power2.in' }, 0.8)
      .to(curtain, { yPercent: 0, skewY: 0, duration: 0.3, ease: 'power3.in' }, 0.8)
      .set(root, { backgroundColor: 'transparent' })
      .add(resolve)
      .to(curtain, { yPercent: -110, skewY: 4, duration: 0.45, ease: 'expo.inOut' });
  });
}

/** Entrada do hero (pausada até o preloader terminar). */
export function buildHeroIntro() {
  const splits = qa('[data-hero-split]').map((el) =>
    SplitText.create(el, { type: 'words,chars', mask: 'words', aria: 'none' })
  );
  const chars = splits.flatMap((s) => s.chars);

  return gsap
    .timeline({ paused: true })
    .from(chars, { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger: 0.022 }, 0)
    // Faixa revelada com clip-path (não escala): o texto é preto, então o fundo amarelo
    // precisa "existir" para leitores de contraste mesmo antes da animação
    .fromTo('.hero .hl__bg', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'expo.inOut' }, 0.15)
    // Sem opacidade na foto: ela já conta como LCP enquanto o preloader está na tela
    .from('[data-hero-media]', { xPercent: 12, duration: 1.2, ease: 'expo.out' }, 0.05)
    .from('[data-hero-img]', { scale: 1.4, duration: 1.8, ease: 'expo.out' }, 0)
    .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08 }, 0.35)
    .from('[data-hero-badge]', { scale: 0, rotation: -120, duration: 1, ease: 'expo.out' }, 0.55)
    .from('[data-led]', { scaleX: 0, autoAlpha: 0, duration: 1.4, ease: 'expo.out', stagger: 0.15 }, 0.3);
}

/** Selo girando devagar — só enquanto o hero está na tela */
export function spinBadge() {
  const ring = q('[data-badge-ring]');
  if (!ring) return;
  const spin = gsap.to(ring, { rotation: 360, transformOrigin: '50% 50%', duration: 22, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    trigger: ring,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
  });
}
