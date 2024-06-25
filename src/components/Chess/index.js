import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as CircleIcon } from "../assets/icons/CircleIcon.svg";
import { ReactComponent as CrossIcon } from "../assets/icons/CrossIcon.svg";

const Chess = ({ playerId, ...props }) => {
  console.log("playerId in Chess:", playerId);
  if (playerId === 1) {
    console.log("1");
    return <CircleIcon {...props} />;
  }
  if (playerId === -1) {
    console.log("-1");
    return <CrossIcon {...props} />;
  }
  return null;
};

Chess.propTypes = {
  playerId: PropTypes.number,
};

export default Chess;
