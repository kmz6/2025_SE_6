import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./QnAWritePage.css";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";
import PostWriteHeader from "../../components/Post/PostWriteHeader";

export default function QnAWritePage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [initialValues, setInitialValues] = useState({ title: "", content: "" });
  const isEdit = !!postId;

  const fetchCourseName = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseName(response.data.course_name);
      setCourseCode(response.data.course_code);
    } catch (error) {
      console.error("과목명 불러오기 실패:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/qna/${postId}`);
      setInitialValues({
        title: response.data.title,
        content: response.data.content,
      });
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchCourseName();
    if (isEdit) {
      fetchPost();
    }
  }, [lectureId, postId]);

  const handleSubmit = async (formData, values) => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/api/lectures/${lectureId}/qna/${postId}`, {
          title: values.title,
          content: values.content,
        });
        alert("수정 완료");
      } else {
        formData.append("author_id", user.user_id)
        await axiosInstance.post(`/api/lectures/${lectureId}/qna`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("등록 완료");
      }

      navigate(`/qna/${lectureId}`);
    } catch (error) {
      console.error("전송 실패:", error);
      alert(isEdit ? "수정 중 오류 발생" : "등록 중 오류 발생");
    }
  };

  return (
    <div className="qna-write-container">
      <h1 className="board-title">{isEdit ? "Q&A 수정" : "Q&A 작성"}</h1>
      <PostWriteHeader
        subjectName={courseName}
        subjectCode={courseCode}
      />

      <PostWriteForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}
