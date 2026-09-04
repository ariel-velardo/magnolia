import Editor from '@monaco-editor/react'
import { EDITOR_OPTIONS, MAGNOLIA_EDITOR_THEME } from './monacoSetup'

export interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  label: string
  readOnly?: boolean
}

/**
 * Envoltório fino do Monaco. Este é o único componente que conhece o editor;
 * quem o usa lida apenas com uma string controlada.
 *
 * Carregado sob demanda por quem o consome (React.lazy), para o Monaco não
 * entrar no bundle inicial do Dashboard e das aulas.
 */
export function CodeEditor({ value, onChange, label, readOnly = false }: CodeEditorProps) {
  return (
    <Editor
      language="python"
      theme={MAGNOLIA_EDITOR_THEME}
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? '')}
      options={{ ...EDITOR_OPTIONS, readOnly, ariaLabel: label }}
      loading={<span className="code-editor__loading">Carregando editor…</span>}
    />
  )
}

export default CodeEditor
