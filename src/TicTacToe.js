//import { useState, useEffect } from "react";
import React from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";
import Information from "./components/Information";
import Squares1 from "./components/Squares";
import RestartButton from "./components/RestartButton";
import SwitchMode from "./components/SwitchMode";
import { useState } from "react";

//樣式
//background: ${(props) => props.theme.background};
const TicTacToeGame = styled.div`
  * {
    border: 1px solid #000;
    padding: 4px;
  }
  display: flex;
  justify-content: center;
  background: #eeeeee;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;

  .container {
    display: flex;
    flex-direction: column;
    & > *:not(:first-of-type) {
      margin-top: 4px; // 給元件之間一點間距
    }
    /*元件設間距*/
  }
  .actions {
    & > *:not(:first-of-type) {
      margin-top: 4px;
      display: flex;
    }

    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
`;

//------------
const PLAYERS = [1, -1];
//窮舉法 算出獲勝的陣列
const WINNER_STEPS_LIST = [
  //橫
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //直
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //斜
  [2, 4, 6],
  [0, 4, 8],
];
const defaultUsersSteps = {
  [1]: [],
  [-1]: [],
};

//------------

//判斷勝負
//const hasWinner = winnerId !== 0;

const getJudgment = (playersStepsMap) => {
  //接收playersStepsMap參數
  const playerIds = Object.keys(playersStepsMap).map((playerId) =>
    Number(playerId)
  ); //抓取玩家ID 再用map將ID轉換為數字類型存在playerId 中

  let winnerId = 0;
  let winnerStepsList = []; //存現在玩家的步數

  playerIds.forEach((playerId) => {
    //檢查每個玩家的步數

    const userSteps = playersStepsMap[playerId]; //取出對應玩家步數列表
    const remainingStepsList = WINNER_STEPS_LIST.map(
      (steps) =>
        //計算每個玩家的剩餘步數；WINNER_STEPS_LIST為上面窮矩陣預算出的獲勝可能
        steps.filter((step) => userSteps.indexOf(step) === -1)
      //filter() 過濾出玩家還沒達到的步數，也就是玩家還差幾步才能獲勝
    );
    const foundWinner =
      remainingStepsList.filter((steps, index) => {
        //過濾出已經獲勝或是快獲勝的玩家
        if (steps.length === 0) {
          winnerStepsList = [...winnerStepsList, WINNER_STEPS_LIST[index]];
          //將獲勝的組合記錄在winnerStepsList中
          console.log("winner!!!");
          return true;
        } else {
          return false;
        }
      }).length > 0;

    if (foundWinner) {
      winnerId = playerId;
    }
  });
  return {
    winnerId,
    winnerStepsList, //勝利線路
  };
};

//------------
//畫面顯示
const TicTacToe = () => {
  const [playersStepsMap, setPlayersStepsMap] = useState(defaultUsersSteps);

  const handleResetAll = () => {
    setCurrentPlayerId(PLAYERS[0]);
    setPlayersStepsMap(defaultUsersSteps); //回到初值
    setJudgmentInfo({
      winnerId: 0,
      winnerStepsList: [],
    });
  };
  const [currentPlayerId, setCurrentPlayerId] = useState(PLAYERS[0]);
  const [judgmentInfo, setJudgmentInfo] = useState({
    winnerId: 0,
    winnerStepsList: [],
  });
  const { winnerId, winnerStepsList } = judgmentInfo;
  /*
  const hasWinner = winnerId === 0;
  const isGameEnded = PLAYERS.flatMap(
    (playerId) => playersStepsMap[playerId].length === 9 && hasWinner
  );
  */
  //
  const totalSteps = PLAYERS.flatMap((playerId) => playersStepsMap[playerId]);
  const isGameEnded = totalSteps.length === 9 && winnerId === 0;

  const winnerSteps = winnerStepsList.flatMap((steps) => steps);

  const handleClickSquare = (squareId) => {
    //playersStepsMap用來記錄玩家1[0]和玩家2[1]的步驟
    const isSquareEnable =
      playersStepsMap[PLAYERS[0]].indexOf(squareId) === -1 &&
      playersStepsMap[PLAYERS[1]].indexOf(squareId) === -1;

    if (isSquareEnable) {
      const nextPlayerStepsMap = {
        ...playersStepsMap,
        [currentPlayerId]: [...playersStepsMap[currentPlayerId], squareId],
      };
      setPlayersStepsMap(nextPlayerStepsMap);
      setJudgmentInfo(getJudgment(nextPlayerStepsMap));
      setCurrentPlayerId((prev) => -1 * prev);
    }
  };

  //----------------------------------

  //
  return (
    <TicTacToeGame className="background">
      <div className="container">
        <Information
          currentPlayerId={currentPlayerId}
          winnerId={winnerId}
          isGameEnded={isGameEnded}
        />
        <Squares1
          playersStepsMap={playersStepsMap}
          winnerSteps={winnerSteps}
          handleClickSquare={handleClickSquare}
        />
        <div className="actions">
          <RestartButton onClick={handleResetAll} />
          <SwitchMode />
        </div>
      </div>
    </TicTacToeGame>
  );
};
export default TicTacToe;
