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
    'Desea usted acabar con sus problemas de trazabilidad y seguimiento de Lotes',
    'Posee sistemas de información integrados on-line con sus clientes y proveedores mediante protocolos EDI',
    'Quiere poder atender a su canal de ventas y sus clientes de forma rápida y reduciendo costes de estructura',
    'Necesita saber la rentabilidad de sus productos y sus clientes',
    'Realiza Prognosis Diaria, dotando de información en tiempo real de la situación de la compañía',
    'Tiene capacidad de utilizar herramientas desde los puestos de trabajo para la introducción de datos en tiempo real',
    'Gestiona de forma Intensiva la actividad de su equipo Comercial, control de sus ventas y rentabilidad de cada operación'
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

  /* ---------- Flipbox de industrias (toque en móvil) ---------- */
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) {
    document.querySelectorAll('.flip').forEach(flip => {
      flip.addEventListener('click', () => {
        const open = flip.classList.contains('flipped');
        document.querySelectorAll('.flip').forEach(f => f.classList.remove('flipped'));
        if (!open) flip.classList.add('flipped');
      });
    });
  }

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
