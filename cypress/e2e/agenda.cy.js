describe('Testes na Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
  })

  it('Deve adicionar um novo contato', () => {
    const nome = 'João Silva'
    const emailUnico = `joao.${Date.now()}@silva.com`
    const telefone = '11999999999'

    cy.get('input[type="text"]').type(nome)
    cy.get('input[type="email"]').type(emailUnico)
    cy.get('input[type="tel"]').type(telefone)
    cy.get('button[type="submit"]').click()

    // Localiza o card específico pelo e-mail único e valida os dados dentro dele
    cy.contains('.contato', emailUnico).within(() => {
      cy.contains(nome).should('be.visible')
      cy.contains(emailUnico).should('be.visible')
      cy.contains(telefone).should('be.visible')
    })
  })

  it('Deve alterar um contato existente', () => {
    const emailOriginal = `editar.${Date.now()}@silva.com`
    const emailEditado = `editado.${Date.now()}@silva.com`

    // Cria um contato próprio para isolar o cenário
    cy.get('input[type="text"]').type('João Silva')
    cy.get('input[type="email"]').type(emailOriginal)
    cy.get('input[type="tel"]').type('11999999999')
    cy.get('button[type="submit"]').click()

    // Localiza o card pelo e-mail original e clica no botão de editar dele
    cy.contains('.contato', emailOriginal).find('.edit').click()

    // Preenche os novos dados e salva
    cy.get('input[type="text"]').clear().type('João Silva Editado')
    cy.get('input[type="email"]').clear().type(emailEditado)
    cy.get('input[type="tel"]').clear().type('11888888888')
    cy.get('button[type="submit"]').click()

    // Confere os dados atualizados dentro do card específico
    cy.contains('.contato', emailEditado).within(() => {
      cy.contains('João Silva Editado').should('be.visible')
      cy.contains(emailEditado).should('be.visible')
      cy.contains('11888888888').should('be.visible')
    })
  })

  it('Deve remover um contato existente', () => {
    const emailRemover = `remover.${Date.now()}@silva.com`

    // Cria um contato próprio para isolar o cenário
    cy.get('input[type="text"]').type('Contato Para Remover')
    cy.get('input[type="email"]').type(emailRemover)
    cy.get('input[type="tel"]').type('11777777777')
    cy.get('button[type="submit"]').click()

    // Garante que o card foi renderizado antes da exclusão
    cy.contains('.contato', emailRemover).should('be.visible')

    // Localiza o card pelo e-mail e clica no botão de deletar dele
    cy.contains('.contato', emailRemover).find('.delete').click()

    // Confirma que o contato específico desapareceu da tela
    cy.contains('.contato', emailRemover).should('not.exist')
  })
})