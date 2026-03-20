# Estefany Ladino - Portafolio de Arquitectura

Este proyecto es un portafolio web minimalista y elegante para la arquitecta Estefany Ladino. Está diseñado con un enfoque visual en la transición entre planos técnicos (estilo AutoCAD) y resultados finales (renders). Todo el sitio respira una estética "Midsommar": tonos crema, blancos, verdes pálidos, con un contraste sutil y tipografías muy limpias.

## Stack Tecnológico

- **React (Vite)** para la estructura y lógica de la interfaz.
- **Tailwind CSS** para los estilos globales y utilitarios.
- **GSAP** para animaciones precisas y control de scroll (ScrollTrigger).

## Funcionalidades Principales

- **Animación Hero**: Transición fluida inicial que introduce a la arquitecta y su entorno.
- **Galería de Proyectos**: Interacción con scroll y hover donde la imagen muta orgánicamente de un plano tipo blueprint a un render fotorrealista.
- **Sección de Proceso**: Entrada secuencial y suave mediante triggers de scroll.

## Instalación y Ejecución Local

Para comenzar el desarrollo local, asegúrese de tener Node.js instalado.

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible por defecto en `http://localhost:5173`.

## Despliegue en Vercel

Este proyecto está optimizado con Vite y funciona "out-of-the-box" en plataformas como Vercel. 

1. Conecta el repositorio de GitHub a tu cuenta de Vercel.
2. Vercel detectará automáticamente que es un proyecto Vite.
3. Importa y despliega. No se requiere configuración especializada adicional.
