import { gsap, ScrollTrigger, prefersReduced, q, qa } from '../lib/gsap';

/**
 * Seletor de unidade (usado em Planos e em Unidades): mostra o painel da unidade escolhida e
 * move a pílula amarela até o botão ativo. Sem JS, todos os painéis aparecem.
 */
export function initUnitSwitch(groupSel: string, panelAttr: string, onChange?: (unit: string) => void) {
  const group = q(groupSel);
  if (!group) return;
  const buttons = qa<HTMLButtonElement>('[data-unit]', group);
  const pill = q('[data-switch-pill]', group);
  const panels = qa(`[${panelAttr}]`);

  function placePill() {
    const active = buttons.find((b) => b.getAttribute('aria-pressed') === 'true');
    if (!active || !pill) return;
    pill.style.width = `${active.offsetWidth}px`;
    pill.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function select(unit: string, animate = true) {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.unit === unit)));
    placePill();
    panels.forEach((p) => {
      const show = p.getAttribute(panelAttr) === unit;
      p.hidden = !show;
      if (show && animate && !prefersReduced()) {
        gsap.fromTo(p, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out', clearProps: 'all' });
      }
    });
    onChange?.(unit);
    if (animate) ScrollTrigger.refresh();
  }

  buttons.forEach((b) => b.addEventListener('click', () => select(b.dataset.unit!)));
  select(buttons[0].dataset.unit!, false);

  // Recalcula a pílula quando o tamanho dos botões muda (fonte carregada, rotação, resize)
  if (pill) {
    pill.style.transition = 'none';
    placePill();
    requestAnimationFrame(() => (pill.style.transition = ''));
    new ResizeObserver(placePill).observe(group);
    document.fonts?.ready.then(placePill);
  }
}

export function initPlans() {
  initUnitSwitch('[data-unit-switch]', 'data-unit-panel');
  initUnitSwitch('[data-unit-switch-map]', 'data-unit-map');

  // Borda animada dos planos em destaque só roda quando estão na tela
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) =>
      entries.forEach((e) => e.target.classList.toggle('is-inview', e.isIntersecting))
    );
    qa('.plan--featured').forEach((el) => io.observe(el));
  }
}
