import { AppLink } from '../components/common/AppLink'
import { Brand } from '../components/common/Brand'
import { Icon } from '../components/common/Icon'

export function NotFoundPage() {
  return (
    <section className="not-found container">
      <Brand compact />
      <p className="eyebrow">Erro 404</p>
      <h1>Este caminho ainda não floresceu.</h1>
      <p>
        O conteúdo pode ter mudado de endereço ou ainda não faz parte do percurso
        atual do Magnolia.
      </p>
      <AppLink className="button button--primary" to="/">
        Voltar ao Dashboard
        <Icon name="arrow-right" size={18} />
      </AppLink>
    </section>
  )
}
