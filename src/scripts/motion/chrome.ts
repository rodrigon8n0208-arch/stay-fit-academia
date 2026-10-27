import { gsap, ScrollTrigger, q, qa } from '../lib/gsap';

/** Header: some ao rolar para baixo, volta ao subir; ganha fundo após o topo. */
export function initHeader() {
  const header = q('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const y = self.scroll();
      header.classList.toggle('is-scrolled', y > 40);
      if (self.direction === 1 && y > 240) header.classList.add('is-hidden');
      else if (self.direction === -1) header.classList.remove('is-hidden');
    },
  });
}

/** Barra de progresso de rolagem no topo. */
export function initProgress() {
  const bar = q('[data-progress]');
  if (!bar) return;
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

/** Botões magnéticos: seguem levemente o mouse (desktop). */
export function initMagnetic() {
  const cleanups: (() => void)[] = [];
  qa('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magneticStrength ?? 0.3);
    const inner = q('.btn__inner', el);
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' });
    const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo?.(dx * strength * 0.4);
      iyTo?.(dy * strength * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
      ixTo?.(0);
      iyTo?.(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Cursor customizado sutil: cresce sobre links e botões. */
export function initCursor() {
  const cursor = q('[data-cursor]');
  const dot = q('[data-cursor-dot]');
  const ring = q('[data-cursor-ring]');
  if (!cursor || !dot || !ring) return;

  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
  const interactive = 'a, button, summary, [role="tab"], iframe, [data-magnetic]';

  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
    cursor.classList.remove('is-hidden');
  };
  const over = (e: PointerEvent) => cursor.classList.toggle('is-hover', !!(e.target as Element).closest(interactive));
  const out = () => cursor.classList.add('is-hidden');

  window.addEventListener('pointermove', move);
  document.addEventListener('pointerover', over);
  document.documentElement.addEventListener('pointerleave', out);
  return () => {
    window.removeEventListener('pointermove', move);
    document.removeEventListener('pointerover', over);
    document.documentElement.removeEventListener('pointerleave', out);
  };
}
