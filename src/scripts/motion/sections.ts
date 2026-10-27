import { gsap, ScrollTrigger, SplitText, q, qa } from '../lib/gsap';

const onEnter = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true });

type Task = () => void;

/**
 * Títulos em linhas subindo + faixa vermelha varrendo; parágrafos em linhas; elementos simples subindo.
 * Retorna uma tarefa por elemento para o main.ts executar em fatias (sem tarefas longas).
 */
export function revealTasks(): Task[] {
  const tasks: Task[] = [];
  // Divisão só em linhas mantém as palavras inteiras e legíveis para leitores de tela,
  // então não é preciso aria-label (proibido em <p>).
  qa('[data-reveal-title]').forEach((title) => tasks.push(() => {
    SplitText.create(title, {
      type: 'lines',
      mask: 'lines',
      aria: 'none',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: onEnter(title),
        }),
    });
    const hl = qa('.hl__bg', title);
    if (hl.length)
      gsap.fromTo(
        hl,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'expo.inOut', delay: 0.35, scrollTrigger: onEnter(title) }
      );
  }));

  qa('[data-reveal-lines]').forEach((p) => tasks.push(() => {
    SplitText.create(p, {
      type: 'lines',
      mask: 'lines',
      aria: 'none',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 100,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: onEnter(p),
        }),
    });
  }));

  tasks.push(() =>
    qa('[data-reveal]').forEach((el) =>
      gsap.from(el, { autoAlpha: 0, y: 28, duration: 0.8, scrollTrigger: onEnter(el) })
    )
  );

  // Imagens e mapa revelados com clip-path diagonal
  qa('[data-clip-reveal]').forEach((el) => tasks.push(() => {
    gsap.fromTo(
      el,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.3,
        ease: 'expo.inOut',
        clearProps: 'clipPath',
        scrollTrigger: onEnter(el, 'top 80%'),
      }
    );
  }));

  // Listas/cards em stagger
  qa('[data-stagger]').forEach((list) => tasks.push(() => {
    const items = qa('[data-stagger-item]', list);
    gsap.from(items, { autoAlpha: 0, y: 48, duration: 0.9, ease: 'expo.out', stagger: 0.08, scrollTrigger: onEnter(list) });
  }));

  // Destaques (números) usam stagger próprio, fora de [data-stagger]
  const destaques = qa('.destaque');
  if (destaques.length)
    tasks.push(() =>
      gsap.from(destaques, {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: onEnter(destaques[0].parentElement!),
      })
    );

  return tasks;
}

/** Parallax genérico: data-parallax="0.2" (positivo desce mais devagar, negativo sobe). */
export function parallaxTasks(): Task[] {
  const tasks: Task[] = [];
  qa('[data-parallax]').forEach((el) => tasks.push(() => {
    const speed = Number(el.dataset.parallax);
    gsap.fromTo(
      el,
      { y: () => -speed * window.innerHeight * 0.4 },
      {
        y: () => speed * window.innerHeight * 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }));

  qa('[data-parallax-img]').forEach((img) => tasks.push(() => {
    gsap.fromTo(
      img,
      { yPercent: -12 },
      { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
  }));

  return tasks;
}

/** Marquee infinito: velocidade e inclinação reagem à velocidade do scroll. */
export function initMarquee() {
  const root = q('[data-marquee]');
  const track = q('[data-marquee-track]');
  const skewEl = q('[data-marquee-skew]');
  if (!root || !track || !skewEl) return;

  // Começa pausado: só roda enquanto a faixa está na tela
  const loop = gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1, paused: true });
  const skewTo = gsap.quickTo(skewEl, 'skewX', { duration: 0.4, ease: 'power3.out' });
  let velocity = 0;
  let active = false;

  // A velocidade do scroll decai suavemente a cada frame
  const tick = () => {
    if (!active) return;
    velocity *= 0.9;
    loop.timeScale(1 + gsap.utils.clamp(0, 6, Math.abs(velocity) / 300));
    skewTo(gsap.utils.clamp(-14, 14, velocity / -120));
  };
  gsap.ticker.add(tick);

  ScrollTrigger.create({
    trigger: root,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      active = self.isActive;
      active ? loop.play() : loop.pause();
    },
    onUpdate: (self) => (velocity = self.getVelocity()),
  });

  return () => gsap.ticker.remove(tick);
}

/** Galeria bento: fotos entram com escala + leve rotação. */
export function initGallery() {
  const items = qa('[data-gallery-item]');
  if (!items.length) return;
  gsap.set(items, { autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, scale: 0.86, rotation: (i) => (i % 2 ? 3 : -3) },
        { autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }
      ),
  });
}

/** Contadores animados. O HTML já traz o valor final (sem JS mostra certo). */
export function initCounters() {
  qa('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      scrollTrigger: onEnter(el, 'top 90%'),
    });
  });
}

/** Modalidades no desktop: seção fixada e cards passando na horizontal. */
export function initModalidadesPin() {
  const pin = q('[data-mods-pin]');
  const viewport = q('[data-mods-viewport]');
  const track = q('[data-mods-track]');
  if (!pin || !viewport || !track) return;

  const distance = () => {
    const cs = getComputedStyle(viewport);
    const inner = viewport.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    return Math.max(0, track.scrollWidth - inner);
  };
  if (distance() <= 0) return;

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      refreshPriority: 1,
    },
  });

  // Cada card ganha um leve zoom/rotação conforme atravessa a tela
  qa('[data-mod]', track).forEach((card) => {
    const media = q('.mod__media > :first-child', card);
    gsap.fromTo(
      card,
      { rotation: 2.5, yPercent: 6 },
      {
        rotation: 0,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'left 55%', scrub: true },
      }
    );
    if (media)
      gsap.fromTo(
        media,
        { scale: 1.25 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        }
      );
  });
}
