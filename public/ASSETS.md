# Tus archivos van aquí

La interfaz ya está preparada para usarlos automáticamente — no hay que tocar código,
solo colocar los archivos con estos nombres exactos:

## 1. Logo

Coloca tu archivo en:

```
public/logo.png
```

- Se usa en el navbar (esquina superior izquierda) y en la pantalla de login.
- Mantiene sus proporciones originales (no se deforma).
- Mientras este archivo no exista, se muestra un ícono neutro de respaldo (un pequeño
  aro tipo carrete) para que la interfaz no se vea rota — en cuanto agregues `logo.png`
  aquí, se reemplaza solo.
- Si tu logo no es `.png`, puedes usar `.svg` o `.jpg`: solo edita la línea
  `src="/logo.png"` en `src/components/Logo.jsx` con el nombre de tu archivo.

## 2. Video de fondo del Home

Coloca tu archivo en:

```
public/videos/home-background.mp4
```

- Se reproduce automáticamente en loop, sin sonido, cubriendo toda la pantalla del Home.
- Mientras este archivo no exista, se ve un degradado oscuro de respaldo (no se rompe
  nada visualmente).
- Formato recomendado: `.mp4` (H.264), duración corta (10–30s) y sin audio, para que
  cargue rápido.

## 3. (Opcional) Imagen de portada del video

```
public/home-poster.jpg
```

Se muestra como imagen fija mientras el video carga (o si el navegador no puede
reproducirlo). No es obligatoria.
