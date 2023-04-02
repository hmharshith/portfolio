import { Container } from "@chakra-ui/react"
import React, { useContext } from "react"
import GameContext from "./state/context"
import OnGoingStatus from "./components/OnGoingStatus"
import PlayerTurnScreen from "./components/PlayerTurnScreen"
import GameOverScreen from "./components/GameOverScreen"

const BlackJack = () => {
  const context = useContext(GameContext);
  const { gameUiState } = context.status;

  return <><Container>
    {gameUiState != 'GAME_OVER' && <OnGoingStatus />}
    <PlayerTurnScreen />
  </Container>
  {gameUiState == 'GAME_OVER' && <GameOverScreen />}
  </>
}


export default BlackJack;