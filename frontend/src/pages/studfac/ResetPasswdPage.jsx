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
import { resetPassword } from "../../apis/resetpwd/resetpwd";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await resetPassword({ user_id: userId, name, email });
            alert(res.message);
            navigate("/login");
        } catch (err) {
            alert("입력하신 정보가 일치하지 않습니다.");
            console.error("❌ 초기화 실패:", err);
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