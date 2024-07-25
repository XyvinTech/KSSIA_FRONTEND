import React from "react";
import styled, { css } from "styled-components";

const buttonVariants = css`
  ${(props) =>
    props.variant === "primary" &&
    css`
      font-family: Inter;
      border: none;
      font-size: 16px;
      font-weight: 600;
      color: #FCFDFE;
      line-height: 18px;
      background-color: #004797;
      radius:200px;
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      font-family: Inter;
      border: 1px solid #a8a8a8;
      font-size: 16px;
      font-weight: 600;
      color: #004797;
      line-height: 18px;
      background-color: #F3EFEF;
      radius:200px;
    `}


${(props) =>
  props.variant === "third" &&
  css`
    font-family: Inter;
    border: 1px solid #a8a8a8;
    font-size: 16px;
    font-weight: 600;
    color: #4A4647;
    line-height: 18px;
    background-color: #F3EFEF;
    radius:200px;
  `}
`;

const disabledStyles = css`
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const ButtonContainer = styled.button`
  padding: 16px 20px;
  text-align: center;
  width: 100%;
  font-family: "Inter", "sans-serif";
  display: flex;
  
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
  ${buttonVariants}
  ${disabledStyles}
`;

export const StyledButton = ({ name, variant, color, onClick, disabled }) => {
  return (
    <ButtonContainer
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </ButtonContainer>
  );
};