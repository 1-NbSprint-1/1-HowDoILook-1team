## 1팀

https://github.com/1-NbSprint-1

## 팀원 구성

- 이설( https://github.com/Nanobel )
- 김승희(https://github.com/seung0321)
- 석기현(https://github.com/SeokGyeon)
- 권소담(https://github.com/hyperperi)

## 프로젝트 소개

- 스타일 공유 및 큐레이팅 서비스
- 프로젝트 기간: 2025-02-25~2025-03-18

## 팀원 역할(R&R)

### 이설(팀장)

<aside>

### 답글 기능

- 큐레이션에 대한 답글 CRUD 기능 구현
- bcrypt를 사용한 비밀번호 암호화 처리
- 답글 목록 최신순 정렬 기능

### api 문서화

- Swagger를 활용한 REST API 문서화 작성
- 댓글 관련 엔드포인트 상세 작성
- 개발 서버 설정 및 API 문서 구조화
</aside>

### 석기현

<aside>

### 스타일 기능

- Style 기본적인 기능 추가 (생성, 수정, 조회, 삭제)
- Style 상세 조회 내 검색 기능 (제목, 닉네임, 설명, 태그) 구현
- 랭킹 기능에 정렬 및 페이지네이션 기능 추가

### 문서 작업

- 팀 노션 문서 분류
</aside>

### **권소담**

<aside>

### **태그 기능**

- 4번 이상 사용된 태그를 인기 태그로 분류
- 기등록된 태그 재활용 로직 적용
- 태그를 스타일의 속성이 아닌 별도의 기능으로 두어 n:m관계로 재설정

### **이미지 url 업로드 기능**

- 이미지를 업로드할 때 url로 반환

### **문서 작업**

- 팀 노션 문서 정리
- 주강사님 피드백 정리 및 할 일 분담

### **배포**

- Render를 통한 배포
- 배포 다이어그램 제작

### **발표 자료 제작**

</aside>

### 김승희

<aside>

 **큐레이팅(Curating) 기능**

- Style에 대한 트렌디, 개성, 실용성, 가성비 점수 등록
- Style에 1:N 관계 적용
- 닉네임 및 내용으로 검색
- 수정 시 비밀번호 일치 비교

**문서 작업**

- 팀 노션 문서 정리
- 코드 컨벤션 및 프리티어 작성

**통합 코드(dev)** 

- CommonJS → ESM 변경
- MongoDB → PostgreSQL 변경
</aside>

## 기술 스택

- backend: Express.js, PrismaORM
- frontend: React
- database: PostgreSQL
- 공통 Tool: git & github, Discord, zep

## 팀원 규칙

- 팀 미팅에 적극적으로 참여하기
- 코드리뷰는 24시간 내에 반드시 하기
- 팀 미팅 불참 시 최소한 하루 전에 말하기
- 3시간 동안 해결되지 않는 문제는 공유하기
- 데일리 스크럼(오전 10시) 10분 정도 오늘 할 일 공유하기
- 자리 비운 팀원에게는 디스코드로 따로 진행상황이나 논의한 내용 알려주기

## 파일 구조

```jsx
backend/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── database.js     # 데이터베이스 연결 설정
│   │   └── swagger.js      # Swagger API 문서 설정
│   │
│   ├── controllers/        # 비즈니스 로직 처리
│   │   ├── styleController.js
│   │   ├── curationController.js
│   │   ├── commentController.js
│   │   ├── tagController.js
│   │   └── imageController.js
│   │
│   ├── routes/            # API 라우트 정의
│   │   ├── styles.js      # 스타일 관련 API (/api/styles/*)
│   │   ├── curations.js   # 큐레이션 관련 API (/api/curations/*)
│   │   ├── comments.js    # 댓글 관련 API (/api/comments/*)
│   │   ├── tags.js        # 태그 관련 API (/api/tags/*)
│   │   └── images.js      # 이미지 관련 API (/api/images/*)
│   │
│   ├── middlewares/       # 미들웨어
│   │   └── errorHandler.js # 에러 처리 미들웨어
│   │
│   └── services/          # 비즈니스 로직 서비스
│       └──tagService.js 
│       └──imageService.js
├── prisma/                # Prisma ORM 설정
├── app.js                 # 메인 애플리케이션 파일
├── package.json           # 프로젝트 의존성 관리
├── package-lock.json
└── .gitignore
```

## 구현 홈페이지

https://one-howdoilook-1team.onrender.com/

https://one-howdoilook-1team.onrender.com/api-docs/

## 프로젝트 회고록

https://drive.google.com/file/d/1ZDAPduHB-Vlw5dsCfgiox54uS7JpXHAy/view

권소담- https://velog.io/@hyperperi/%EC%B4%88%EA%B8%89-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0
