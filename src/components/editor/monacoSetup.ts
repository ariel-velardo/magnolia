import { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/editor/editor.worker?worker'

/**
 * Configuração do Monaco.
 *
 * Por padrão o wrapper baixa o editor de uma CDN. Aqui ele usa o pacote local,
 * então o editor faz parte do bundle e a página funciona sem depender de rede
 * para abrir o exercício — só a execução do Python precisa da CDN do Pyodide.
 */

declare global {
  interface Window {
    MonacoEnvironment?: monaco.Environment
  }
}

/** Python não usa language server no Monaco: basta o worker base do editor. */
window.MonacoEnvironment = {
  getWorker: () => new editorWorker(),
}

/**
 * Tema alinhado à identidade do Magnolia: o mesmo verde escuro de --code-surface
 * usado nos blocos de código das aulas, com destaques em vinho e sálvia.
 */
export const MAGNOLIA_EDITOR_THEME = 'magnolia-dark'

monaco.editor.defineTheme(MAGNOLIA_EDITOR_THEME, {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'e7eee8' },
    { token: 'comment', foreground: '7f9186', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'e2bdca' },
    { token: 'string', foreground: 'b9d8bf' },
    { token: 'number', foreground: 'e0bc84' },
    { token: 'identifier', foreground: 'e7eee8' },
    { token: 'delimiter', foreground: 'aab8ae' },
  ],
  colors: {
    'editor.background': '#1d2822',
    'editor.foreground': '#e7eee8',
    'editorLineNumber.foreground': '#627269',
    'editorLineNumber.activeForeground': '#cfd9d1',
    'editor.lineHighlightBackground': '#222e28',
    'editor.selectionBackground': '#3c5347',
    'editorCursor.foreground': '#e2bdca',
    'editorIndentGuide.background1': '#2b3830',
    'editorIndentGuide.activeBackground1': '#41544a',
    'editorWidget.background': '#222e28',
    'editorWidget.border': '#2d3c33',
    'scrollbarSlider.background': '#33443b80',
    'scrollbarSlider.hoverBackground': '#3f5348aa',
    'scrollbarSlider.activeBackground': '#4a6155',
  },
})

loader.config({ monaco })

/**
 * Opções pensadas para uma plataforma de estudo, não para uma IDE: sem minimapa,
 * sem dobra de código, sem régua lateral. Sobra o que ajuda a escrever Python —
 * numeração, indentação de 4 espaços e destaque de sintaxe.
 */
export const EDITOR_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  fontSize: 13,
  lineHeight: 22,
  tabSize: 4,
  insertSpaces: true,
  detectIndentation: false,
  minimap: { enabled: false },
  folding: false,
  glyphMargin: false,
  lineNumbersMinChars: 3,
  lineDecorationsWidth: 10,
  overviewRulerLanes: 0,
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  renderLineHighlight: 'line',
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  wordWrap: 'on',
  wrappingIndent: 'indent',
  padding: { top: 18, bottom: 18 },
  scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
  suggestOnTriggerCharacters: false,
  quickSuggestions: false,
  parameterHints: { enabled: false },
  contextmenu: true,
  roundedSelection: false,
  fixedOverflowWidgets: true,
}
