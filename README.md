# CineReel

Rediseño y reimplementación en React de una app de descubrimiento de películas basada en la
API de **TMDB (The Movie Database)**. Proyecto hecho para la evaluación final de
*Desarrollo de Interfaces 2*.

## Qué incluye

- **Inicio de sesión** (`src/components/Login.jsx`): pantalla de acceso con validación de
  formulario. Es una autenticación simulada (sin backend), suficiente para el alcance del
  prototipo — cualquier usuario/contraseña no vacíos entran.
- **Página principal** (`src/components/Home.jsx`): grilla de películas populares de TMDB,
  con buscador (con debounce), tabs de "Populares", "Favoritas" y "Reservas", estados de
  carga (skeleton), error y vacío.
- **Agregar / quitar de favoritos**: cada tarjeta de película tiene un botón de corazón que
  suma o quita la película de tu lista de favoritas (`src/context/FavoritesContext.jsx`),
  persistida en `localStorage` con `useReducer` + `useContext`.
- **Reservar entradas + dulcería**: el botón "Reservar" de cada tarjeta abre un modal
  (`src/components/BookingModal.jsx`) donde eliges función (horario), número de asientos y
  alimentos (palomitas, gaseosas, nachos, combos) con su cantidad. El total se calcula en
  vivo. Al confirmar, la reserva se guarda con `useReducer` + `useContext`
  (`src/context/BookingContext.jsx`), persistida en `localStorage`.
- **Pestaña "Reservas"** (`src/components/ReservationsList.jsx`): lista todas tus reservas
  con función, asientos, alimentos y total. Desde ahí puedes **quitar un alimento puntual**
  (recalcula el total al instante) o **cancelar la reserva completa**.
- **Sesión persistente**: `src/context/AuthContext.jsx` guarda la sesión en `localStorage`.
- **Optimización**: `MovieCard` envuelto en `React.memo`, callbacks estabilizados con
  `useCallback`, valores derivados con `useMemo`, y debounce en la búsqueda para no golpear
  la API en cada tecla.
- **Pruebas unitarias**: `src/context/FavoritesContext.test.jsx` y
  `src/context/BookingContext.test.jsx` prueban la lógica de favoritos y de reservas
  (agregar, quitar alimento, cancelar) con Vitest + Testing Library.

## Cómo correrlo

```bash
npm install
cp .env.example .env
# pega tu API key de TMDB en .env (ver instrucciones dentro del archivo)
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

### Otros comandos

```bash
npm run build     # build de producción a /dist
npm run preview   # sirve el build de producción localmente
npm test          # corre las pruebas unitarias con Vitest
```

## Decisiones de diseño (Figma → React)

**Identidad visual: Dark Cinematic + Neon.** Fondo casi negro con gradientes sutiles
azul/morado, acento neon cian (`--neon`) para interacciones principales (navegación activa,
foco, botones, hover de cards) y un segundo acento neon rosa (`--neon-pink`) usado solo para
el estado activo de favoritos y las acciones de cancelar/eliminar — el neon se usa como
detalle, no como color dominante. Tipografía: **Bebas Neue** para títulos (look
cinematográfico), **Work Sans** para texto de interfaz, **JetBrains Mono** para datos
numéricos (rating, precios, año).

**Arquitectura de navegación:** el logo (esquina superior izquierda del navbar) es el único
acceso al Home cinematográfico — no existe un ítem de navegación "Inicio". Junto al logo:
Populares · Favoritos · Reservas. El Home muestra un video de fondo en loop con un buscador
central; al buscar, se navega automáticamente a "Populares" mostrando los resultados reales
de TMDB (misma lógica de búsqueda que ya existía, solo movida de lugar).

**Tus archivos (logo y video):** la interfaz ya está conectada a `public/logo.png` y
`public/videos/home-background.mp4`. Hasta que agregues esos archivos, se muestran
respaldos automáticos (un ícono neutro para el logo, un degradado oscuro para el video) para
que nada se vea roto. Instrucciones completas en `public/ASSETS.md`.

**Secciones reales de TMDB:** la vista "Populares" ahora muestra 4 secciones con datos reales
(no inventados): En cartelera (`now_playing`), Películas populares (`popular`), Mejor
valoradas (`top_rated`) y Próximamente (`upcoming`). Al buscar, estas secciones se
reemplazan por una sola sección de resultados.

**Grid responsive:** 6 columnas en pantallas grandes (≥1600px), 5 en desktop estándar
(≥1280px), 4 en tablet/desktop pequeño (≥1024px), 3 en tablet (≥768px), 2 en móvil.

## Estructura del proyecto

```
public/
  ASSETS.md          ← instrucciones para tu logo y video
  logo.png            ← agrega aquí tu logo (no incluido)
  videos/
    home-background.mp4  ← agrega aquí tu video (no incluido)
src/
  components/
    Login.jsx
    Home.jsx            ← shell principal: navbar + enrutado de vistas
    Navbar.jsx
    Logo.jsx
    CinematicHome.jsx    ← Home con video + buscador central
    BrowseMovies.jsx     ← secciones de TMDB + resultados de búsqueda
    MovieSection.jsx
    MovieGrid.jsx
    MovieCard.jsx
    SearchBar.jsx
    BookingModal.jsx
    ReservationsList.jsx
  context/
    AuthContext.jsx
    FavoritesContext.jsx
    FavoritesContext.test.jsx
    BookingContext.jsx
    BookingContext.test.jsx
  data/
    concessions.js
  utils/
    pricing.js
  services/
    tmdb.js
  App.jsx
  main.jsx
  index.css
```

## Próximos pasos sugeridos (mejoras iterativas)

- Reemplazar la autenticación simulada por un backend real (o Firebase Auth / Supabase) si el
  proyecto necesita cuentas reales.
- Agregar detalle de película (sinopsis, reparto) con `react-router` y la ruta
  `/movie/{id}` de TMDB.
- Paginación infinita en cada sección en vez de una sola página de resultados.
- Permitir editar la cantidad de asientos o alimentos de una reserva ya guardada, no solo
  quitarlos.
- Conectar el flujo de reserva a un backend real con pago y confirmación por correo.
