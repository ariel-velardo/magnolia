/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Os testes cobrem lógica pura (normalização de saída e de erros do Python,
    // invariantes do catálogo). Nada depende de DOM, então o ambiente node basta.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
