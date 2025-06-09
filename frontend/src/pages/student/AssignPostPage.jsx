import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostBox from "../../components/Post/PostBox";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./AssignPostPage.css";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";
import BoardHeader from "../../components/Board/BoardHeader";

export default function AssignPostPage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [assignment, setAssignment] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submissionExists, setSubmissionExists] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState(null);

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
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${postId}`
      );
      if (res.data.success) {
        setAssignment(res.data.data);
      }
    } catch (err) {
      console.log("과제 상세 정보 불러오기 실패:", err);
    }
  };

  const fetchAssignmentAttachments = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/assignments/${postId}/attachments`
      );

      if (res.data.success) {
        setAttachments(res.data.data);
      }
    } catch (err) {
      console.log("첨부파일 정보 불러오기 실패:", err);
    }
  };

  const checkExistingSubmission = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${postId}/submissions`
      );
      if (res.data.success) {
        const userSubmission = res.data.data.find(
          (sub) => sub.author_id === currentUserId
        );
        if (userSubmission) {
          setSubmissionExists(true);
          setExistingSubmission(userSubmission);
        } else {
          setSubmissionExists(false);
          setExistingSubmission(null);
        }
      }
    } catch (err) {
      console.log("제출 상태 확인 실패:", err);
    }
  };

  useEffect(() => {
    if (lectureId && postId) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([
          fetchCourseInfo(),
          fetchAssignmentDetail(),
          fetchAssignmentAttachments(),
        ]);
        if (currentUserId) {
          await checkExistingSubmission();
        }
        setLoading(false);
      };
      loadData();
    }
  }, [lectureId, postId, currentUserId]);

  const handleSubmit = async (formData, formDataValues) => {
    if (!currentUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (assignment && assignment.end_date) {
      const endDate = new Date(assignment.end_date);
      const now = new Date();
      if (now > endDate) {
        alert("과제 제출 기한이 지났습니다.");
        return;
      }
    }

    try {
      const isEditMode = submissionExists && existingSubmission;
      const submissionId =
        existingSubmission?.id ||
        existingSubmission?.submission_id ||
        existingSubmission?.post_id;

      const apiUrl =
        isEditMode && submissionId
          ? `/api/lectures/${lectureId}/assignments/${postId}/submissions/${submissionId}`
          : `/api/lectures/${lectureId}/assignments/${postId}/submissions`;

      const httpMethod = isEditMode && submissionId ? "put" : "post";

      if (formDataValues.file) {
        const submitFormData = new FormData();
        submitFormData.append(
          "title",
          formDataValues.title || `${assignment?.title} 제출물`
        );
        submitFormData.append("author_id", currentUserId);
        submitFormData.append("content", formDataValues.content);
        submitFormData.append("file", formDataValues.file);

        const res = await axiosInstance[httpMethod](apiUrl, submitFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          alert(
            res.data.message ||
            `과제 ${isEditMode && submissionId ? "수정" : "제출"} 완료`
          );
          navigate(`/assignment/${lectureId}`);
        } else {
          alert(
            res.data.message ||
            `과제 ${isEditMode && submissionId ? "수정" : "제출"
            } 중 오류가 발생했습니다.`
          );
        }
      } else {
        const submitData = {
          title: formDataValues.title || `${assignment?.title} 제출물`,
          author_id: currentUserId,
          content: formDataValues.content,
        };

        const res = await axiosInstance[httpMethod](apiUrl, submitData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data.success) {
          alert(
            res.data.message ||
            `과제 ${isEditMode && submissionId ? "수정" : "제출"} 완료`
          );
          navigate(`/assignment/${lectureId}`);
        } else {
          alert(
            res.data.message ||
            `과제 ${isEditMode && submissionId ? "수정" : "제출"
            } 중 오류가 발생했습니다.`
          );
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "과제 제출/수정 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return dateString.slice(0, 10);
    }
  };

  const getDeadlineStatus = () => {
    if (!assignment?.end_date) return "";
    const endDate = new Date(assignment.end_date);
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysDiff < 0) {
      return { text: "마감됨", className: "deadline-passed" };
    } else if (daysDiff === 0) {
      return { text: "오늘 마감", className: "deadline-today" };
    } else if (daysDiff <= 3) {
      return { text: `${daysDiff}일 남음`, className: "deadline-soon" };
    } else {
      return { text: `${daysDiff}일 남음`, className: "deadline-normal" };
    }
  };

  if (loading || !assignment) return <div>로딩 중...</div>;

  if (!currentUserId) {
    return (
      <div className="assign-post-container">
        <h1 className="board-title">과제 제출</h1>
        <div className="login-required">
          <p>과제 제출을 위해 로그인이 필요합니다.</p>
          <button onClick={() => navigate("/login")}>로그인하기</button>
        </div>
      </div>
    );
  }

  const deadlineStatus = getDeadlineStatus();
  const isDisabled = assignment && new Date() > new Date(assignment.end_date);

  return (
    <div className="assign-post-container">
      <h1 className="board-title">과제 제출</h1>
      <BoardHeader subjectName={courseName} subjectCode={courseCode} />
      <PostBox
        title={assignment.title}
        author={assignment.name}
        date={`${formatDate(assignment.start_date)} ~ ${formatDate(
          assignment.end_date
        )}`}
        content={assignment.content}
        attachment={attachments}
      />
      {deadlineStatus && (
        <div className={`deadline-status ${deadlineStatus.className}`}>
          과제 기한: {deadlineStatus.text}
        </div>
      )}
      {submissionExists && (
        <div className="submission-notice">
          <p>이미 제출한 과제입니다. 아래에서 수정할 수 있습니다.</p>
          <p>기존 제출 내용: {existingSubmission?.title}</p>
        </div>
      )}
      <h2 className="submission-title">
        {submissionExists ? "과제 수정" : "과제 제출"}
      </h2>
      <PostWriteForm
        onSubmit={handleSubmit}
        initialValues={{
          title: existingSubmission?.title ?? "",
          content: existingSubmission?.content ?? "",
        }}
        submitLabel={submissionExists ? "과제 수정" : "과제 제출"}
        disabled={isDisabled}
      />
    </div>
  );
}
