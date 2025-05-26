import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  font-family: "Pretendard", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const Button = styled.button`
  height: 45px;
  background-color: #0078ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

function ResetPasswdPage() {
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 정보 일치 확인
        const isStudentMatch =
            studentId === studentData.student_id &&
            name === studentData.name &&
            email === studentData.email;

        const matchedFaculty = facultyData.find(
            (fac) =>
                studentId === fac.faculty_id &&
                name === fac.name &&
                email === fac.email
        );

        if (isStudentMatch || matchedFaculty) {
            userData.password = "0000";
            alert("비밀번호가 '0000'으로 초기화되었습니다.\n로그인 후 마이페이지에서 비밀번호를 변경해 주세요.");
            navigate("/login");
        } else {
            alert("입력하신 정보가 일치하지 않습니다.");
        }
    };

    return (
        <Container>
            <Logo src="../images/1506.png" alt="1506" onClick={() => navigate("/login")} />
            <h2 style={{ marginBottom: "20px" }}>비밀번호 찾기</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="학번/사번"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit">비밀번호 초기화</Button>
            </Form>
        </Container>
    );
}

export default ResetPasswdPage;