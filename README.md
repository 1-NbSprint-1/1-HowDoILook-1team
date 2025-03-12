# 코드잇 스프린트 초급 프로젝트

## 큐레이팅 기본 요구 사항

### 큐레이팅

**큐레이팅 등록**

- 트렌디, 개성, 실용성, 가성비 점수와 한줄 큐레이팅, 닉네임, 비밀번호를 입력하여 큐레이팅을 등록합니다.

**큐레이팅 수정**

- 비밀번호를 입력하여 큐레이팅 등록 시 입력했던 비밀번호와 일치할 경우 큐레이팅 수정이 가능합니다.

**큐레이팅 삭제**

- 비밀번호를 입력하여 큐레이팅 등록 시 입력했던 비밀번호와 일치할 경우 큐레이팅 삭제가 가능합니다.

**큐레이팅 목록 조회**

- 스타일을 조회할 경우 그 스타일에 해당되는 큐레이팅 목록이 같이 조회됩니다.
- 각 큐레이팅의 트렌디, 개성, 실용성, 가성비 점수와 한줄 큐레이팅, 닉네임이 표시됩니다.
- 닉네임, 내용으로 검색이 가능합니다.
- 큐레이팅에 남겨진 답글도 같이 조회됩니다.

**큐레이팅 API 목록**

| 분류               | 메소드 | URL                           |
| ------------------ | ------ | ----------------------------- |
| 큐레이팅 등록      | POST   | `/styles/{styleId}/curations` |
| 큐레이팅 목록 조회 | GET    | `/styles/{styleId}/curations` |
| 큐레이팅 수정      | PUT    | `/curations/{curationId}`     |
| 큐레이팅 삭제      | DELETE | `/curations/{curationId}`     |

## 에러 처리

- 에러 핸들러 미들웨어 구현
- 서버 오류(500), 비밀번호 입력 오류(400 시리즈), 리소스 찾을 수 없음(404) 등 상황에 맞는 상태값을 반환

## 라우트 중복 제거

- express.Router()를 활용하여 라우트를 별도의 모듈로 구분

## 배포

- .env 파일에 환경 변수 설정
- CORS를 설정
- render.com으로 배포
