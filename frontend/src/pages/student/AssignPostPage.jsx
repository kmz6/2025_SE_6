import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./AssignPostPage.css";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";

export default function AssignPostPage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();

  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [assignment, setAssignment] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState(null);

  const [initialValues, setInitialValues] = useState({ title: "", content: "" });

  const fetchCourseInfo = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseName(res.data.course_name);
      setCourseCode(res.data.course_code);
    } catch (err) {
      console.log("과목 정보 불러오기 실패:", err);
    }
  };

  const fetchAssignmentDetail = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/assignments/${postId}`);
      setAssignment(res.data);
      setInitialValues({ title: res.data.title, content: res.data.content });
    } catch (err) {
      console.log("과제 상세 정보 불러오기 실패:", err);
    }
    setLoading(false);
  };

    const fetchSubmission = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`,
        { params: { author_id: studentId } }
      );
      if (res.data.length > 0) {
        setSubmission(res.data[0]);
      } else {
        setSubmission(null);
      }
    } catch (err) {
      console.error("제출 과제 조회 실패", err);
      setError("제출 과제 조회 실패");
    }
  };

  useEffect(() => {
    if (lectureId && postId) {
      fetchCourseInfo();
      fetchAssignmentDetail();
    }
  }, [lectureId, postId]);

const handleSubmit = async (values) => {
  try {
    const formData = new FormData();
    formData.append("title", assignment?.title);
    formData.append("author_id", currentUserId);
    formData.append("content", values.content);

    await axiosInstance.post(
      `/api/lectures/${lectureId}/assignments/${postId}/submissions`,
      formData
    );

    alert("과제 제출 완료");
    navigate(`/assignments/${lectureId}`);
  } catch (err) {
    console.error("과제 제출 오류:", err.response?.data || err.message);
    alert("과제 제출 중 오류가 발생했습니다.");
  }
};

  if (loading) return <div>로딩 중...</div>;
  if (!assignment) return <div>과제를 불러올 수 없습니다.</div>;

  return (
    <div className="assign-post-container">
      <h1 className="board-title">과제 제출</h1>

      <PostHeader
        subjectName={courseName}
        subjectCode={courseCode}
        onEdit={() => {}}
        onDelete={() => {}}
        authorId={assignment.author_id}
        currentUserId={currentUserId}
      />

      <PostBox
        title={assignment.title}
        author={assignment.author_id}
        date={`${assignment.start_date?.slice(0, 10)} ~ ${assignment.end_date?.slice(0, 10)}`}
        content={assignment.content}
        attachment={assignment.attachments?.[0]}
      />

      <h2 className="submission-title">과제 제출란</h2>

      <PostWriteForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}
