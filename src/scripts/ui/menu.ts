import { gsap, prefersReduced, q, qa } from '../lib/gsap';
import { startScroll, stopScroll } from '../lib/scroll';

/** Menu mobile em tela cheia: fundo descendo + links entrando em stagger, Esc fecha, foco preso. */
export function initMenu() {
  const btn = q<HTMLButtonElement>('[data-menu-toggle]');
  const menu = q('[data-menu]');
  const label = q('[data-menu-label]');
  const header = q('[data-header]');
  if (!btn || !menu || !label) return;

  const bg = q('[data-menu-bg]', menu);
  const links = qa('.menu__link', menu);
  const foot = q('.menu__foot', menu);
  let open = false;
  let tl: gsap.core.Timeline | null = null;

  const focusables = () => [btn, ...qa<HTMLElement>('a, button', menu)];

  function openMenu() {
    open = true;
    menu!.hidden = false;
    btn!.setAttribute('aria-expanded', 'true');
    label!.textContent = 'Fechar menu';
    header?.classList.remove('is-hidden');
    document.documentElement.style.overflow = 'hidden';
    stopScroll();

    tl?.kill();
    if (!prefersReduced()) {
      tl = gsap
        .timeline()
        .fromTo(bg, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06 }, 0.3)
        .fromTo(foot, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.55);
    }
    links[0]?.focus({ preventScroll: true });
  }

  function closeMenu(focusButton = true) {
    if (!open) return;
    open = false;
    btn!.setAttribute('aria-expanded', 'false');
    label!.textContent = 'Abrir menu';
    document.documentElement.style.overflow = '';
    startScroll();

    tl?.kill();
    const hide = () => {
      menu!.hidden = true;
    };
    if (prefersReduced()) hide();
    else
      tl = gsap
        .timeline({ onComplete: hide })
        .to([...links, foot], { autoAlpha: 0, y: -16, duration: 0.25, ease: 'power2.in', stagger: 0.02 })
        .to(bg, { yPercent: -100, duration: 0.5, ease: 'expo.inOut' }, 0.1)
        .set([...links, foot], { clearProps: 'all' });
    if (focusButton) btn!.focus({ preventScroll: true });
  }

  btn.addEventListener('click', () => (open ? closeMenu() : openMenu()));

  // Link do menu: fecha antes do scroll (o handler global de âncoras faz a rolagem)
  qa('a', menu).forEach((a) => a.addEventListener('click', () => closeMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'Tab') {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Se a tela crescer para desktop com o menu aberto, fecha
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu(false);
  });
}
