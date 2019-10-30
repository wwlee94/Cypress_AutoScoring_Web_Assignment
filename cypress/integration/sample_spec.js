describe('My First Test', function() {
  it('Visits the Kitchen Sink', function(){
    cy.visit('https://example.cypress.io')
  })

  // 내용 찾기
  it('Finds the content "type"', function(){
    cy.visit('https://example.cypress.io')
    cy.contains('type')
  })

  // 클릭 이벤트
  it('Clicks the link "type"', function(){
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
  })

  //클릭후 url 검증
  it('clicking "type" navigates to a new url', function(){
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()

    //새로운 url은 '/command/actions' 가 되어야한다
    cy.url().should('include','/commands/actions')
  })

  // css element 가져오기
  it('Gets, types and asserts', function(){
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()

    //새로운 url은 '/command/actions' 가 되어야한다
    cy.url().should('include','/commands/actions')

    cy.get(".action-email")
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })

  // yields <button> *children 사용법 -> 태그고 뭐고 자식 다 가져옴
  // cy.contains('Search').children('i').should('have.class', 'fa-search')

  // yields label *find 사용법 -> 특정 태그로
  // cy.contains('Age').find('input').type('29')
})
