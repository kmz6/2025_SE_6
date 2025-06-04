import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./AssignWritePage.css";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";

export default function AssignWritePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [initialValues, setInitialValues] = useState({ title: "", content: "", start_date: "", end_date: "" });

  const fetchCourseName = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseName(response.data.course_name);
      setCourseCode(response.data.course_code);
    } catch (error) {
      console.error("과목명 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchCourseName();
  }, [lectureId]);

  const handleSubmit = async (formData, values) => {
    const { start_date, end_date } = values;

    if (!start_date) {
      alert("과제 제출 시작일을 입력해주세요.");
      return;
    }
    if (!end_date) {
      alert("과제 제출 마감일을 입력해주세요.");
      return;
    }

    // 날짜 비교: 시간을 00:00:00으로 초기화하고 비교
    const startDate = new Date(start_date).setHours(0, 0, 0, 0);
    const endDate = new Date(end_date).setHours(0, 0, 0, 0);

    if (endDate < startDate) {
      alert("마감일은 시작일보다 이전일 수 없습니다.");
      return;
    }

    try {
      const newAssignment = {
        title: values.title,
        content: values.content,
        start_date: start_date,
        end_date: end_date,
        author_id: user.user_id,
      };

      await axiosInstance.post(`/api/lectures/${lectureId}/assignments`, newAssignment);
      alert("과제 등록 완료");
      navigate(`/assignment/${lectureId}`);
    } catch (error) {
      console.error("과제 등록 실패:", error);
      alert("과제 등록 중 오류 발생");
    }
  };

  return (
    <div className="assign-write-container">
      <h1 className="board-title">과제 등록</h1>

      <PostHeader subjectName={courseName} subjectCode={courseCode} />

      <div className="date-inputs">
        <label>
          제출 시작일:{" "}
          <input
            type="date"
            value={initialValues.start_date}
            onChange={(e) => setInitialValues({ ...initialValues, start_date: e.target.value })}
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          제출 마감일:{" "}
          <input
            type="date"
            value={initialValues.end_date}
            onChange={(e) => setInitialValues({ ...initialValues, end_date: e.target.value })}
          />
        </label>
      </div>

      <PostWriteForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="등록"
      />
    </div>
  );
}
