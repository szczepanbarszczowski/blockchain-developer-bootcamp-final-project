import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  background-color: ${({theme}) => theme.green};
  cursor: pointer;
`;

export default Button;
