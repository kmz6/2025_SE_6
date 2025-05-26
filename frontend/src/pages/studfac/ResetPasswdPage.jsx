import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import {
    userData,
    studentData,
    facultyData,
    staffData,
} from "../../mocks/userData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

function ResetPasswdPage() {
    const [userId, setuserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🧪 입력값 확인
        console.log("입력값:", userId, name, email);

        // 🧪 데이터 구조 확인
        console.log("studentData:", studentData);
        console.log("facultyData:", facultyData);
        console.log("staffData:", staffData);

        // 🧪 조건 일치 여부 확인
        const matchedStudent =
            userId === studentData.student_id &&
            name === studentData.name &&
            email === studentData.email

        const matchedFaculty = facultyData.find(
            (fac) =>
                userId === fac.faculty_id &&
                name === fac.name &&
                email === fac.email
        );

        const matchedStaff = staffData.find(
            (staff) =>
                userId === staff.staff_id &&
                name === staff.name &&
                email === staff.email
        );

        console.log("matchedStudent:", matchedStudent);
        console.log("matchedFaculty:", matchedFaculty);
        console.log("matchedStaff:", matchedStaff);

        if (matchedStudent || matchedFaculty || matchedStaff) {
            console.log("✅ 일치하는 사용자 있음!");
            userData.password = "0000";
            alert("비밀번호가 '0000'으로 초기화되었습니다.");
            navigate("/login");
        } else {
            console.log("❌ 일치하는 사용자 없음");
            alert("입력하신 정보가 일치하지 않습니다.");
        }
    };

    return (
        <Container>
            <AuthForm
                title="비밀번호 찾기"
                fields={[
                    {
                        type: "text",
                        placeholder: "학번/사번",
                        value: userId,
                        onChange: (e) => setuserId(e.target.value),
                    },
                    {
                        type: "text",
                        placeholder: "이름",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                    },
                    {
                        type: "email",
                        placeholder: "이메일",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                    },
                ]}
                onSubmit={handleSubmit}
                buttonText="비밀번호 초기화"
            />
        </Container>
    );
}

export default ResetPasswdPage;