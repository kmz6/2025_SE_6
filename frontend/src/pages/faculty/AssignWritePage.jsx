import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../../components/Board/BoardHeader";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./AssignWritePage.css";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";

export default function AssignWritePage() {
  const { lectureId, postId } = useParams();
  const isEdit = Boolean(postId);
  const navigate = useNavigate();
  const { user } = useUser();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchCourseInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/lectures/${lectureId}/info`
      );
      setCourseName(response.data.course_name);
      setCourseCode(response.data.course_code);
    } catch (error) {
      console.error("과목명 불러오기 실패:", error);
    }
  };

  const fetchAssignment = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${postId}`
      );
      const data = res.data.data;
      setInitialValues({
        title: data.title ?? "",
        content: data.content ?? "",
        start_date: data.start_date?.slice(0, 10) ?? "",
        end_date: data.end_date?.slice(0, 10) ?? "",
      });
    } catch (error) {
      console.error("기존 과제 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchCourseInfo();
      if (isEdit) {
        await fetchAssignment();
      }
      setLoading(false);
    };
    load();
  }, [lectureId, postId]);

  if (loading) return <div>로딩 중...</div>;

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

    const startDate = new Date(start_date).setHours(0, 0, 0, 0);
    const endDate = new Date(end_date).setHours(0, 0, 0, 0);

    if (endDate < startDate) {
      alert("마감일은 시작일보다 이전일 수 없습니다.");
      return;
    }

    const newAssignment = {
      title: values.title,
      content: values.content,
      start_date: start_date,
      end_date: end_date,
      author_id: user.user_id,
    };

    try {
      if (isEdit) {
        await axiosInstance.put(
          `/api/lectures/${lectureId}/assignments/${postId}`,
          newAssignment
        );
        alert("과제가 수정되었습니다.");
      } else {
        await axiosInstance.post(
          `/api/lectures/${lectureId}/assignments`,
          newAssignment
        );
        alert("과제가 등록되었습니다.");
      }
      navigate(`/assignment/${lectureId}`);
    } catch (error) {
      console.error("과제 등록/수정 실패:", error);
      alert("과제 처리 중 오류 발생");
    }
  };

  return (
    <div className="assign-write-container">
      <h1 className="board-title">{isEdit ? "과제 수정" : "과제 등록"}</h1>

      <BoardHeader subjectName={courseName} subjectCode={courseCode} />

      <div className="date-inputs">
        <label>
          제출 시작일:
          <input
            type="date"
            value={initialValues.start_date ?? ""}
            onChange={(e) =>
              setInitialValues({ ...initialValues, start_date: e.target.value })
            }
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          제출 마감일:
          <input
            type="date"
            value={initialValues.end_date ?? ""}
            onChange={(e) =>
              setInitialValues({ ...initialValues, end_date: e.target.value })
            }
          />
        </label>
      </div>

      <PostWriteForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "수정" : "등록"}
      />
    </div>
  );
}
