import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { resetPassword } from "../../apis/resetpwd/resetpwd";
import * as S from "../../styles/ResetPasswdPage.style";

function ResetPasswdPage() {
    const [userId, setuserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        if (modalMessage === "비밀번호 초기화가 완료되었습니다.") {
            navigate(`/login`);
        }
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await resetPassword({ user_id: userId, name, email });
            openModal("비밀번호 초기화가 완료되었습니다.");
        } catch (err) {
            openModal("입력하신 정보가 일치하지 않습니다.");
            console.error("초기화 실패:", err);
        }
    };

    return (
        <S.Container>
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
}

export default ResetPasswdPage;