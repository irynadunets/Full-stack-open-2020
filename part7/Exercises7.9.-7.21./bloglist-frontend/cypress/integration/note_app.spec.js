describe('Blog app', function() {
  beforeEach(function() {
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Alex',
      url: 'hhtp?:',
      likes: 4
    }
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'mluukkai logged in')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('input:first').type('mluukkai')
        cy.get('input:last').type('salainen')
        cy.get('#login-button').click()
      })

      it('a new blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('input:title').type('a note created by cypress')
        cy.get('input:author').type('Alex')
        cy.get('input:url').type('http:/salainen')
        cy.contains('create').click()
        cy.contains('a note created by cypress')
        cy.contains('Alex')
        cy.contains('http:/salainen')
      })

      it('user can like a blog', function() {
        beforeEach(function() {
          cy.contains('view').click()
        })
        cy.contains('Component testing is done with react-testing-library')
        cy.contains('Alex')
        cy.contains('hhtp?:')
        cy.contains(4)
        cy.contains('like').click()
        cy.contains(5)
      })

      it('user who created a blog can delete it', function() {
        beforeEach(function() {
          cy.contains('view').click()
        })
        cy.contains('Component testing is done with react-testing-library')
        cy.contains('Alex')
        cy.contains('hhtp?:')
        cy.contains(5)
        cy.contains('Delete').click()
      })
    })
  })
})
