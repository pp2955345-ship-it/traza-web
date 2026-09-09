# TRAZA — Web corporativa

Réplica de la landing page de TRAZA (Acicatech), solución integral para la industria alimentaria con el ecosistema de Microsoft.

## Estructura de carpetas

```
traza-web/
│
├── index.html              → Página principal (estructura HTML)
│
├── css/
│   └── styles.css          → Todos los estilos (variables de color, secciones, responsive)
│
├── js/
│   └── main.js             → Interactividad (menú móvil, carrusel hero, formulario)
│
└── assets/
    ├── images/             → Imágenes (hero, fotos de tarjetas, noticias, logos)
    ├── icons/              → Iconos / SVGs
    └── fonts/              → Tipografías locales (si no se usan fuentes del sistema)
```

## Cómo abrir

Abre `index.html` directamente en el navegador, o sirve la carpeta con un servidor local:

```bash
# con Python
python -m http.server 8000
# luego visita http://localhost:8000
```

## Paleta de colores

| Variable      | Valor     | Uso                          |
|---------------|-----------|------------------------------|
| `--lime`      | `#A8C545` | Header, secciones, botones   |
| `--lime-dark` | `#8FAE35` | Acentos, iconos              |
| `--teal`      | `#3D5A5B` | Tarjetas, contacto, barras   |
| `--teal-2`    | `#2F4849` | Barra final                  |
| `--gray`      | `#6b6b6b` | Texto secundario            |

## Características (versión mejorada)

- **Carrusel hero** con slides, flechas, indicadores y autoplay.
- **Header sticky** que cambia de estilo al hacer scroll.
- **Animaciones de scroll** (fade-up, slide-in) con `IntersectionObserver` y respeto a `prefers-reduced-motion`.
- **Menú móvil** desplegable funcional.
- **Microinteracciones** en hover (botones, tarjetas, noticias, retos).
- **Formulario con validación** en vivo y feedback.
- **Botón volver arriba**.
- Tipografía **Inter** (Google Fonts) y paleta con variables CSS.
- **Estilo híbrido Apple × TRAZA**: minimalismo estilo Apple (bordes sutiles de 1px, botones píldora, superficies claras, sombras suaves, animaciones ≤200ms) combinado con la identidad verde lima/petróleo de TRAZA.

## Notas

- Las imágenes del hero (`assets/images/hero-*.jpg`) aún no existen; los slides tienen un degradado de respaldo. Añade las fotos reales con esos nombres para ver el carrusel con imágenes.
- El formulario de contacto es una demo (valida y muestra un aviso). Conéctalo a un backend o servicio (Formspree, etc.) cuando esté listo.
