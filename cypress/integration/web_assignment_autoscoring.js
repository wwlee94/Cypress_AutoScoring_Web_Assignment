describe('초기 환경 세팅', function(){
  it('URL 접근',function(){
    cy.visit('http://localhost:3000')
  })
})

describe('강의 목록 조회 기능 검사', function() {
  it('전체 강의 개수가 잘 나와 있는지 검사 (총 50개 강의)', function(){
    cy.get('.card-lecture').should('have.length', 10) // 개수 변경
  })

  it('View에 보이는 특정 강의 정보와 제공된 강의 정보가 일치하는지', function(){
    // 논리 회로
    cy.get('.lecture-title').contains('논리 설계').parent().within(($li) => {
      // 강의명
      cy.get('.lecture-time')
        .contains('16:00 - 17:00') // 시간
        .contains('월')            // 요일

      cy.get('.list-lecture-info').contains('A0000003')     // 강의 코드
      cy.get('.list-lecture-info').contains('김진수')       // 교수 이름
      cy.get('.list-lecture-info').contains('공학관 204')   // 강의실
    })
  })

  it('특정 강의 한 개를 클릭해 Modal에도 강의 정보가 잘 보여지는지 검사', function(){
    cy.get('.lecture-title').contains('논리 설계').parent().click()

    cy.get('.modal-body').within(($div) => {
      cy.get('.lecture-title').contains('논리 설계') //모달 강의 이름
      cy.get('.lecture-time')
        .contains('16:00 - 17:00') //모달 강의 시간
        .contains('월')             //모달 강의 요일
      cy.get('.lecture-info').contains('A0000003')  //모달 강의 이름
      cy.get('.lecture-info').contains('김진수')  //모달 강의 이름
      cy.get('.lecture-info').contains('공학관 204')  //모달 강의 이름
    })

    //모달 닫으려면 기다렸다가
    cy.wait(500)
    // x 취소버튼
    cy.get('#modal-lecture-info > .modal-dialog > .modal-content > .modal-header')
      .find('button')
      .click()
  })
})

describe('강의 검색 기능 검사', function() {
  it('특정 강의를 검색 EX) "논리"',function(){
    cy.get('#search-form').find('input').type('논리').type('{enter}')
  })

  it('검색된 강의가 View에 잘 보여지는지 검사 (개수, 강의 정보)',function(){
    cy.get('.card-lecture').should('have.length', 10) // 개수 변경 2개여야함

    // 논리 회로
    cy.get('.lecture-title').contains('논리 설계').parent().within(($li) => {
      // 강의명
      cy.get('.lecture-time')
        .contains('16:00 - 17:00') // 시간
        .contains('월')            // 요일

      cy.get('.list-lecture-info').contains('A0000003')     // 강의 코드
      cy.get('.list-lecture-info').contains('김진수')       // 교수 이름
      cy.get('.list-lecture-info').contains('공학관 204')   // 강의실
    // 논리로 시작하는 강의 한개더 추가 *
    })
  })

  it('공백을 검색 했을 때 전체 목록 불러와 지는지 검사 (총 50개 강의)',function(){
    cy.get('#search-form').find('input').type('{enter}')

    cy.get('.card-lecture').should('have.length', 10) // 개수 변경 2개여야함
  })
})

describe('강의 등록 기능 검사',function(){
  it('검색한 강의 중 하나를 클릭 후 강의 등록하기 클릭',function(){

  });

  it('시간표 Timeline에 강의가 잘 들어갔는지 검사',function(){

  });

  it('추가된 강의를 클릭 후 Modal에도 강의 정보가 잘 보여지는지 검사',function(){

  });
});
