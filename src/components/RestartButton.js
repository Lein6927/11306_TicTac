import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ParentContainer = styled.div`
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
`;

//重新開始的樣式
const StyledRestartButton = styled.div`
  width: 310px;
  background: ${(props) => props.theme.restartButton.normal};
  color: ${(props) => props.theme.color};
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  vertical-align: middle;

  &:hover {
    background: ${(props) => props.theme.restartButton.hover};
  }

  &:active {
    background: ${(props) => props.theme.restartButton.active};
  }

  border-radius: 10px;
  font-family: "Black Han Sans", sans-serif;
  font-size: 24px;
  font-weight: bold;

  cursor: pointer;
`;

const RestartButton = ({ onClick }) => {
  console.log("reset");
  return (
    <ParentContainer>
      <StyledRestartButton onClick={onClick}>
        <span>重新開始</span>
      </StyledRestartButton>
    </ParentContainer>
  );
};
RestartButton.propTypes = {
  onClick: PropTypes.func,
};

export default RestartButton;
