import React, { useEffect, useState } from "react"
import GameContext, { DefaultGameContext } from "./state/context"
import { Deck, GameContextType, GameUiState, NetworkStatus, PlayerInput } from "./state/definitions"
import BlackJack from "./BlackJack";
import PlayersInputScreen from "./components/PlayersInputScreen"
import { Spinner, useToast } from "@chakra-ui/react";
import Business from "./business/functions";

const App = () => {
  const [state, setState] = useState<GameContextType>(DefaultGameContext);
  const toast = useToast();

  const onInputSubmit = (nickNames: string[]) => {
    const result = Business.submitPlayersInput(nickNames, state);
    if (!handleBusinessResult(result)) {
      return;
    }
    setNetworkState('LOADING')
    Business.initiateGame(result as GameContextType)
      .then(res => handleBusinessResult(res));
  }

  const drawCard = () => {
    if (!state.deck) {
      // TODO: Practically cannot be reached. Should be asserted
    }
    setNetworkState('LOADING')
    Business.drawCard(state)
      .then(res => handleBusinessResult(res))
  }

  const holdCard = () => {
    const result = Business.holdCard(state);
    if (handleBusinessResult(result)) {
      handleBusinessResult(Business.performPlayerTransition(result as GameContextType));
    }
  }

  const skipPlayer = () => {
    const result = Business.skipPlayer(state);
    if (handleBusinessResult(result)) {
      handleBusinessResult(Business.performPlayerTransition(result as GameContextType));
    }
  }

  const resetGame = () => {
    const result = Business.resetGame(state);
    handleBusinessResult(result);
    setNetworkState('LOADING')
    Business.initiateGame(result as GameContextType)
      .then(res => handleBusinessResult(res));
  }

  const handleBusinessResult = (result: GameContextType | string) => {
    if (typeof result == 'string') {
      toast({
        status: 'error',
        description: result,
        position: 'top-right',
        duration: 2000
      });
      return false;
    }
    setState(result);
    return true;
  }

  const setUiState = (newState: GameUiState) => {
    setState((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        gameUiState: newState,
      }
    }));
  }

  const setNetworkState = (newState: NetworkStatus) => {
    setState((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        networkStatus: newState,
      }
    }));
  }

  const contextValue: GameContextType = {
    ...state,
    onInputSubmit: onInputSubmit,
    setUiState: setUiState,
    setNetworkState: setNetworkState,
    drawCard: drawCard,
    holdCard: holdCard,
    skipPlayer: skipPlayer,
    resetGame: resetGame,
  }

  const { gameUiState } = contextValue.status;
  return <GameContext.Provider value={contextValue}>
    {gameUiState == 'PLAYER_INPUT_MODE' && <PlayersInputScreen />}
    {gameUiState !== 'PLAYER_INPUT_MODE' && <BlackJack />}
  </GameContext.Provider>
}

export default App;