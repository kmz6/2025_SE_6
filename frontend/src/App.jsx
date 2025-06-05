import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./context/UserContext";
import RootLayout from "./layout/root-layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

// 홈 / 로그인 / 회원 가입 / 비밀번호 초기화
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswdPage from "./pages/studfac/ResetPasswdPage";

// 마이 페이지
import MyPage from "./pages/MyPage";
import MyInfoPage from "./pages/MyInfoPage";
import MyPwdPage from "./pages/MyPwdPage";

// 강의 종합
import LectureHomePage from "./pages/student/LectureRoomPage";

// 공지사항
import NoticeListPage from "./pages/studfac/NoticeListPage";
import NoticePostPage from "./pages/studfac/NoticePostPage";
import NoticeWritePage from "./pages/faculty/NoticeWritePage";

// 시간표 / 출석
import TimetablePage from "./pages/student/TimetablePage";
import StudLectureList from "./pages/student/StudLectureList";
import StudAttendPage from "./pages/student/StudAttendPage";
import ProfLectureList from "./pages/faculty/ProfLectureList";
import ProfAttendPage from "./pages/faculty/ProfAttendPage";

// 수강 신청
import SugangPage from "./pages/student/SugangPage";

// 학적 관리
import LeaveRequestPage from "./pages/student/LeaveRequestPage";
import LeaveApprovalPage from "./pages/staff/LeaveApprovalPage";

// 자료실
import ArchivesListPage from "./pages/studfac/ArchivesListPage";
import ArchivesPostPage from "./pages/studfac/ArchivesPostPage";
import ArchivesWritePage from "./pages/faculty/ArchivesWritePage";

// 구성원 관리
import AddMemberPage from "./pages/staff/AddMemberPage";
import DeleteMemberPage from "./pages/staff/DeleteMemberPage";

// 성적 조회 / 입력
import GradeListPage from "./pages/faculty/GradeListPage";
import GradeInputPage from "./pages/faculty/GradeInputPage";
import StudGradePage from "./pages/student/StudGradePage";
import StudRankPage from "./pages/student/StudRankPage";

// 강의 계획서
import StudSyllabusPage from "./pages/student/StudSyllabusPage";
import ProfSyllabusPage from "./pages/faculty/ProfSyllabusPage";
import StudSyllabusSearchPage from "./pages/student/StudSyllabusSearchPage";
import ProfSyllabusListPage from "./pages/faculty/ProfSyllabusListPage";

// 대시 보드
import DashboardPage from "./pages/student/DashboardPage";

// 과제
import AssignListPage from "./pages/studfac/AssignListPage";
import AssignPostPage from "./pages/student/AssignPostPage";
import AssignWritePage from "./pages/faculty/AssignWritePage";
import AssignSubmitListPage from "./pages/faculty/AssignSubmitListPage";
import AssignSubmittedDetailPage from "./pages/studfac/AssignSubmittedDetailPage";

// QnA
import QnAListPage from "./pages/studfac/QnALIstPage";
import QnAPostPage from "./pages/studfac/QnAPostPage";
import QnAWritePage from "./pages/studfac/QnAWritePage";

const router = createBrowserRouter([
  { // 로그인 / 회원가입 / 비밀번호 초기화 / 홈
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgotpasswd",
    element: <ResetPasswdPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      // 홈 / 마이 페이지
      { path: "home", element: <HomePage /> },
      { path: "my/:userId", element: <MyPage /> },
      { path: "my/:userId/editinfo", element: <MyInfoPage /> },
      { path: "my/:userId/editpassword", element: <MyPwdPage /> },

      // 강의 종합
      { path: "lectureroom/:lectureId", element: <LectureHomePage /> },

      // 공지 사항
      { path: "notice/:lectureId", element: <NoticeListPage /> },
      { path: "notice/:lectureId/:postId", element: <NoticePostPage /> },

      // 자료실
      { path: "archives/:lectureId", element: <ArchivesListPage /> },
      { path: "archives/:lectureId/:postId", element: <ArchivesPostPage /> },

      // 과제
      { path: "assignment/:lectureId", element: <AssignListPage /> },
      {
        path: "assignment/:lectureId/:postId/:studentId",
        element: <AssignSubmittedDetailPage />,
      },
      {
        path: "/assignment/:lectureId/edit/:postId/:studientId",
        element: <AssignPostPage />,
      },

      // QnA
      { path: "qna/:lectureId", element: <QnAListPage /> },
      { path: "qna/:lectureId/:postId", element: <QnAPostPage /> },
      { path: "qna/:lectureId/write", element: <QnAWritePage /> },
      { path: "/qna/:lectureId/edit/:postId", element: <QnAWritePage /> },

    ],
  },
  // 학생 (사용자)
  {
    path: "/student/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 수강 신청 / 대시 보드 / 시간표
      { path: "sugang", element: <SugangPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "timetable", element: <TimetablePage /> },

      // 과제
      { path: "assignment/:lectureId/:postId", element: <AssignPostPage /> },

      // 성적 / 석차
      { path: "grade", element: <StudGradePage /> },
      { path: "rank", element: <StudRankPage /> },

      // 학적 변동 (휴학 신청)
      { path: "leave/request", element: <LeaveRequestPage /> },

      // 출석 / 강의 계획서
      { path: "attendance", element: <StudLectureList /> },
      { path: "attendance/:lectureId", element: <StudAttendPage /> },
      { path: "syllabus", element: <StudSyllabusSearchPage /> },
      { path: "syllabus/:lectureId", element: <StudSyllabusPage /> },
    ],
  },
  // 교수 (사용자)
  {
    path: "/professor/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 공지 사항
      {
        path: "notice/:lectureId/write",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <NoticeWritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "notice/:lectureId/edit/:postId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <NoticeWritePage />
          </ProtectedRoute>
        ),
      },
      // 자료실
      {
        path: "archives/:lectureId/write",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ArchivesWritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "archives/:lectureId/edit/:postId",
        element: (<ProtectedRoute allowedRoles={["faculty"]}>
          <ArchivesWritePage />
        </ProtectedRoute>
        ),
      },
      // 과제
      {
        path: "assignment/:lectureId/write",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <AssignWritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "assignment/:lectureId/:postId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <AssignSubmitListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "assignment/:lectureId/edit/:postId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <AssignWritePage />
          </ProtectedRoute>
        ),
      },
      // 성적
      {
        path: "grade/input/",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <GradeListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "grade/input/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <GradeInputPage />
          </ProtectedRoute>
        ),
      },
      // 출석
      {
        path: "attendance",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfLectureList />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfAttendPage />
          </ProtectedRoute>
        ),
      },
      // 강의 계획서
      {
        path: "syllabus",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfSyllabusListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "syllabus/:lectureId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfSyllabusPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // 관리자(교직원)
  {
    path: "/staff/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 구성원 관리 / 학적 관리 (휴학 승인)
      { path: "management/add", element: <AddMemberPage /> },
      { path: "management/delete", element: <DeleteMemberPage /> },
      { path: "leave/approval", element: <LeaveApprovalPage /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
