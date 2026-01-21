# EspañolHub

Tu centro inteligente para aprender español.

Sitio oficial: https://espanolhub.com

## Características Principales

- **Alfabeto**: Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos
- **Números**: Domina los números del 0 al 1000+ con pronunciación correcta
- **Lectura**: Mejora tu comprensión lectora con textos graduados y ejercicios
- **Gramática**: Aprende la conjugación de verbos, cambios de género y número
- **Vocabulario**: Amplía tu vocabulario con categorías temáticas y pronunciación
- **Juegos**: Aprende divirtiéndote con juegos educativos interactivos
- **Tablas**: Consulta tablas completas imprimibles de todos los temas

## Tecnologías Utilizadas

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (para animaciones)
- **React Hook Form**
- **Zustand** (para estado)
- **Lucide React** (iconos)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Construcción

```bash
npm run build
```

## Características Técnicas

- Diseño responsive (móvil, tablet, desktop)
- Audio integrado usando Web Speech API
- Interfaz moderna y atractiva
- Navegación intuitiva
- Tablas imprimibles
- Juegos interactivos con sistema de puntuación

## Estructura del Proyecto

```
/
├── app/              # Páginas Next.js (App Router)
│   ├── alfabeto/      # Aprende el alfabeto
│   ├── numeros/       # Aprende números
│   ├── lectura/       # Lectura y comprensión
│   ├── gramatica/     # Gramática y conjugación
│   ├── vocabulario/   # Vocabulario por categorías
│   ├── juegos/        # Juegos educativos
│   └── tablas/        # Tablas educativas
├── components/        # Componentes React reutilizables
├── lib/
│   ├── data/         # Datos educativos (alfabeto, números, vocabulario, etc.)
│   └── types.ts      # Tipos TypeScript
└── public/           # Archivos estáticos
```

## Licencia

Este proyecto es de código abierto y está disponible para uso educativo.
