describe('Testes na Agenda de Contatos', () => {
  const url = 'https://ebac-agenda-contatos-tan.vercel.app/'

  const preencherFormulario = (nome, email, telefone) => {
    cy.get('input[type="text"]').clear().type(nome)
    cy.get('input[type="email"]').clear().type(email)
    cy.get('input[type="tel"]').clear().type(telefone)
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.visit(url)
  })

  it('Deve adicionar um novo contato', () => {
    const nome = 'João Silva'
    const email = `joao.inclusao.${Date.now()}@teste.com`
    const telefone = '11999999999'

    preencherFormulario(nome, email, telefone)

    cy.contains('.contato', email).within(() => {
      cy.contains(nome).should('be.visible')
      cy.contains(telefone).should('be.visible')
      cy.contains(email).should('be.visible')
    })
  })

  it('Deve alterar um contato existente', () => {
    const emailOriginal = `joao.edicao.${Date.now()}@teste.com`
    preencherFormulario('Contato Para Editar', emailOriginal, '11977777777')

    cy.contains('.contato', emailOriginal).find('.edit').click()

    const nomeEditado = 'João Silva Editado'
    const emailEditado = `joao.editado.${Date.now()}@teste.com`
    const telefoneEditado = '11888888888'

    preencherFormulario(nomeEditado, emailEditado, telefoneEditado)

    cy.contains('.contato', emailEditado).within(() => {
      cy.contains(nomeEditado).should('be.visible')
      cy.contains(telefoneEditado).should('be.visible')
      cy.contains(emailEditado).should('be.visible')
    })
  })

  it('Deve remover um contato existente', () => {
    const emailRemocao = `joao.remocao.${Date.now()}@teste.com`
    preencherFormulario('Contato Para Remover', emailRemocao, '11966666666')

    cy.contains('.contato', emailRemocao).should('be.visible')
    cy.contains('.contato', emailRemocao).find('.delete').click()

    cy.contains('.contato', emailRemocao).should('not.exist')
  })
})