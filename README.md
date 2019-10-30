# 웹 과제 채점 체크 리스트

#### 사전 작업
- 저장된 시간표, 메모 모두 초기화

## 1. 강의 목록 조회 기능 검사
- 전체 강의 개수가 잘 나와 있는지 검사 (총 50개 강의)

- View에 보이는 특정 강의 정보와 제공된 강의 정보가 일치하는지 검사

- 특정 강의 한 개를 클릭해 Modal에도 강의 정보가 잘 보여지는지 검사
  >강의 정보 : 강의 이름, 코드, 교수, 강의실 등등

## 2. 강의 검색 기능 검사
- 특정 강의를 검색 EX) "논리"

- 검색된 강의가 View에 잘 보여지는지 검사 (개수, 강의 정보)
  > "논리" 로 시작하는 강의는 총 2개 뿐

- 공백을 검색 했을 때 전체 목록 불러와 지는지 검사 (총 50개 강의)

## 3. 강의 등록 기능 검사
- 검색한 강의 중 하나를 클릭 후 강의 등록하기 클릭

- 시간표 Timeline에 강의가 잘 들어갔는지 검사
  > 추가한 강의가 Timeline의 정확한 위치에 잘 들어갔는지 + 강의 정보

- 추가된 강의를 클릭 후 Modal에도 강의 정보가 잘 보여지는지 검사

### 3-1. 강의 등록 Validation
- 요일은 같고 시간은 다른 강의를 추가하면 추가 되는지 검사

- 요일은 다르고 시간은 같은 강의를 추가하면 추가 되는지 검사

- 요일과 시간이 겹치는 강의 추가하면 추가 안되는지 검사

  > 강의가 추가 안되는걸 어떻게 정확히 검사할지?
  >
  > 단순히 Timeline에 안들어가면 validation을 잘한건지?
  >
  > 오류가 나서 안들어간건지 어떻게 판단할지 ?

## 4. 강의 삭제 기능 검사
- 등록했던 강의 한 개를 삭제 후 Timeline에 삭제 되었는지 검사

## 5. 메모 등록 기능 검사
- 등록했던 강의 한 개를 클릭 후 메모 2개를 등록 후 Timeline에 잘 등록 되었는지 검사

- 다시 강의를 클릭 후 Modal 창에도 메모가 추가 되었는지 검사

## 6. 메모 삭제 기능 검사
- 강의에 등록된 메모를 삭제 후 확인

## 추가로 고려될 사항

#### 연쇄적으로 강의와 메모를 삭제했는지 검사
- 강의 삭제 후 같은 이름의 강의를 추가 했을 때 메모가 남아 있는지

#### 오늘 날짜 표시가 잘 되었는지 검사

#### 주간 이동이 가능한지 검사
- 주간 이동시 작성 했던 메모가 안보이는지
