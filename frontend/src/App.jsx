import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import LectureHomePage from "./pages/LectureRoomPage";
import NoticeListPage from "./pages/NoticeListPage";
import NoticePostPage from "./pages/NoticePostPage";
import MyPage from "./pages/MyPage";
import TimetablePage from "./pages/TimetablePage";
import StudLectureList from "./pages/StudLectureList";
import StudAttendPage from "./pages/StudAttendPage";
import ProfLectureList from "./pages/ProfLectureList";
import ProfAttendPage from "./pages/ProfAttendPage";
import SugangPage from "./pages/SugangPage";
import LeaveRequestPage from "./pages/LeaveRequestPage";
import LeaveApprovalPage from "./pages/LeaveApprovalPage";
import ArchivesListPage from "./pages/ArchivesListPage";
import ManagementPage from "./pages/ManagementPage";
import GradeInputPage from "./pages/GradeInputPage";
import { UserProvider } from "./context/UserContext";
import StudSyllabusPage from "./pages/StudSyllabusPage";
import ProfSyllabusPage from "./pages/ProfSyllabusPage";
import StudSyllabusSearchPage from "./pages/StudSyllabusSearchPage";
import ProfSyllabusListPage from "./pages/ProfSyllabusListPage";
import ArchivesPostPage from "./pages/ArchivesPostPage";
import NoticeWritePage from "./pages/NoticeWritePage";
import ArchivesWritePage from "./pages/ArchivesWritePage";
import DashboardPage from "./pages/DashboardPage";
import AssignListPage from "./pages/AssignListPage";
import AssignPostPage from "./pages/AssignPostPage";
import AssignWritePage from "./pages/AssignWritePage";
import StudGradePage from "./pages/StudGradePage";
import StudRankPage from "./pages/StudRankPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "lectureroom", element: <LectureHomePage /> },
      { path: "notice/:lectureId", element: <NoticeListPage /> },
      { path: "notice/:lectureId/:postId", element: <NoticePostPage /> },
      {
        path: "notice/:lectureId/write",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <NoticeWritePage />
          </ProtectedRoute>
        ),
      },
      { path: "archives/:lectureId", element: <ArchivesListPage /> },
      { path: "archives/:lectureId/:postId", element: <ArchivesPostPage /> },
      { path: "archives/:lectureId/write", element: <ArchivesWritePage /> },

      // ✅ Protected routes
      {
        path: "my",
        element: (
          <ProtectedRoute allowedRoles={["student", "faculty", "staff"]}>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "timetable",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <TimetablePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance/student",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudLectureList />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance/student/:lectureId",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudAttendPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance/professor",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfLectureList />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance/professor/:lectureId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfAttendPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "sugang",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <SugangPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "leave-request",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <LeaveRequestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "leave-approval",
        element: (
          <ProtectedRoute allowedRoles={["staff"]}>
            <LeaveApprovalPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "gradeInput/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <GradeInputPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "syllabus/professor",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfSyllabusListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "syllabus/professor/:lectureId",
        element: (
          <ProtectedRoute allowedRoles={["faculty"]}>
            <ProfSyllabusPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "syllabus/student",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudSyllabusSearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "syllabus/student/:lectureId",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudSyllabusPage />
          </ProtectedRoute>
        ),
      },
      { path: "assignment/:lectureId", element: <AssignListPage /> },
      {
        path: "assignment/:lectureId/:postId",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <AssignPostPage />
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
        path: "student/grade",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudGradePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "student/rank",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudRankPage />
          </ProtectedRoute>
        ),
      },
      { path: "management",
        element: (
          <ProtectedRoute allowedRoles={["staff"]}>
            <ManagementPage />
          </ProtectedRoute>
        ),
      },
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
