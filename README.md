# 🍪 Dulce Fusion - Encuesta de Brookies

Encuesta web moderna y responsiva para conocer los gustos y preferencias de potenciales clientes de **Dulce Fusion**, empresa especializada en brookies (fusión entre brownie y galleta).

## 📋 Características

- ✅ Diseño moderno y responsivo (móvil, tablet y escritorio)
- ✅ 4 campos personales: nombre, apellidos, género y edad
- ✅ 6 preguntas del producto con opciones de selección
- ✅ Barra de progreso y navegación por pasos
- ✅ Validación de campos obligatorios
- ✅ Pantalla de bienvenida con descripción del proyecto
- ✅ Mensaje de éxito tras enviar la encuesta
- ✅ Código limpio y modular (HTML5, CSS3 y JavaScript puro)

## 📁 Estructura del proyecto

```
encuesta-dulce-fusion/
├── index.html      # Estructura HTML5 de la encuesta
├── styles.css      # Estilos CSS3 modernos y responsivos
├── script.js       # Lógica de pasos, validación y envío
└── README.md       # Este archivo
```

## 🚀 Cómo usar el proyecto

### Opción 1: Abrir directamente (sin servidor)

Solo abre el archivo `index.html` en cualquier navegador moderno:

```
file:///ruta/del/proyecto/index.html
```

> ⚠️ Nota: Al abrir directamente el archivo, el botón de envío puede mostrar un error de CORS al intentar conectar con servicios externos (Formspree).

### Opción 2: Servidor local (recomendado)

Desde la carpeta del proyecto, ejecuta:

```bash
python3 -m http.server 8080
```

Luego abre en tu navegador:

```
http://localhost:8080
```

Puedes cambiar `8080` por cualquier otro puerto libre (ej. `3000`, `5000`, `5500`, `8080`, `9000`).

## 📧 Configurar el envío de correos (Formspree)

Para recibir las respuestas de la encuesta en tu correo:

1. Crea una cuenta gratuita en [Formspree.io](https://formspree.io)
2. Crea un nuevo formulario y copia su endpoint (ej. `https://formspree.io/f/xxxxxxxx`)
3. Abre el archivo `script.js`
4. Busca la línea:

   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_DE_FORMSPREE';
   ```

5. Reemplaza `TU_ID_DE_FORMSPREE` por tu ID real de Formspree
6. Guarda y vuelve a probar la encuesta

Cada vez que alguien termine la encuesta, recibirás un correo con los datos.

## 🎨 Personalizar colores

Todos los colores están definidos al inicio de `styles.css` dentro de `:root`. Modifica los códigos hexadecimales según tu marca:

```css
:root {
  --color-primary: #b04a6e;        /* Rosa dulce */
  --color-secondary: #f4a261;      /* Naranja galleta */
  --color-accent: #2a9d8f;         /* Verde menta */
  --color-bg: #fdf2f5;             /* Fondo claro */
  /* ... */
}
```

## 🌐 Desplegar en GitHub Pages (opcional)

Si subes este proyecto a GitHub, puedes activar GitHub Pages para tener una URL pública:

1. Sube los archivos a un repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En "Build and deployment", selecciona la rama `main` y la carpeta `/ (root)`
4. Guarda y espera unos minutos
5. Tu encuesta estará disponible en: `https://tuusuario.github.io/nombre-repositorio/`

## 📊 Preguntas incluidas en la encuesta

### Campos personales
1. Nombre(s)
2. Apellido(s)
3. Género
4. Edad

### Preguntas del producto
1. ¿Con qué frecuencia consumirías brookies?
2. ¿Qué tamaño de brookie prefieres?
3. ¿Qué sabores de brookie te interesan?
4. ¿Cuánto pagarías por un brookie individual?
5. ¿Dónde comprarías brookies?
6. ¿Qué valoras más en un brookie?

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, variables CSS, media queries)
- JavaScript (ES6+, fetch API)
- Google Fonts (Poppins)

## 📞 Soporte

Si necesitas ayuda para:
- Conectar el formulario con Google Forms
- Configurar el envío de correos reales
- Desplegar en GitHub Pages o Netlify/Vercel

Abre un issue en este repositorio o contacta al mantenedor.

---

**Dulce Fusion** – Endulzando momentos con los mejores brookies 🍪✨