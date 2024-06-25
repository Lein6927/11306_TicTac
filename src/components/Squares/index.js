import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Square from "./Square";
import { PAGE_PADDING, MAX_CONTENT_WIDTH, COLOR_S_TEST } from "../../constant";

// 頁面長寬高
const GridContainer = styled.div`
  width: min(
    calc(100vw - ${PAGE_PADDING * 2}px),
    ${MAX_CONTENT_WIDTH - PAGE_PADDING * 2}px
  );
  height: min(
    calc(100vw - ${PAGE_PADDING * 2}px),
    ${MAX_CONTENT_WIDTH - PAGE_PADDING * 2}px
  );
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  color: ${COLOR_S_TEST};
`;

// 創造 [0]~[8]
const squareIds = new Array(9).fill(0).map((_, index) => index);

//const PLAYERS = [1, -1];

// 主程式
const Squares1 = ({ winnerSteps, playersStepsMap, handleClickSquare }) => {
  const playerIds = Object.keys(playersStepsMap);
  const getPlayerId = (squareId) => {
    let foundPlayerId = 0;
    playerIds.forEach((playerId) => {
      const steps = playersStepsMap[playerId];
      if (steps.indexOf(squareId) > -1) {
        foundPlayerId = Number(playerId);
      }
    });
    return foundPlayerId;
  };

  //測試用
  /*
const Square = ({ isWinnerStep, onClick, playerId }) => {
  const getPlayerSymbol = () => {
    if (playerId === 1) return "O";
    if (playerId === -1) return "X";
    return null;
  };*/
  //----測試結束----

  return (
    <GridContainer>
      {squareIds.map((squareId) => (
        <Square
          key={squareId}
          isWinnerStep={winnerSteps.indexOf(squareId) > -1}
          onClick={() => handleClickSquare(squareId)}
          playerId={getPlayerId(squareId)}
        />
      ))}
    </GridContainer>
  );
};

Squares1.propTypes = {
  winnerSteps: PropTypes.array,
  playersStepsMap: PropTypes.object,
  handleClickSquare: PropTypes.func,
};

export default Squares1;
