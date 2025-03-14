# Proyecto: Dino-Encyclopedia

Este es un proyecto de React con TypeScript, construido utilizando Bun como runtime y gestor de paquetes.

Repositorio en GitHub: [Dino-Encyclopedia](https://github.com/lichdencor/Dino-Encyclopedia)

## Instalación

Para instalar Bun, sigue las instrucciones oficiales en el siguiente enlace:
[Bun Installation](https://bun.sh/docs/installation)

### Clonar el repositorio
```sh
git clone https://github.com/lichdencor/Dino-Encyclopedia.git
cd Dino-Encyclopedia
```

### Instalar dependencias
```sh
bun install
```

### Instalar React Router (opcional, si se necesita en el proyecto)
```sh
bun install react-router-dom
```

### Ejecutar el proyecto
```sh
bun run dev
```

## Estructura del Proyecto
```
.
├── bun.lock
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.css
│   ├── AppRouter.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── ImageUploader
│   │   │   └── ImageUploader.tsx
│   │   ├── index.ts
│   │   ├── Nav
│   │   │   ├── Nav.css
│   │   │   └── Nav.tsx
│   │   └── RoutesWithNotFound
│   │       └── RoutesWithNotFound.tsx
│   ├── context
│   │   ├── Auth
│   │   │   ├── AuthContext.tsx
│   │   │   └── AuthProvider.tsx
│   │   └── index.ts
│   ├── guard
│   │   └── PrivateGuard.tsx
│   ├── hooks
│   │   ├── index.ts
│   │   └── useAuth.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── models
│   │   ├── index.ts
│   │   └── routes.model.ts
│   ├── pages
│   │   ├── index.ts
│   │   ├── private
│   │   │   └── PrivateRoutes.tsx
│   │   └── public
│   │       ├── Album
│   │       │   └── Album.tsx
│   │       ├── Cretaceous-Inferior
│   │       │   ├── Cretaceous-Inferior.css
│   │       │   └── Cretaceous-Inferior.tsx
│   │       ├── Cretaceous-Medio
│   │       │   ├── Cretaceous-Medio.css
│   │       │   └── Cretaceous-Medio.tsx
│   │       ├── Cretaceous-Superior
│   │       │   ├── Cretaceous-Superior.css
│   │       │   └── Cretaceous-Superior.tsx
│   │       ├── Encyclopedia
│   │       │   ├── Encyclopedia.css
│   │       │   └── Encyclopedia.tsx
│   │       ├── Era
│   │       │   └── Era.css
│   │       ├── Home
│   │       │   ├── Home.css
│   │       │   └── Home.tsx
│   │       ├── Jurassic-Inferior
│   │       │   ├── Jurassic-Inferior.css
│   │       │   └── Jurassic-Inferior.tsx
│   │       ├── Jurassic-Medio
│   │       │   ├── Jurassic-Medio.css
│   │       │   └── Jurassic-Medio.tsx
│   │       ├── Jurassic-Superior
│   │       │   ├── Jurassic-Superior.css
│   │       │   └── Jurassic-Superior.tsx
│   │       ├── Login
│   │       │   └── Login.tsx
│   │       ├── Map
│   │       │   ├── Map.css
│   │       │   └── Map.tsx
│   │       ├── Triassic-Inferior
│   │       │   ├── Triassic-Inferior.css
│   │       │   └── Triassic-Inferior.tsx
│   │       ├── Triassic-Medio
│   │       │   ├── Triassic-Medio.css
│   │       │   └── Triassic-Medio.tsx
│   │       └── Triassic-Superior
│   │           ├── Triassic-Superior.css
│   │           └── Triassic-Superior.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Contribuciones
Crear pull requests dependiendo del feature a crear.

