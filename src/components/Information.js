import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Chess from "./Chess";

//樣式
const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 12px;
  background: #ffffff;
  .information_chess {
    width: 48px;
  }
`;

const Text = styled.div`
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 700;
  font-size: 32px;
  white-space: nowrap;
`;
//樣式結束

//判斷並輸出贏或是和局

const Information = ({ currentPlayerId, winnerId, isGameEnded }) => {
  const makeContent = () => {
    const hasWinner = winnerId !== 0;
    if (isGameEnded) {
      return <Text>和局</Text>;
    }

    if (!hasWinner) {
      console.log("顯示輪到文字");
      return (
        <>
          <Text>輪到:</Text>
          <Chess playerId={currentPlayerId} className="information_chess" />
        </>
      );
    }
    console.log("顯示贏家");
    return (
      <>
        <Chess playerId={winnerId} className="information_chess" />
        <Text>獲勝</Text>
      </>
    );
  };

  return <InformationContainer>{makeContent()}</InformationContainer>;
};

Information.propTypes = {
  currentPlayerId: PropTypes.number, //目前玩家
  winnerId: PropTypes.number, //判定贏家
  isGameEnded: PropTypes.bool, //判斷輸贏和局
};

export default Information;
