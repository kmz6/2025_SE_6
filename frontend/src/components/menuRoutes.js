export const routeMap = {
  student: {
    시간표: "/student/timetable",
    "출석 관리": "/student/attendance",
    "강의 계획서 조회": "/student/syllabus",
    "수강/성적 조회": "/student/grade",
    "석차 조회": "/student/rank",
    "휴복학 신청": "/student/leave/request",
    "강의 종합": "/lectureroom/0",
    "대시 보드": "/student/dashboard",
    마이페이지: "/my/:userId",
    "수강 신청": "/student/sugang",
  },
  faculty: {
    "출석 관리": "/professor/attendance",
    "강의 계획서 작성": "/professor/syllabus",
    강의실: "/lectureroom/:lectureId",
    "성적 처리": "/professor/grade/input/:courseId",
    마이페이지: "/my/:userId",
  },
  staff: {
    "학적 관리": "/staff/leave/approval",
    "구성원 추가": "/staff/management/add",
    "구성원 삭제": "/staff/management/delete",
    마이페이지: "/my/:userId",
  },
};
