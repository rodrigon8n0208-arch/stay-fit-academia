import { gsap, ScrollTrigger, MQ, prefersReduced } from './lib/gsap';
import { initLenis, initAnchors, startScroll, stopScroll, scrollToTarget } from './lib/scroll';
import { initMenu } from './ui/menu';
import { initLightbox } from './ui/lightbox';
import { initFaq } from './ui/faq';
import { initPlans } from './ui/plans';
import { runPreloader, buildHeroIntro, spinBadge } from './motion/intro';
import { initHeader, initProgress, initMagnetic, initCursor } from './motion/chrome';
import {
  revealTasks,
  parallaxTasks,
  initMarquee,
  initGallery,
  initCounters,
  initModalidadesPin,
} from './motion/sections';

const root = document.documentElement;

/** Devolve o controle ao navegador entre etapas pesadas (evita tarefas longas / TBT). */
const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0));

/** Executa as tarefas em fatias de ~8ms dentro de um contexto GSAP. */
async function runSliced(tasks: (() => void)[], ctx: gsap.Context) {
  let start = performance.now();
  for (const task of tasks) {
    ctx.add(task);
    if (performance.now() - start > 8) {
      await yieldToMain();
      start = performance.now();
    }
  }
}

async function boot() {
  const reduced = prefersReduced();
  root.classList.toggle('reduce-motion', reduced);

  // Comportamentos (funcionam com ou sem animação)
  initLenis();
  initAnchors();
  initMenu();
  initLightbox();
  initFaq();
  initPlans();
  initHeader();
  initProgress();
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

  // Fontes prontas antes de dividir textos em linhas/letras (com limite de espera)
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);

  // Hero primeiro (é o que aparece quando a cortina sobe)
  const heroIntro = reduced ? null : buildHeroIntro();
  await yieldToMain();

  // Animações — só sem "reduzir movimento".
  // Revelações e parallax são criadas em fatias (uma tarefa por elemento) dentro do
  // contexto do matchMedia, para não gerar tarefas longas e ainda serem revertidas juntas.
  const mm = gsap.matchMedia();
  let slicing = Promise.resolve();
  mm.add(MQ.motion, (ctx) => {
    slicing = runSliced([...revealTasks(), ...parallaxTasks()], ctx);
  });
  await slicing;
  mm.add(MQ.motion, () => {
    const offMarquee = initMarquee();
    initGallery();
    initCounters();
    spinBadge();
    return () => offMarquee?.();
  });
  await yieldToMain();
  mm.add(`${MQ.motion} and ${MQ.desktop}`, () => initModalidadesPin());
  mm.add(`${MQ.motion} and ${MQ.finePointer}`, () => {
    const offMagnetic = initMagnetic();
    const offCursor = initCursor();
    return () => {
      offMagnetic?.();
      offCursor?.();
    };
  });

  ScrollTrigger.sort();
  root.classList.add('motion-ready');

  const hashTarget = location.hash ? document.querySelector<HTMLElement>(location.hash) : null;
  stopScroll();
  window.scrollTo(0, 0);
  await runPreloader();
  startScroll();
  heroIntro?.play();
  if (hashTarget) scrollToTarget(hashTarget);
}

// Recalcula posições depois que tudo carregou. As imagens têm width/height
// (não mudam o layout) e as fontes já foram aguardadas, então um refresh basta.
window.addEventListener('load', () => ScrollTrigger.refresh());

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
boot();
