# 학사관리시스템 웹 애플리케이션

> 소프트웨어공학 3차 팀 프로젝트

<br/>

## ⚙️ 사용 기술

**Frontend**: React, Vite
<br>
**Backend**: Node.js, Express.js
<br>
**Database**: MySQL

<br/>

## 🚀 설치 및 실행 방법

```bash
# 레포지토리 클론
git clone https://github.com/kmz6/2025_SE_6.git
cd 2025_SE_6
```

```bash
# 의존성 설치
cd frontend
npm install
cd ../backend
npm install
```

```bash
# 실행
cd backend
npm run start:all
```

<br/>

## 📁 파일 구조

#### 프론트엔드 구조

```bash
frontend/src/
├── apis/                  # API 요청 함수 정의
├── assets/                # 정적 파일
├── components/            # 재사용 가능한 컴포넌트
├── constants/             # 상수 정의
├── context/               # 전역 상태 관리
├── hooks/                 # 커스텀 훅
├── images/                # 이미지 리소스
├── layout/                # 레이아웃
├── mocks/                 # Mock 데이터
├── pages/                 # 각 화면 페이지
├── styles/                # 스타일 파일
├── utils/                 # 유틸리티 함수
├── App.css                # 전체 앱 스타일
├── App.jsx                # 최상위 컴포넌트
├── index.css              # 기본 스타일
└── main.jsx               # 진입점
```

#### 백엔드 구조

```bash
backend/
├── config/                # DB 및 서버 설정
├── constants/             # 상수 정의
├── controllers/           # 요청 로직 처리
├── models/                # DB 모델 정의
├── public/images/         # 이미지 파일
├── routes/                # API 라우터 정의
├── uploads/               # 업로드 파일 저장 경로
├── .gitignore             # Git 제외 파일 목록
├── app.js                 # Express 앱 진입점
├── package.json           # 프로젝트 설정 및 의존성
└── package-lock.json      # 의존성 고정 파일
```

<br/>

## 🗃️ ERD

![ERD](frontend/src/images/erd.png)

<br/>

## 👩🏻‍💻 팀원 소개

<table width="100%">
  <tr>
    <td align="center" width="25%">
      <img src="https://github.com/kmz6.png" width="190" /><br />
      <a href="https://github.com/kmz6">@kmz6</a>
    </td>
    <td align="center" width="25%">
      <img src="https://github.com/dbfanck.png" width="190" /><br />
      <a href="https://github.com/dbfanck">@dbfanck</a>
    </td>
    <td align="center" width="25%">
      <img src="https://github.com/zo0o0.png" width="190" /><br />
      <a href="https://github.com/zo0o0">@zo0o0</a>
    </td>
    <td align="center" width="25%">
      <img src="https://github.com/gpdnjs8.png" width="190" /><br />
      <a href="https://github.com/gpdnjs8">@gpdnjs8</a>
    </td>
  </tr>
</table>
