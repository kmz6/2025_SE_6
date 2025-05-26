import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
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
  margin-top: 10px;
  margin-bottom: 0px;

  &:hover {
    background-color: #005fd1;
  }
`;

const AuthForm = ({ title, fields, onSubmit, buttonText }) => {
  const navigate = useNavigate();

  return (
    <>
      <Logo src="../images/1506.png" alt="logo" onClick={() => navigate("/login")} />
      <Title>{title}</Title>
      <Form onSubmit={onSubmit}>
        {fields.map((field, idx) => (
          <Input
            key={idx}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        ))}
        <Button type="submit">{buttonText}</Button>
      </Form>
    </>
  );
};

export default AuthForm;