# Dino Encyclopedia

Aplicación web educativa sobre dinosaurios: enciclopedia por eras geológicas, mapa interactivo, lecturas, tienda simulada y minijuegos. Front construido con **React 18**, **TypeScript** y **Vite**.

---

## Requisitos previos

| Herramienta | Versión |
|-------------|---------|
| [Node.js](https://nodejs.org/) | **18 o superior** (`engines` en `package.json`) |
| npm | Incluido con Node (el repo usa `package-lock.json`) |

> Este proyecto **no** usa Bun como gestor principal; las dependencias se instalan con **npm**.

---

## Puesta en marcha (local)

```bash
git clone https://github.com/lichdencor/Dino-Encyclopedia.git
cd Dino-Encyclopedia
npm install
npm run dev
```

(Si el remoto es otro fork, cambiá la URL del `git clone`.)

Por defecto Vite levanta el servidor de desarrollo (el script usa `vite --host` para poder abrirlo desde otros dispositivos en la red local). La URL aparece en la consola, suele ser `http://localhost:5173`.

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | TypeScript (`tsc`) + compilación de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | ESLint |
| `npm test` | Jest |
| `npm run deploy` | Publica `dist/` con **gh-pages** (tras `predeploy` → `build`) |

---

## Cómo navegar la app (importante para quien la prueba)

### Entrar como invitado (Guest)

La mayoría de las pantallas están detrás de un **PrivateGuard**: hace falta estar **logueado** o en modo **invitado**.

1. Abrí **`/login`**.
2. Usá la opción para **entrar como invitado / Guest** (no requiere cuenta ni contraseña).
3. Desde ahí podés usar el mapa, álbum, biblioteca, minijuegos, etc.

### Rutas públicas sin login

Para probar **solo el front** sin pasar por login, estas rutas están accesibles directamente:

- **`/games`** — Hub de minijuegos (Puzzleaurus, MemoDyn).
- **`/puzzleaurus`** — Rompecabezas con varios dinosaurios y niveles de dificultad.

El resto de rutas (`/`, `/map`, `/album`, …) siguen pidiendo sesión o modo invitado.

---

## Qué incluye el proyecto (funcionalidades)

- **Landing** y navegación principal con barra de menú.
- **Mapa** y zonas por **era** (Triásico, Jurásico, Cretácico) con vistas por periodo.
- **Álbum**, **biblioteca**, **lectura** por libro, **tienda**, **billetera**, **tips**, **perfil**.
- **Minijuegos**
  - **Puzzleaurus**: puzzles por imagen, varias dificultades.
  - **MemoDyn**: memoria con cartas.
- **Progreso y logros** persistidos en **localStorage** (sin API obligatoria para el flujo principal de juego).
- **Analytics** opcional (Amplitude) mediante variables de entorno.

---

## Configuración (Vite y entorno)

### Base path (`vite.config.ts`)

En `vite.config.ts`, `base` debe coincidir con la ruta donde se publica el sitio:

```ts
base: "/Dino-Culture-Academy/",
```

Si el repositorio de GitHub Pages se llama distinto (por ejemplo `Dino-Encyclopedia`), **cambiá `base` al nombre del repo** con barras: `"/NombreDelRepo/"`. Si desplegás en la raíz de un dominio propio, podés usar `"/"`.

### Variables de entorno (opcionales)

Creá un archivo **`.env`** o **`.env.local`** en la raíz del proyecto (no lo subas con secretos a git). Prefijo **`VITE_`** para que Vite las exponga al cliente.

| Variable | Uso |
|----------|-----|
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | Configuración Firebase (`src/lib/firebaseConfig.ts`) |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Cliente Supabase (`src/lib/supabaseConfig.ts`) — en la build “solo front” el cliente real puede estar comentado; ver archivo |
| `VITE_AMPLITUDE_API_KEY` | Analytics Amplitude |
| `VITE_ENABLE_ANALYTICS` | Poné `false` para desactivar analytics (`src/config/analytics.config.ts`) |

Sin `.env`, gran parte de la UI sigue funcionando; algunas integraciones quedarán vacías o deshabilitadas.

### Auth contra servidor (Railway)

En `src/services/auth.service.ts`, las llamadas al backend de autenticación pueden estar **comentadas** para una demo solo front. Para reactivar login/registro contra API, descomentá **`API_URL`** y los bloques `fetch` en cada método (está documentado en el propio archivo).

---

## Despliegue en GitHub Pages

1. Alineá **`base`** en `vite.config.ts` con el nombre del repositorio.
2. En `package.json` ya existen `predeploy` y `deploy` (gh-pages).
3. Ejecutá:

```bash
npm run deploy
```

4. En GitHub: **Settings → Pages → Source**: rama `gh-pages` (o la que use tu flujo).

---

## Estructura del código (resumen)

```
src/
├── App.tsx, AppRouter.tsx   # Raíz y rutas
├── components/              # UI reutilizable (Nav, puzzles, XRay, etc.)
├── context/                 # Auth, progreso, puzzle, analytics, …
├── pages/public/            # Pantallas públicas (mapa, eras, juegos, …)
├── pages/private/           # Rutas privadas / admin (p. ej. uploader)
├── services/                # Auth, analytics, tips, progreso
├── guard/                   # PrivateGuard, PublicGuard
└── hooks/
```

---

## Contribuciones

Pull requests bien acotados por feature o corrección; conviene describir el cambio y cómo probarlo.

---

## Licencia

Privado / académico según corresponda al repositorio — actualizá esta sección si publicás el proyecto con una licencia abierta.
