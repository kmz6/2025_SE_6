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
<<<<<<< Updated upstream
=======
import ArchivesListPage from "./pages/ArchivesListPage"
import StudSyllabusPage from "./pages/StudSyllabusPage";
import ProfSyllabusPage from "./pages/ProfSyllabusPage";
import StudSyllabusSearchPage from "./pages/StudSyllabusSearchPage";
import ProfSyllabusListPage from "./pages/ProfSyllabusListPage";
>>>>>>> Stashed changes

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
    children: [
      { index: true, element: <HomePage /> },
      { path: "lectureroom", element: <LectureHomePage /> },
      { path: "notice/:lectureId", element: <NoticeListPage /> },
      { path: "notice/:lectureId/:Postid", element: <NoticePostPage /> },
      { path: "my", element: <MyPage /> },
      { path: "timetable", element: <TimetablePage /> },
      { path: "attendance/student", element: <StudLectureList /> },
      { path: "attendance/student/:lectureId", element: <StudAttendPage /> },
      { path: "attendance/professor", element: <ProfLectureList /> },
      { path: "attendance/professor/:lectureId", element: <ProfAttendPage /> },
      { path: "sugang", element: <SugangPage /> },
      { path: "leave-request", element: <LeaveRequestPage /> },
      { path: "leave-approval", element: <LeaveApprovalPage /> },
      { path: "archives/:lectureId", element: <ArchivesListPage /> },
<<<<<<< Updated upstream
      { path: "gradeInput/:courseId", element: <GradeInputPage /> },
      { path: "management", element: <ManagementPage /> },
=======
      { path: "syllabus/professor", element: <ProfSyllabusListPage /> },
      { path: "syllabus/professor/:lectureId", element: <ProfSyllabusPage /> },
      { path: "syllabus/student", element: <StudSyllabusSearchPage /> },
      { path: "syllabus/student/:lectureId", element: <StudSyllabusPage /> },
>>>>>>> Stashed changes
    ],
    errorElement: <ErrorPage />,
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
