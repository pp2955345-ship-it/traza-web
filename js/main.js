/* =========================================================
   TRAZA — Script principal (versión mejorada)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header sticky con cambio de estilo ---------- */
  const header = document.querySelector('header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  const toggleMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.textContent = open ? '✕' : '☰';
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) toggleMenu(false);
    });
  }

  /* ---------- Carrusel del hero ---------- */
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.querySelector('.hero-dots');
  const bannerText = document.querySelector('.hero-banner p');
  const messages = [
    '¿Quieres gestionar de una manera ágil y sencilla los pedidos de forma rápida y reduciendo los errores de recepción?',
    'Solución integral para su empresa con el ecosistema de Microsoft',
    '20 años de experiencia en la industria alimentaria'
  ];
  let current = 0;
  let timer;

  // Crear indicadores
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.dot');

  const goTo = (i) => {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    bannerText.textContent = messages[current];
  };
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const restart = () => { clearInterval(timer); timer = setInterval(next, 6000); };

  const arrows = document.querySelectorAll('.arrow');
  if (arrows.length >= 2) {
    arrows[1].addEventListener('click', () => { next(); restart(); });
    arrows[0].addEventListener('click', () => { prev(); restart(); });
  }
  restart();

  /* ---------- Animaciones al hacer scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger')
    .forEach(el => io.observe(el));

  /* ---------- Botón volver arriba ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Formulario de contacto con validación ---------- */
  const form = document.querySelector('.contact form');
  if (form) {
    const fields = {
      nombre: form.querySelector('input[placeholder="Nombre"]'),
      email: form.querySelector('input[type="email"]'),
      priv: document.getElementById('priv')
    };

    const showError = (input, msg) => {
      const wrap = input.closest('div');
      let err = wrap.querySelector('.error');
      if (!err) { err = document.createElement('span'); err.className = 'error'; wrap.appendChild(err); }
      err.textContent = msg;
      err.style.display = 'block';
      input.style.outline = '2px solid #ff9d9d';
    };
    const clearError = (input) => {
      const wrap = input.closest('div');
      const err = wrap.querySelector('.error');
      if (err) err.style.display = 'none';
      input.style.outline = '';
    };

    ['nombre', 'email'].forEach(k => {
      fields[k].addEventListener('input', () => clearError(fields[k]));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;

      if (!fields.nombre.value.trim()) { showError(fields.nombre, 'Por favor, introduce tu nombre.'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value)) { showError(fields.email, 'Introduce un email válido.'); ok = false; }
      if (!fields.priv.checked) { alert('Debes aceptar la política de privacidad.'); ok = false; }

      if (ok) {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Enviando…';
        btn.disabled = true;
        setTimeout(() => {
          alert('¡Gracias! Tu mensaje se ha enviado correctamente. (demo)');
          form.reset();
          btn.textContent = 'Enviar';
          btn.disabled = false;
        }, 900);
      }
    });
  }
});
