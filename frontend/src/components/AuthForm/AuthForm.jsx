import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/Auth.style";

const AuthForm = ({ title, fields, onSubmit, buttonText }) => {
  const navigate = useNavigate();

  return (
    <>
      <S.Logo src="../images/1506.png" alt="logo" onClick={() => navigate("/login")} />
      <S.Title>{title}</S.Title>
      <S.Form onSubmit={onSubmit}>
        {fields.map((field, idx) => (
          <S.Input
            key={idx}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        ))}
        <S.Button type="submit">{buttonText}</S.Button>
      </S.Form>
    </>
  );
};

export default AuthForm;