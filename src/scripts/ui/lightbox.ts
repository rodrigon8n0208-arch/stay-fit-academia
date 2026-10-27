import { gsap, prefersReduced, q, qa } from '../lib/gsap';
import { startScroll, stopScroll } from '../lib/scroll';

/** Lightbox da galeria usando <dialog> nativo (foco e Esc gerenciados pelo navegador). */
export function initLightbox() {
  const dialog = q<HTMLDialogElement>('[data-lightbox]');
  const links = qa<HTMLAnchorElement>('[data-lightbox-index]');
  if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;

  const img = q<HTMLImageElement>('[data-lightbox-img]', dialog)!;
  const caption = q('[data-lightbox-caption]', dialog)!;
  let index = 0;

  function render() {
    const a = links[index];
    img.src = a.dataset.full!;
    img.alt = a.dataset.alt ?? '';
    caption.textContent = `${a.dataset.caption} · ${index + 1}/${links.length}`;
  }

  function show(i: number, dir: 1 | -1 | 0 = 0) {
    index = (i + links.length) % links.length;
    if (prefersReduced()) return render();
    if (dir === 0) {
      render();
      gsap.fromTo(img, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
      return;
    }
    gsap.to(img, {
      autoAlpha: 0,
      x: -50 * dir,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        render();
        gsap.fromTo(img, { x: 50 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' });
      },
    });
  }

  function close() {
    if (prefersReduced()) return dialog!.close();
    gsap.to(img, { autoAlpha: 0, scale: 0.94, duration: 0.25, ease: 'power2.in', onComplete: () => dialog!.close() });
  }

  links.forEach((a, i) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      dialog.showModal();
      stopScroll();
      show(i);
    })
  );

  q('[data-lightbox-close]', dialog)?.addEventListener('click', close);
  q('[data-lightbox-prev]', dialog)?.addEventListener('click', () => show(index - 1, -1));
  q('[data-lightbox-next]', dialog)?.addEventListener('click', () => show(index + 1, 1));

  // Clique fora da imagem fecha
  dialog.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t === dialog || t.classList.contains('lightbox__stage')) close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1, 1);
    if (e.key === 'ArrowLeft') show(index - 1, -1);
  });

  dialog.addEventListener('close', () => {
    startScroll();
    gsap.set(img, { clearProps: 'all' });
  });
}
