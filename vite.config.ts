import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// En `vite dev` usamos `/` para que http://localhost:5173/ funcione.
// En `vite build` mantenemos el subpath de GitHub Pages (renombrá si tu repo tiene otro nombre).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/Dino-Culture-Academy/',
}))