export interface CodePreviewProps {
  code: string
  filename?: string
  language?: string
  className?: string
}

export function CodePreview({
  code,
  filename,
  language,
  className,
}: CodePreviewProps) {
  const lines = code.replace(/\r\n?/g, '\n').split('\n')
  const classes = ['code-preview', className].filter(Boolean).join(' ')

  return (
    <figure className={classes}>
      <figcaption className="code-preview__header">
        <span className="code-preview__title">Prévia de código</span>
        <span className="code-preview__status">Não executável</span>
        {(filename || language) && (
          <span className="code-preview__metadata">
            {filename && (
              <span className="code-preview__filename">{filename}</span>
            )}
            {language && (
              <span className="code-preview__language">{language}</span>
            )}
          </span>
        )}
      </figcaption>

      <pre
        className="code-preview__body"
        aria-label="Código somente para visualização"
        tabIndex={0}
      >
        <code className="code-preview__code">
          {/*
            Cada linha é um bloco, e o navegador já insere a quebra ao copiar a
            seleção. Um "\n" explícito aqui somaria a essa quebra e o starter
            code chegaria ao aluno com uma linha em branco entre cada linha.
          */}
          {lines.map((line, index) => (
            <span className="code-preview__line" key={`${index}-${line}`}>
              <span className="code-preview__line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-preview__line-content">
                {line || ' '}
              </span>
            </span>
          ))}
        </code>
      </pre>

      <p className="code-preview__note" role="note">
        Próxima etapa: este espaço receberá um editor interativo com execução de
        Python no navegador.
      </p>
    </figure>
  )
}
