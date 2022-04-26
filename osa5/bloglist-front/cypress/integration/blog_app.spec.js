describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Foo Bar',
      username: 'testifoo',
      password: 'passu'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:text').type('testifoo')
      cy.get('input:password').type('passu')
      cy.contains('Login').click()
      cy.contains('Create new')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:text').type('testifoo')
      cy.get('input:password').type('hack')
      cy.contains('Login').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('not.contain', 'Logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:text').type('testifoo')
      cy.get('input:password').type('passu')
      cy.contains('Login').click()

      cy.contains('Create new blog').click()
      cy.get('input[name="title"]').type('brand new blog')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('address')
      cy.get('button[name="createblog"]').click()
    })

    it('A blog can be created', function() {
      cy.get('.notification')
        // eslint-disable-next-line quotes
        .should('contain', `Created new blog 'brand new blog' by test author`)
      cy.contains('brand new blog; test author')
      cy.contains('View')
    })

    it('A blog can be liked', function() {
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be removed by creator', function() {
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.should('not.contain', 'brand new blog; test author')
    })

    it('Blogs are ordered according to likes', function() {
      cy.contains('Create new blog').click()
      cy.get('input[name="title"]').type('a blog with most likes')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('address')
      cy.get('button[name="createblog"]').click()

      cy.contains('Create new blog').click()
      cy.get('input[name="title"]').type('a third blog')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('address')
      cy.get('button[name="createblog"]').click()

      cy.get('button').eq(5).click()
      cy.contains('Like').click()
      cy.get('.blog').eq(0).should('contain', 'a blog with most likes')
      cy.get('.blog').eq(1).should('contain', 'brand new blog')
    })
  })
})