describe('Testes na Agenda de Contatos', () => {
  
  // Antes de cada teste, o Cypress acessa a URL da aplicação
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
  })

  it('Deve adicionar um novo contato', () => {
    // Preenche os campos do formulário
    cy.get('input[type="text"]').type('João Silva')
    cy.get('input[type="email"]').type('joao@silva.com')
    cy.get('input[type="tel"]').type('11999999999')
    
    // Clica no botão de adicionar
    cy.get('button[type="submit"]').click()

    // Verifica se o contato foi renderizado na lista
    cy.contains('João Silva').should('be.visible')
    cy.contains('11999999999').should('be.visible')
    cy.contains('joao@silva.com').should('be.visible')
  })

  it('Deve alterar um contato existente', () => {
    // Clica no botão editar do último contato da lista
    cy.get('.edit').last().click()

    // Limpa o campo de nome e digita um novo nome
    cy.get('input[type="text"]').clear().type('João Silva Editado')
    cy.get('input[type="email"]').clear().type('joao.editado@silva.com')
    cy.get('input[type="tel"]').clear().type('11888888888')

    // Salva a alteração
    cy.get('button[type="submit"]').click()

    // Verifica se os novos dados estão visíveis
    cy.contains('João Silva Editado').should('be.visible')
    cy.contains('joao.editado@silva.com').should('be.visible')
    cy.contains('11888888888').should('be.visible')
  })

  it('Deve remover um contato existente', () => {
    // Captura a quantidade atual de contatos
    cy.get('.contato').then(($contatos) => {
      const quantidadeInicial = $contatos.length

      // Clica no botão deletar do último contato
      cy.get('.delete').last().click()

      // Verifica se a quantidade de contatos diminuiu em 1
      cy.get('.contato').should('have.length', quantidadeInicial - 1)
    })
  })
})