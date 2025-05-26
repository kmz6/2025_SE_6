import React from "react"; // (필요 시 추가)
import { useParams } from "react-router-dom"; // 라우터 파라미터 가져오기
import CoursePlanForm from "../../components/Syllabus/SyllabusForm"; // 입력 폼
import { courseData } from "../../mocks/courseData"; // 가짜 데이터 목록

export default function ProfSyllabusPage() {
  const { lectureId } = useParams();

  const course = courseData.find(
    (c) => String(c.course_id) === String(lectureId)
  );

  const handleSubmit = (form) => {
    console.log("제출된 강의계획서:", form);
    // TODO: 나중에 fetch("/api/save-syllabus", ...) 등으로 백엔드 연동
  };

  if (!course) {
    return <div className="p-6">해당 강의 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">강의계획서 작성</h1>
      <CoursePlanForm initialData={course} onSubmit={handleSubmit} />
    </div>
  );
}
