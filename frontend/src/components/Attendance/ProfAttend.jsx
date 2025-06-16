import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAttendanceData, saveAttendanceData } from "../../apis/attendance/attendance";
import * as S from "../../styles/Attend.style";

const attendanceOptions = ["출석", "지각", "결석", "공결"];

const ProfAttend = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [week, setWeek] = useState(1);
  const [session, setSession] = useState(1);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const loadAttendance = async () => {
    const data = await fetchAttendanceData(courseId, week, session);
    setStudents(data);
    const existing = {};
    data.forEach((stu) => {
      if (stu.attend_status) existing[stu.student_id] = mapStatusToKorean(stu.attend_status);
    });
    setAttendance(existing);
  };

  useEffect(() => {
    console.log("useParams 결과:", courseId);
    loadAttendance();
  }, [courseId, week, session]);

  const handleChange = (studentId, value) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleReset = () => {
    setAttendance({});
  };

  const handleSave = async () => {
    try {
      const mapped = Object.fromEntries(
        Object.entries(attendance).map(([id, status]) => [id, mapKoreanToStatus(status)])
      );
      await saveAttendanceData(courseId, week, session, mapped);
      openModal("출석 정보 저장에 성공하였습니다.");
    } catch {
      openModal("출석 정보 저장에 실패하였습니다.");
    }
  };

  return (
    <S.Container>
      <S.Title>출석부</S.Title>
      <S.OptionBox>
        <label>
          주차:
          <select value={week} onChange={(e) => setWeek(Number(e.target.value))}>
            {[...Array(16)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}주차
              </option>
            ))}
          </select>
        </label>
        <label>
          회차:
          <select value={session} onChange={(e) => setSession(Number(e.target.value))}>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}회차
              </option>
            ))}
          </select>
        </label>
      </S.OptionBox>

      <S.Table>
        <thead>
          <S.Row>
            <S.CellHead>학번</S.CellHead>
            <S.CellHead>이름</S.CellHead>
            <S.CellHead>출석 선택</S.CellHead>
            <S.CellHead>상태</S.CellHead>
          </S.Row>
        </thead>
        <tbody>
          {students.map((stu) => (
            <S.Row key={stu.student_id}>
              <S.Cell>{stu.student_id}</S.Cell>
              <S.Cell>{stu.name}</S.Cell>
              <S.Cell>
                {attendanceOptions.map((opt) => (
                  <label key={opt} style={{ marginRight: "5px" }}>
                    <input
                      type="radio"
                      name={`attend-${stu.student_id}`}
                      value={opt}
                      checked={attendance[stu.student_id] === opt}
                      onChange={(e) => handleChange(stu.student_id, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </S.Cell>
              <S.Cell>{attendance[stu.student_id] || " "}</S.Cell>
            </S.Row>
          ))}
        </tbody>
      </S.Table>

      <S.ButtonWrapper>
        <S.Button onClick={handleReset}>초기화</S.Button>
        <S.Button onClick={handleSave}>저장</S.Button>
      </S.ButtonWrapper>

      {modalVisible && (
        <S.ModalOverlay>
          <S.Modal>
            <p>{modalMessage}</p>
            <S.ModalCloseButton onClick={closeModal}>확인</S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

const mapStatusToKorean = (status) => {
  switch (status) {
    case "attend":
      return "출석";
    case "late":
      return "지각";
    case "absent":
      return "결석";
    case "excused":
      return "공결";
    default:
      return "";
  }
};

const mapKoreanToStatus = (kor) => {
  switch (kor) {
    case "출석":
      return "attend";
    case "지각":
      return "late";
    case "결석":
      return "absent";
    case "공결":
      return "excused";
    default:
      return null;
  }
};

export default ProfAttend;