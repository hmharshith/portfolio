import React from "react"
import GameContext from "./state/context"
import BlackJack from "./BlackJack";
import PlayersInputScreen from "./components/PlayersInputScreen"
import useBlackJack from "./state/hook";

const App = () => {
  const contextValue = useBlackJack();
  const { gameUiState } = contextValue.status;
  return <GameContext.Provider value={contextValue}>
    {gameUiState == 'PLAYER_INPUT_MODE' && <PlayersInputScreen />}
    {gameUiState !== 'PLAYER_INPUT_MODE' && <BlackJack />}
  </GameContext.Provider>
}

export default App;