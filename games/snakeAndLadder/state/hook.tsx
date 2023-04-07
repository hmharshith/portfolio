import { useEffect, useState } from 'react';
import { GameState, Player } from '../types';
import BoardData, { totalRows } from './data';
import { hasEncounteredWormHole } from './functions';

const useSnakeAndLadder = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: BoardData,
    diceValue: null,
    step: null,
    currentPlayerId: 0,
    isGameOver: false,
    playerContext: {},
  });

  useEffect(() => {
    const { currentPlayerId, step, playerContext } = gameState;
    if (step == null) {
      return;
    }
    setTimeout(() => {
      const currentScore = playerContext[currentPlayerId].currentValue;
      if (currentScore + step <= totalRows * totalRows && step > 0) {
        movePlayer(1);
        setGameState((prev) => ({
          ...prev,
          step: prev.step != null ? prev.step - 1 : 0,
        }))
        return;
      }
      applyWormHoleAndTransition();
    }, 750);
  }, [gameState.step]);

  const addPlayers = (playersInfo: Player[]) => {
    setGameState((prev) => ({
      ...prev,
      playerContext: playersInfo.reduce((a, item) => ({ ...a, [item.id]: { name: item.name, currentValue: 0 } }), {})
    }));
  }

  const movePlayer = (n: number) => {
    setGameState((prev) => ({
      ...prev,
      playerContext: {
        ...prev.playerContext,
        [prev.currentPlayerId]: {
          name: prev.playerContext[prev.currentPlayerId].name,
          currentValue: prev.playerContext[prev.currentPlayerId].currentValue + n,
        }
      }
    }));
  }

  const applyWormHoleAndTransition = () => {
    const currentScore = gameState.playerContext[gameState.currentPlayerId].currentValue;
    if (currentScore == totalRows * totalRows) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
      }));
      return;
    }
    const snakeEnd = hasEncounteredWormHole('SNAKE', currentScore, gameState);
    const ladderEnd = hasEncounteredWormHole('LADDER', currentScore, gameState);
    if (snakeEnd !== undefined) {
      movePlayer(snakeEnd - currentScore);
    }
    else if (ladderEnd !== undefined) {
      movePlayer(ladderEnd - currentScore);
    }
    setGameState((prev) => ({
      ...prev,
      diceValue: null,
      step: null,
      currentPlayerId: (prev.currentPlayerId + 1) % Object.keys(prev.playerContext).length,
    }))
  }

  const rollDice = () => {
    const newDiceValue = [1, 2, 3, 4, 5, 6][Math.floor((Math.random() * 10) % 6)];
    setGameState((prev) => ({
      ...prev,
      diceValue: newDiceValue,
      step: newDiceValue
    }));
  };

  return {
    gameState,
    rollDice,
    addPlayers,
  }
}
export default useSnakeAndLadder;