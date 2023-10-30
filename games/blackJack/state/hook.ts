import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { DefaultGameContext } from "./context";
import { GameContextType, GameUiState, NetworkStatus } from "./definitions";
import Business from "../business/functions";

const useBlackJack = () => {
  const [state, setState] = useState<GameContextType>(DefaultGameContext);
  const toast = useToast();

  const onInputSubmit = (nickNames: string[]) => {
    const result = Business.submitPlayersInput(nickNames, state);
    if (!handleBusinessResult(result)) {
      return;
    }
    setNetworkState('LOADING')
    Business.initiateGame(result as GameContextType)
      .then(res => {
        setState((prev) => ({
          ...prev,
          playersInfo: []
        }));
        handleBusinessResult(res);
      });
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
      setNetworkState('FAILURE');
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

  return {
    ...state,
    onInputSubmit: onInputSubmit,
    setUiState: setUiState,
    setNetworkState: setNetworkState,
    drawCard: drawCard,
    holdCard: holdCard,
    skipPlayer: skipPlayer,
    resetGame: resetGame,
  }
}

export default useBlackJack;