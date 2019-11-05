
var base_url = "http://ec2-52-79-249-168.ap-northeast-2.compute.amazonaws.com:32781/"

//url 접근 안되면 나머지 테스트 진행안하도록 처리해야함
//강의 목록 조회 기능
describe('강의 목록 조회 기능 검사', function() {
  it('전체 강의 개수가 잘 나와 있는지 검사 (총 50개 강의)', function() {
    cy.visit(base_url)
    // cy.visit("/")
    cy.get('.card-lecture').should('have.length', 50) // 강의 총 개수
  })

  it('View에 보이는 특정 강의 정보와 제공된 강의 정보가 일치하는지', function() {
    cy.visit(base_url)
    // 논리 회로
    cy.get('a.lecture-title')
      .contains(/.*컴퓨터.*네트워크.*/)
      .parent()
      .within(($li) => {
        // 강의명
      cy.get('.lecture-time')
        .contains(/11.*12/) // 시간
        .contains('화') // 요일

      cy.get('.list-lecture-info').contains('PG1807-16') // 강의 코드
      cy.get('.list-lecture-info').contains('이지영') // 교수 이름
      cy.get('.list-lecture-info').contains(/B동.*101/) // 강의실
    })
  })

  it('특정 강의 한 개를 클릭해 Modal에도 강의 정보가 잘 보여지는지 검사', function() {
    cy.visit(base_url)
    cy.get('a.lecture-title')
      .contains(/.*컴퓨터.*네트워크.*/)
      .parent()
      .click()

    //selector 수정
    cy.get('#modal-lecture-info > .modal-dialog > .modal-content > .modal-body')
      .within(($div) => {
        cy.get('.lecture-title').contains(/.*컴퓨터.*네트워크.*/) //모달 강의 이름
        cy.get('.lecture-time')
          .contains(/11.*12/) //모달 강의 시간
          .contains('화') //모달 강의 요일
        cy.get('.lecture-info').contains('PG1807-16') //모달 강의 이름
        cy.get('.lecture-info').contains('이지영') //모달 강의 이름
        cy.get('.lecture-info').contains(/B동.*101/) //모달 강의 이름
      })

    //대기 후
    cy.wait(500)
    // modal 창 닫기
    cy.get('body').click(10,10)
  })
})

//강의 검색 기능
describe('강의 검색 기능 검사', function() {

  it('검색된 강의가 View에 잘 보여지는지 검사 (개수, 강의 정보)', function() {
    // cy.visit(base_url)

    cy.get('#search-form').find('input.form-control').type('컴퓨터').type('{enter}')
    cy.wait(500)

    cy.get('.list-lecture > .card-lecture').should('have.length', 5) // 개수 변경 2개여야함
    // 논리 회로
    cy.get('a.lecture-title').contains(/.*컴퓨터.*네트워크.*/).parent().within(($li) => {
      // 강의명
      cy.get('.lecture-time')
        .contains(/11.*12/) // 시간
        .contains('화') // 요일

      cy.get('.list-lecture-info').contains('PG1807-16') // 강의 코드
      cy.get('.list-lecture-info').contains('이지영') // 교수 이름
      cy.get('.list-lecture-info').contains(/B동.*101/) // 강의실
      // 논리로 시작하는 강의 한개더 추가 *
    })
  })

  it('공백을 검색 했을 때 전체 목록 불러와 지는지 검사 (총 50개 강의)', function() {
    cy.visit(base_url)
    cy.get('#search-form').find('input.form-control').clear().type('{enter}')
    cy.wait(500)
    cy.get('.card-lecture').should('have.length', 50) // 개수 변경 2개여야함
  })
})
// 강의 등록 기능
describe('강의 등록 기능 검사', function() {
  it('특정 강의 하나를 클릭 후 강의 등록하기 클릭', function() {
    cy.visit(base_url)
    cy.get('a.lecture-title').contains(/.*컴퓨터.*네트워크.*/).parent().click()
    cy.wait(500)
    // 등록하기 버튼
    cy.get('.modal-footer > .btn-primary')
      .click()

      //대기 후
      cy.wait(500)
      // modal 창 닫기
      cy.get('body').click(10,10)
  });

  //시간표가 1시간 단위인지
  it('시간표 Timeline에 강의가 잘 들어갔는지 검사', function() {
    cy.visit(base_url)
    cy.get('.list-lecture-item > :nth-child(2) > ul').within(($li) => {
      //색상 검사
      // cy.get('.lecture-time.hr-11').invoke('attr', 'data-event').should('contain', 'lecture-01')
      // 시간, 강의명, 장소 검사
      cy.get('.lecture-time.hr-11').within(($a) => {
        cy.get('.lecture-title').contains(/.*컴퓨터.*네트워크.*/)
        cy.get('.lecture-location').contains(/B동.*101/)
      })
    })
  });

  it('추가된 강의를 클릭 후 Modal에도 강의 정보가 잘 보여지는지 검사', function() {
    cy.visit(base_url)
    cy.get('h6.lecture-title').contains(/.*컴퓨터.*네트워크.*/).parents('a').click()
    cy.wait(500)

    cy.get('.modal-body').within(($div) => {
      cy.get('.lecture-title').contains(/.*컴퓨터.*네트워크.*/) //모달 강의 이름
      cy.get('.lecture-time')
        .contains(/11.*12/) //모달 강의 시간
        .contains('화') //모달 강의 요일
      cy.get('.lecture-info').contains('PG1807-16') //모달 강의 이름
      cy.get('.lecture-info').contains('이지영') //모달 강의 이름
      cy.get('.lecture-info').contains(/B동.*101/) //모달 강의 이름
    })

    //대기 후
    cy.wait(500)
    // modal 창 닫기
    cy.get('body').click(10,10)
  });
});

// 강의 등록 validation -> 지원자가 modal같은거 띄워두면 어떻게 처리?
describe('강의 등록 Validation', function() {

  //실 데이터 - 컴퓨터네트워크 11,12 화, 철학의이해 15,16 월화 사용에정
  //테스트 데이터 - 논리설계 13,14 월 , 웹 프로그래밍 10,12 월수
  it('요일은 같고 시간은 다른 강의를 추가하면 추가 되는지 검사', function() {
    cy.visit(base_url)
    cy.get('a.lecture-title').contains(/.*철학의.*이해.*/).parent().click()
    cy.wait(500)
    // 등록하기 버튼
    cy.get('.modal-footer > .btn-primary')
      .click()

      //대기 후
      cy.wait(500)
      // modal 창 닫기
      cy.get('body').click(10,10)

    //월요일 라인
    cy.get('.list-lecture-item > :nth-child(1) > ul').within(($li) => {
      //색상 검사 + 시간검사 -> double 도 표시
      // cy.get('.lecture-time.hr-15').invoke('attr', 'data-event').should('contain', 'lecture-02')
      // 시간, 강의명, 장소 검사
      cy.get('.lecture-time.hr-15').within(($a) => {
        cy.get('.lecture-title').contains(/.*철학의.*이해.*/)
        cy.get('.lecture-location').contains(/A동.*210/)
      })
    })

    //화요일 라인
    cy.get('.list-lecture-item > :nth-child(2) > ul').within(($li) => {
      //색상 검사 + 시간검사 -> double 도 표시
      // cy.get('.lecture-time.hr-15').invoke('attr', 'data-event').should('contain', 'lecture-02')
      // 시간, 강의명, 장소 검사
      cy.get('.lecture-time.hr-15').within(($a) => {
        cy.get('.lecture-title').contains(/.*철학의.*이해.*/)
        cy.get('.lecture-location').contains(/A동.*210/)
      })
    })
  })
  // 실 데이터 - 컴퓨터네트워크 11,12 화, 자료 구조 11,12 목,금 사용예정
  // 테스트 데이터 - 논리설계 13,14 월, 자료구조 13,15 화
  it('요일은 다르고 시간은 같은 강의를 추가하면 추가 되는지 검사', function() {
    cy.visit(base_url)
    cy.get('a.lecture-title').contains(/.*자료.*구조.*/).parent().click()
    cy.wait(500)
    // 등록하기 버튼
    cy.get('.modal-footer > .btn-primary')
      .click()

      //대기 후
      cy.wait(500)
      // modal 창 닫기
      cy.get('body').click(10,10)

    //목요일 라인
    cy.get('.list-lecture-item > :nth-child(4) > ul').within(($li) => {
      //색상 검사
      // cy.get('.lecture-time.hr-11').invoke('attr', 'data-event').should('contain', 'lecture-03')
      // 시간, 강의명, 장소 검사
      cy.get('.lecture-time.hr-11').within(($a) => {
        cy.get('.lecture-title').contains(/.*자료.*구조.*/)
        cy.get('.lecture-location').contains(/B동.*607/)
      })
    })

    //금요일 라인
    cy.get('.list-lecture-item > :nth-child(5) > ul').within(($li) => {
      //색상 검사
      // cy.get('.lecture-time.hr-11').invoke('attr', 'data-event').should('contain', 'lecture-03')
      // 시간, 강의명, 장소 검사
      cy.get('.lecture-time.hr-11').within(($a) => {
        cy.get('.lecture-title').contains(/.*자료.*구조.*/)
        cy.get('.lecture-location').contains(/B동.*607/)
      })
    })
  })
  //실 데이터 - 컴퓨터네트워크 11,12 화, 멀티미디어시스템 10,12 화 사용예정
  //테스트 데이터 - 논리설계 13,14 월 , 프로그래밍의 원리 13,15 월
  it('요일과 시간이 겹치는 강의 추가하면 추가 안되는지 검사', function() {
    cy.visit(base_url)
    cy.get('a.lecture-title').contains(/.*멀티미디어.*시스템.*/).parent().click()
    cy.wait(500)
    // 등록하기 버튼
    cy.get('.modal-footer > .btn-primary')
      .click()

      //대기 후
      cy.wait(500)
      // modal 창 닫기
      cy.get('body').click(10,10)

    // 강의 추가 안되었는지 검사
    cy.get('.list-lecture-item > :nth-child(2) > ul').within(($li) => {
      // 해당 강의가 존재하지 않아야함
      cy.get('.lecture-time.two-hr.hr-10').should('not.exist')
    })

  })
});

//강의 삭제 기능
describe('강의 삭제 기능 검사', function() {
  it('등록했던 강의 한 개를 클릭 후 강의 삭제하기', function() {
    cy.visit(base_url)
    //타임라인에 있는 특정 강의 클릭
    cy.get('h6.lecture-title').contains(/.*자료.*구조.*/).parents('a').click()
    cy.wait(500)
    // 삭제하기 버튼
    cy.get('.modal-footer > .right > .btn-danger')
      .click()

    cy.wait(500)
    // modal 창 닫기
    cy.get('body').click(10,10)
  })

  it('삭제한 강의가 Timeline에 삭제 되었는지 검사', function() {
    cy.visit(base_url)
    //월요일 라인 -> :nth-child(1)
    cy.get('.list-lecture-item > :nth-child(4) > ul').within(($li) => {

      cy.get('.lecture-time.hr-11').should('not.exist')
    })

    //수요일 라인 -> :nth-child(2)
    cy.get('.list-lecture-item > :nth-child(5) > ul').within(($li) => {

      cy.get('.lecture-time.hr-11').should('not.exist')
    })
  })

});

// 메모 등록 기능
describe('메모 등록 기능 검사', function() {
  it('등록했던 강의 한 개를 클릭 후 메모 2개를 등록하기', function() {
    cy.visit(base_url)
    //타임라인에 있는 특정 강의 클릭
    cy.get('h6.lecture-title').contains(/.*컴퓨터.*네트워크.*/).parents('a').click()
    cy.wait(500)

    createMemo("논리 회로 과제", "메모 내용 작성하기");
    cy.get('.modal-footer > .left > .btn-light-primary').click()
    createMemo("두번째 과제", "두번째 메모 내용 작성하기");

    //대기 후
    cy.wait(500)
    // modal 창 닫기
    cy.get('body').click(10,10)
  })

  it('등록한 메모가 Timeline에 잘 등록 되었는지 검사', function() {
    cy.visit(base_url)
    cy.get('h6.lecture-title')
      .contains(/.*컴퓨터.*네트워크.*/)
      .parents('a')
      .children('.lecture-noti')
      .contains('논리 회로 과제')
      .parents()
      .contains('두번째 과제')
  })

  it('다시 강의를 클릭 후 Modal 창에도 메모가 추가 되었는지 검사', function() {
    cy.visit(base_url)
    //특정 강의 클릭
    cy.get('h6.lecture-title').contains(/.*컴퓨터.*네트워크.*/).parents('a').click()
    cy.wait(500)

    cy.get('.modal-body > .lecture-memo').within(($ul) => {
      // 추가한 첫번째 과제
      cy.get(':nth-child(1)').contains('논리 회로 과제')
      // 추가한 두번째 과제
      cy.get(':nth-child(2)').contains('두번째 과제')
      // 그 이상은 없어야함
      cy.get('ul > li').should('have.length','2')
    })

    //대기 후
    cy.wait(500)
    // modal 창 닫기
    cy.get('body').click(10,10)
  })
});

// 메모 삭제 기능
describe('메모 삭제 기능 검사', function() {
  it('강의에 등록된 메모를 삭제하기', function() {
    cy.visit(base_url)
    //특정 강의 클릭
    cy.get('h6.lecture-title').contains(/.*컴퓨터.*네트워크.*/).parents('a').click()
    cy.wait(500)

    //메모 삭제
    cy.get(':nth-child(1) > .memo-btn').click()
    // 지워지면 두번째것도 지움
    cy.get(':nth-child(1) > .memo-btn').click()

    //대기 후
    cy.wait(500)
    // modal 창 닫기
    cy.get('body').click(10,10)
  })

  it('삭제된 메모 확인하기', function() {
    cy.visit(base_url)
    // timeline의 특정 메모 찾아서 메모가 없는지 확인
    cy.get('h6.lecture-title')
      .contains(/.*컴퓨터.*네트워크.*/)
      .parents('a')
      .children('.lecture-noti')
      .should('not.exist')
  })
});

//
//
// // //시간표 체크
// // function checkTimeline(day, time, type, lectureCount, title, location){
// //
// //   cy.get('.list-lecture-item > :nth-child('+day+') > ul').within(($li) => {
// //     //색상 검사 + 시간검사 -> double 도 표시
// //     var lectureTime;
// //     if(type == "single") lectureTime = cy.get('.lecture-time.hr-'+time)
// //     else lectureTime = cy.get('.lecture-time.two-hr.hr-'+time)
// //     lectureTime.invoke('attr', 'data-event').should('contain', lectureCount)
// //     // 시간, 강의명, 장소 검사
// //     lectureTime.within(($a) => {
// //       cy.get('.lecture-title').contains(title)
// //       cy.get('.lecture-location').contains(location)
// //     })
// //   })
// //
// //   cy.get('.list-lecture-item > :nth-child(1) > ul').within(($li) => {
// //     //색상 검사
// //     cy.get('.lecture-time.hr-13').invoke('attr', 'data-event').should('contain', 'lecture-01')
// //     // 시간, 강의명, 장소 검사
// //     cy.get('.lecture-time.hr-13').within(($a) => {
// //       cy.get('.lecture-title').contains(/.*논리.*설계.*/)
// //       cy.get('.lecture-location').contains(/공학관.*204/)
// //     })
// //   })
// // }
// 메모 등록
function createMemo(title, memo){
  // 메모 등록 버튼
  cy.get('.modal-footer > .left > .btn-light-primary').click()
  cy.wait(500)
  //메모 추가
  cy.get('.popover-body > :nth-child(2) > .col-form-label > #recipient-name').type(title)
  cy.get('.popover-body > :nth-child(3) > #message-text').type(memo)
  // //메모 저장
  cy.get('.popover-body > .btn').click()
}
