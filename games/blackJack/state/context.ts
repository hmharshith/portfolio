import { createContext } from "react";
import { GameContextType } from "./definitions";

export const DefaultGameContext: GameContextType = {
  playersInfo: [],
  playersContext: {},
  status: {
    currentPlayerId: 0,
    gameUiState: 'PLAYER_INPUT_MODE',
    skippedPlayers: [],
    networkStatus: 'IDLE',
  },
  onInputSubmit: (_: string[]) => { },
  drawCard: () => { },
  setUiState: () => { },
  setNetworkState: () => { },
  holdCard: () => { },
  skipPlayer: () => { },
  resetGame: () => { },
}

const GameContext = createContext<GameContextType>(DefaultGameContext);
export default GameContext;