import { Board, GameOver, PlayerInput } from "./Components";
import useSnakeAndLadder from "./state/hook";

const App: React.FC = () => {
  const { gameState, rollDice, addPlayers } = useSnakeAndLadder();
  // Add Players
  if (Object.keys(gameState.playerContext).length == 0) {
    return <PlayerInput addPlayers={addPlayers} />
  }
  // On Game Completion
  if (gameState.isGameOver) {
    return <GameOver gameState={gameState} />
  }

  // Game Play
  return <Board gameState={gameState} rollDice={rollDice} />
}

export default App;