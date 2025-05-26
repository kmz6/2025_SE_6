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
import ManagementPage from "./pages/staff/ManagementPage";
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
import AssignWritePage from "./pages/student/AssignWritePage";
import StudGradePage from "./pages/student/StudGradePage";
import StudRankPage from "./pages/student/StudRankPage";
import AssignSubmitListPage from "./pages/faculty/AssignSubmitListPage";
import AssignSubmittedDetailPage from "./pages/faculty/AssignSubmittedDetailPage";

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
      { path: "home", element: <HomePage /> },
      { path: "my", element: <MyPage /> },
      { path: "lectureroom/:lectureId", element: <LectureHomePage /> },
      { path: "notice/:lectureId", element: <NoticeListPage /> },
      { path: "notice/:lectureId/:postId", element: <NoticePostPage /> },
      { path: "archives/:lectureId", element: <ArchivesListPage /> },
      { path: "archives/:lectureId/:postId", element: <ArchivesPostPage /> },
    ],
  },
  {
    path: "/student/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "sugang", element: <SugangPage /> },
      { path: "dashboard", element: <DashboardPage /> },
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
      // 여기부터 추가가
    ],
  },
  {
    path: "/staff/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "management", element: <ManagementPage /> }],
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
