export interface CodePreviewProps {
  code: string
  /** Texto curto no cabeçalho, por exemplo o motivo de o código não ser editável. */
  status?: string
  className?: string
}

/**
 * Renderização somente leitura de um trecho de código, com numeração de linhas.
 *
 * Serve como espaço reservado enquanto o Monaco é carregado: ocupa o mesmo
 * lugar e mostra o código de imediato, sem deslocar o layout na troca.
 */
export function CodePreview({ code, status, className }: CodePreviewProps) {
  const lines = code.replace(/\r\n?/g, '\n').split('\n')
  const classes = ['code-preview', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {status && (
        <p className="code-preview__status" role="status">
          {status}
        </p>
      )}

      <pre
        className="code-preview__body"
        aria-label="Código somente para visualização"
        tabIndex={0}
      >
        <code className="code-preview__code">
          {/*
            Cada linha é um bloco, e o navegador já insere a quebra ao copiar a
            seleção. Um "\n" explícito aqui somaria a essa quebra e o código
            chegaria ao aluno com uma linha em branco entre cada linha.
          */}
          {lines.map((line, index) => (
            <span className="code-preview__line" key={`${index}-${line}`}>
              <span className="code-preview__line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-preview__line-content">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
