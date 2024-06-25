import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import TicTacToe from "./TicTacToe";
import themes from "./themes";

const defaultTheme = Object.keys(themes)[0];

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme); //
  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <TicTacToe />
    </ThemeProvider>
  );
};

export default App;
//-----------------------

/*
//測試icon是否可讀到值
import React from "react";
import CircleIcon from "./components/Icons/CircleIcon";
import CrossIcon from "./components/Icons/CrossIcon";

const App = () => {
  return (
    <div>
      <h1>Welcome to the Chess Game</h1>
      <div>
        <h2>Circle Icon</h2>
        <CircleIcon width={50} height={50} />
      </div>
      <div>
        <h2>Cross Icon</h2>
        <CrossIcon width={50} height={50} />
      </div>
    </div>
  );
};

export default App;
*/
