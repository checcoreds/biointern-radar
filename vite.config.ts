import { readFileSync } from 'node:fs'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Reads the site-wide block of public/_headers (the file Cloudflare Pages
 * applies in production) so `npm run preview` serves the same security
 * headers. The policy has one source of truth and can be tested locally.
 */
function siteHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  let inSiteBlock = false
  for (const line of readFileSync('public/_headers', 'utf8').split('\n')) {
    if (!line.trim()) continue
    if (!/^\s/.test(line)) {
      inSiteBlock = line.trim() === '/*'
      continue
    }
    const separator = line.indexOf(':')
    if (inSiteBlock && separator > 0)
      headers[line.slice(0, separator).trim()] = line
        .slice(separator + 1)
        .trim()
  }
  return headers
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true, headers: siteHeaders() },
  // Lightning CSS rewrites light-dark() colours into a form that browsers
  // released before 2024 also understand, so the themes work there too.
  build: { cssMinify: 'lightningcss' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    restoreMocks: true,
  },
})
