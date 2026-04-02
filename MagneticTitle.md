# MagneticTitle - Código para CodePen

## HTML

```html
<div class="magnetic-title-container">
  <h1 class="magnetic-title">
    <span class="word">
      <span class="letter">E</span><span class="letter">s</span><span class="letter">t</span><span class="letter">e</span><span class="letter">f</span><span class="letter">a</span><span class="letter">n</span><span class="letter">y</span>
    </span>
    <span class="word">
      <span class="letter">L</span><span class="letter">a</span><span class="letter">d</span><span class="letter">i</span><span class="letter">n</span><span class="letter">o</span>
    </span>
  </h1>
  <p class="subtitle">Arquitecta</p>
</div>
```

## CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;900&family=Inter:wght@300;400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #F9F6F0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}

.magnetic-title-container {
  text-align: center;
}

.magnetic-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 400;
  color: #1A1A1A;
  letter-spacing: -0.02em;
  line-height: 0.85;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35em;
}

.word {
  display: flex;
  flex-wrap: wrap;
}

.letter {
  display: inline-block;
  transition: transform 0.15s cubic-bezier(0.23, 1, 0.32, 1),
              color 0.15s ease,
              text-shadow 0.15s ease;
  cursor: default;
  will-change: transform;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(26, 26, 26, 0.4);
  margin-top: 2rem;
}
```

## JS

```javascript
const VIVID_COLORS = [
  '#FF6B6B', // Red/Pink
  '#4ECDC4', // Cyan
  '#FFE66D', // Yellow/Peach
  '#A8E6CF', // Light Green
  '#FFA07A', // Light Salmon
  '#9B59B6', // Purple
  '#87CEFA', // Light Sky Blue
];

const letters = document.querySelectorAll('.letter');

letters.forEach(el => {
  const color = VIVID_COLORS[Math.floor(Math.random() * VIVID_COLORS.length)];
  el.dataset.color = color;
  el.style.color = color;
});

const onMouseMove = ({ clientX, clientY }) => {
  letters.forEach(el => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const maxDist = 150;
    const intensity = Math.max(0, (maxDist - dist) / maxDist);

    if (intensity > 0) {
      const xPercent = (-dx * intensity * 100) / width;
      const yPercent = (-dy * intensity * 100) / height;
      const scale = 1 + intensity * 0.25;

      el.style.transform = `translate(${xPercent}%, ${yPercent}%) scale(${scale})`;
      el.style.textShadow = `0 4px 20px ${el.dataset.color}60`;
    } else {
      el.style.transform = '';
      el.style.textShadow = '';
    }
  });
};

document.addEventListener('mousemove', onMouseMove);
```

## Configuración CodePen

- **HTML**: Agregar estructura
- **CSS**: Agregar en sección CSS
- **JS**: Agregar en sección JS
- **Settings**:
  - CSS: Prefix=no
  - JS: Type=Vanilla

## Notas

- Los colores se asignan aleatoriamente al cargar
- El efecto magnético responde al movimiento del mouse
- Al acercarse a una letra, esta se mueve hacia el cursor y cambia de tamaño
- El color vivo de cada letra se mantiene durante toda la interacción
- Las transiciones son suaves gracias al cubic-bezier