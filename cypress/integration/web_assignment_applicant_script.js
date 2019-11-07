describe('기본 체크', function() {
  it('온라인 현황 체크', function() {
    cy.visit('http://ec2-13-124-183-165.ap-northeast-2.compute.amazonaws.com:32790/');
  });
});

// 강의 목록 내용 체크
describe('프로그래머스 테스트', function() {
  describe('강의 목록 클릭 모달 체크', function() {
    it('강의 목록에 있는 것을 눌렀을때 모달에 정보가 출력되는지 체크', function() {
      cy.get('.card-lecture')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get('#modal-lecture-info > div > div > div.modal-body > h3').should(
        'contain',
        '대학수학1',
      );

      cy.get('#modal-lecture-info > div > div > div.modal-body > ul').within(
        $li => {
          cy.get('li:nth-child(2)').should('contain', 'PG1807-03');
          cy.get('li:nth-child(3)').should('contain', '박정희');
          cy.get('li:nth-child(4)').should('contain', 'B동102');
        },
      );

      cy.get(
        '#modal-lecture-info > div > div > div.modal-footer > button.btn.btn-light',
      ).click();

      cy.wait(500);
    });

    it('과목 등록하기 눌렀을때, 제대로 등록 됐는지 체크', function() {
      cy.get('.card-lecture')
        .contains('대학수학1')
        .click();

      // close the modal
      cy.wait(500);

      cy.get(
        '#modal-lecture-info > div > div > div.modal-footer > button.btn.btn-primary',
      ).click();

      // just in case wait for request?
      cy.wait(2000);

      cy.get(
        'body > section.section-list > div > div > div.table-schedule-subject > ul > li:nth-child(2) > ul > li > a > div',
      ).within($h6 => {
        cy.get('h6:nth-child(1)').should('contain', '대학수학1');
        cy.get('h6:nth-child(2)').should('contain', 'B동102');
      });
    });
  });

  //currentwork
  describe('수강된 강의 눌렀을때 모달 체크 & 메모 체크', function() {
    it('눌렀을때 강의 내용 잘 표시 되는지 체크', function() {
      cy.get('.lecture-time > a')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get('#modal-lecture-task > div > div > div.modal-body > h3').should(
        'contain',
        '대학수학1',
      );

      cy.get('#modal-lecture-task > div > div > div.modal-body > ul').within(
        $li => {
          cy.get('li:nth-child(2)').should('contain', 'PG1807-03');
          cy.get('li:nth-child(3)').should('contain', '박정희');
          cy.get('li:nth-child(4)').should('contain', 'B동102');
        },
      );

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.modal-footer > div.right > button.btn.btn-light',
      ).click();

      cy.wait(500);
    });

    it('메모 등록하고 등록 됐는지 체크', function() {
      cy.get('.lecture-time > a')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.modal-footer > div.left > button',
      ).click();

      cy.wait(500);

      //메모 작성 및 저장
      cy.get(
        '.popover-body > :nth-child(2) > .col-form-label > #recipient-name',
      ).type('title');
      cy.get(
        '.popover-body > :nth-child(3) > .col-form-label > #message-text',
      ).type('memo');
      cy.get('.popover-body > .btn').click();

      cy.wait(1000);

      // 캘린더에 메모가 잘 적혀있는지
      cy.get(
        'body > section.section-list > div > div > div.table-schedule-subject > ul > li:nth-child(2) > ul > li > a',
      ).within($div => {
        cy.get('div:nth-child(2) > span').should('contain', 'title');
      });

      // 캘린더 눌렀을때 안에 메모가 잘 적혀있는지
      cy.get('.lecture-time > a')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.lecture-memo > ul',
      ).within($li => {
        cy.get('li:nth-child(1) > div.memo-content > span').should(
          'contain',
          'title',
        );
      });

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.modal-footer > div.right > button.btn.btn-light',
      ).click();

      cy.wait(500);
    });

    it('메모 삭제 체크', function() {
      // 삭제해라
      cy.get('.lecture-time > a')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.lecture-memo > ul',
      ).within($li => {
        cy.get('li:nth-child(1) > div.memo-btn > a > i').click();
      });

      cy.wait(1000);

      cy.get(
        'body > section.section-list > div > div > div.table-schedule-subject > ul > li:nth-child(2) > ul > li > a',
      ).within($div => {
        cy.get('div:nth-child(2) > span').should('not.exist');
      });

      cy.get('.lecture-time > a')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.lecture-memo > ul',
      ).within($li => {
        cy.get('li:nth-child(1) > div.memo-content > span').should('not.exist');
      });

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.modal-footer > div.right > button.btn.btn-light',
      ).click();

      cy.wait(500);
    });

    it('강의 취소 기능 체크', function() {
      cy.get('.lecture-time > a')
        .contains('대학수학1')
        .click();

      cy.wait(500);

      cy.get(
        '#modal-lecture-task > div > div > div.modal-body > div.modal-footer > div.right > button.btn.btn-danger',
      ).click();

      cy.wait(1000);

      cy.get(
        'body > section.section-list > div > div > div.table-schedule-subject > ul > li:nth-child(2) > ul > li',
      ).should('not.exist');
    });
  });

  //강의 목록 체크
  describe('강의 목록 체크', function() {
    it('강의 목록에는 모든 강의를 표시해야 합니다 (50개 있는지 체크)', function() {
      cy.get('.card-lecture').should('have.length', 50); // 강의 총 개수
    });

    it('강의 하나 정보가 다 들어 있는지 확인', function() {
      cy.get('a.lecture-title')
        .contains('대학수학1')
        .parent()
        .within($li => {
          cy.get('span')
            .contains(/화*/)
            .contains(/13:00.*15:00/);

          const information = cy.get('.list-lecture-info');

          information.should('contain', 'PG1807-03');
          information.should('contain', '박정희');
          information.should('contain', 'B동102');
        });
    });
  });

  //강의 목록 서치바 체크
  describe('강의 목록 서치바 체크', function() {
    it('강의 목록 서치바에 검색어를 입력하면 찾아져야 합니다. [강의명 테스트]', function() {
      cy.get('#search-form')
        .find('input')
        .type('TOEIC1');

      cy.get('a.lecture-title')
        .contains('TOEIC1')
        .parent()
        .within($li => {
          const timeInformation = cy.get('span');
          timeInformation.should('contain', '수');
          timeInformation.should('contain', '15:00');

          const information = cy.get('.list-lecture-info');

          information.should('contain', 'PG1807-04');
          information.should('contain', '최옥순');
          information.should('contain', 'A동302');
        });

      cy.get('#search-form')
        .find('input')
        .clear();
    });

    it('강의 목록 서치바에 검색어를 입력하면 찾아져야 합니다. [교과목 테스트]', function() {
      cy.get('#search-form')
        .find('input')
        .type('PG1807-04');

      cy.get('a.lecture-title')
        .contains('TOEIC1')
        .parent()
        .within($li => {
          const timeInformation = cy.get('span');
          timeInformation.should('contain', '수');
          timeInformation.should('contain', '15:00');

          const information = cy.get('.list-lecture-info');

          information.should('contain', 'PG1807-04');
          information.should('contain', '최옥순');
          information.should('contain', 'A동302');
        });

      cy.get('#search-form')
        .find('input')
        .clear();
    });

    it('강의 목록 서치바에 검색어를 입력하면 찾아져야 합니다. [교수님 이름 테스트]', function() {
      cy.get('#search-form')
        .find('input')
        .type('최옥순');

      cy.get('a.lecture-title')
        .contains('TOEIC1')
        .parent()
        .within($li => {
          const timeInformation = cy.get('span');
          timeInformation.should('contain', '수');
          timeInformation.should('contain', '15:00');

          const information = cy.get('.list-lecture-info');

          information.should('contain', 'PG1807-04');
          information.should('contain', '최옥순');
          information.should('contain', 'A동302');
        });

      cy.get('#search-form')
        .find('input')
        .clear();
    });
  });
});
