import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from "./layout/root-layout";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import LectureHomePage from "./pages/student/LectureRoomPage";
import NoticeListPage from "./pages/studfac/NoticeListPage";
import NoticePostPage from "./pages/studfac/NoticePostPage";
import MyPage from "./pages/MyPage";
import TimetablePage from "./pages/student/TimetablePage";
import StudLectureList from "./pages/student/StudLectureList";
import StudAttendPage from "./pages/student/StudAttendPage";
import ProfLectureList from "./pages/faculty/ProfLectureList";
import ProfAttendPage from "./pages/faculty/ProfAttendPage";
import SugangPage from "./pages/student/SugangPage";
import LeaveRequestPage from "./pages/student/LeaveRequestPage";
import LeaveApprovalPage from "./pages/staff/LeaveApprovalPage";
import ArchivesListPage from "./pages/studfac/ArchivesListPage";
import AddMemberPage from "./pages/staff/AddMemberPage";
import DeleteMemberPage from "./pages/staff/DeleteMemberPage";
import GradeListPage from "./pages/faculty/GradeListPage";
import GradeInputPage from "./pages/faculty/GradeInputPage";
import StudSyllabusPage from "./pages/student/StudSyllabusPage";
import ProfSyllabusPage from "./pages/faculty/ProfSyllabusPage";
import StudSyllabusSearchPage from "./pages/student/StudSyllabusSearchPage";
import ProfSyllabusListPage from "./pages/faculty/ProfSyllabusListPage";
import ArchivesPostPage from "./pages/studfac/ArchivesPostPage";
import NoticeWritePage from "./pages/faculty/NoticeWritePage";
import ArchivesWritePage from "./pages/faculty/ArchivesWritePage";
import DashboardPage from "./pages/student/DashboardPage";
import AssignListPage from "./pages/studfac/AssignListPage";
import AssignPostPage from "./pages/student/AssignPostPage";
import AssignWritePage from "./pages/faculty/AssignWritePage";
import StudGradePage from "./pages/student/StudGradePage";
import StudRankPage from "./pages/student/StudRankPage";
import AssignSubmitListPage from "./pages/faculty/AssignSubmitListPage";
import AssignSubmittedDetailPage from "./pages/studfac/AssignSubmittedDetailPage";
import ResetPasswdPage from "./pages/studfac/ResetPasswdPage";
import QnAListPage from "./pages/studfac/QnALIstPage";
import QnAPostPage from "./pages/studfac/QnAPostPage";
import QnAWritePage from "./pages/studfac/QnAWritePage";
import MyInfoPage from "./pages/MyInfoPage";
import MyPwdPage from "./pages/MyPwdPage";

const router = createBrowserRouter([
  {
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
      { path: "home", element: <HomePage /> },
      { path: "my/:userId", element: <MyPage /> },
      { path: "my/:userId/editinfo", element: <MyInfoPage /> },
      { path: "my/:userId/editpassword", element: <MyPwdPage /> },
      { path: "lectureroom/:lectureId", element: <LectureHomePage /> },
      { path: "notice/:lectureId", element: <NoticeListPage /> },
      { path: "notice/:lectureId/:postId", element: <NoticePostPage /> },
      { path: "archives/:lectureId", element: <ArchivesListPage /> },
      { path: "archives/:lectureId/:postId", element: <ArchivesPostPage /> },
      { path: "assignment/:lectureId", element: <AssignListPage /> },
      {
        path: "assignment/:lectureId/:postId/:studentId",
        element: <AssignSubmittedDetailPage />,
      },
      { path: "qna/:lectureId", element: <QnAListPage /> },
      { path: "qna/:lectureId/:postId", element: <QnAPostPage /> },
      { path: "qna/:lectureId/write", element: <QnAWritePage /> },
      {
        path: "/professor/notice/:lectureId/edit/:postId",
        element: <NoticeWritePage />,
      },
      {
        path: "/professor/archives/:lectureId/edit/:postId",
        element: <ArchivesWritePage />,
      },
      { path: "/qna/:lectureId/edit/:postId", element: <QnAWritePage /> },
      {
        path: "/assignment/:lectureId/edit/:postId/:studientId",
        element: <AssignPostPage />,
      },
    ],
  },
  {
    path: "/student/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "sugang", element: <SugangPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "timetable", element: <TimetablePage /> },
      { path: "assignment/:lectureId/:postId", element: <AssignPostPage /> },
      { path: "grade", element: <StudGradePage /> },
      { path: "rank", element: <StudRankPage /> },
      { path: "leave/request", element: <LeaveRequestPage /> },
      { path: "attendance", element: <StudLectureList /> },
      { path: "attendance/:lectureId", element: <StudAttendPage /> },
      { path: "syllabus", element: <StudSyllabusSearchPage /> },
      { path: "syllabus/:lectureId", element: <StudSyllabusPage /> },
    ],
  },
  {
    path: "/professor/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "notice/:lectureId/write",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <NoticeWritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "archives/:lectureId/write",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ArchivesWritePage />
          </ProtectedRoute>
        ),
      },
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
  {
    path: "/staff/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
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
