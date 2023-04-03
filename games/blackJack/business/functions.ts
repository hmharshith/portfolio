import cloneDeep from "lodash.clonedeep";
import config from "../config";
import MakeDeckApiRequest from "../network/apiCaller";
import { DefaultGameContext } from "../state/context";
import { Card, Deck, DrawCardResponse, GameContextType, GameUiState, PlayerContext } from "../state/definitions";
import { Messages } from "./messages";

const submitPlayersInput = (nickNames: string[], context: GameContextType) => {
  // Input validation
  if (nickNames.includes('')) {
    return Messages.nickNamesRequired;
  }
  if (new Set(nickNames).size !== nickNames.length) {
    return Messages.uniqueNickNamesRequired;
  }

  // Update the player info & context in the state
  const newContext = cloneDeep(context);
  for (let i = 0; i < nickNames.length; i++) {
    newContext.playersInfo.push({
      id: i,
      nickName: nickNames[i]
    });
    newContext.playersContext = {
      ...newContext.playersContext,
      [i]: {
        drawnCards: [],
        holdingCards: [],
        score: 0,
      }
    }
  }

  return newContext;
}

const initiateGame = (context: GameContextType) => MakeDeckApiRequest<Deck>(config.getShuffledNewDeckEndpoint)
  .then(res => {
    if (res == null) {
      // TODO: Network error handling
      return Messages.genericNetworkError;
    }
    return {
      ...context,
      status: {
        currentPlayerId: 0,
        gameUiState: 'GAME_DASHBOARD',
        skippedPlayers: [],
        networkStatus: 'IDLE'
      },
      deck: res,
    } as GameContextType;
  });

const drawCard = async (context: GameContextType) => {
  const { currentPlayerId } = context.status;
  const currentPlayer = context.playersContext[currentPlayerId];
  const res = await MakeDeckApiRequest<DrawCardResponse>(`/api/deck/${context.deck!.deck_id}/draw/`);
  if (res == null || res.cards.length > 1) {
    return Messages.genericNetworkError;
  }
  const chosenCard = res.cards[0];
  const newScore = currentPlayer.score + getScore(chosenCard);
  let newContext = cloneDeep(context);
  newContext.playersContext[currentPlayerId].drawnCards.push(chosenCard);
  newContext.status.gameUiState = 'HOLD_OR_SKIP_MODE';
  newContext.status.networkStatus = 'IDLE';
  if (newContext.deck) {
    newContext.deck.remaining = res.remaining;
  }
  if (newScore > config.targetScore) {
    newContext.status.gameUiState = 'AUTOMATICALLY_SKIP_ON_DRAW';
    console.log(newScore, newContext.status.gameUiState)
    newContext.status.skippedPlayers.push(context.status.currentPlayerId);
    console.log(newScore, newContext.status.gameUiState)
  }
  return newContext;
}

const holdCard = (context: GameContextType) => {
  const currentPlayerId = context.status.currentPlayerId;
  try {
    const lastDrawnCard = context.playersContext[currentPlayerId].drawnCards.at(-1);
    if (!lastDrawnCard) {
      throw new Error(`Last drawn card not found for the player!`);
    }
    const newContext = cloneDeep(context);
    newContext.playersContext[currentPlayerId].holdingCards.push(lastDrawnCard);
    newContext.playersContext[currentPlayerId].score += getScore(lastDrawnCard);
    if (newContext.playersContext[currentPlayerId].drawnCards.length == config.maxCardsAllowedPerUser) {
      newContext.status.skippedPlayers.push(currentPlayerId);
    }
    return newContext;
  }
  catch {
    return Messages.genericTechnicalError;
  }
}

const skipPlayer = (context: GameContextType) => {
  const newContext = cloneDeep(context);
  newContext.status.skippedPlayers.push(context.status.currentPlayerId);
  return newContext;
}

const performPlayerTransition = (context: GameContextType) => {
  const { status, playersInfo } = context;
  const newContext = cloneDeep(context);
  console.log(context.playersContext)
  // When all users are skipped
  if (new Set(status.skippedPlayers).size == playersInfo.length) {
    newContext.status.gameUiState = 'GAME_OVER';
  }
  else {
    // Transition to the next user
    const allowedPlayers = playersInfo
      .filter(player => !status.skippedPlayers.includes(player.id));
    const currentPlayerIndex = playersInfo.findIndex(player => player.id == status.currentPlayerId);
    const nextPlayer = allowedPlayers.find(player => player.id > currentPlayerIndex) ?? allowedPlayers[0];
    newContext.status.currentPlayerId = nextPlayer.id;
    newContext.status.gameUiState = 'GAME_DASHBOARD';
  }
  return newContext;
}

const resetGame = (context: GameContextType) => {
  const playersInfo = context.playersInfo;
  const newContext = cloneDeep(DefaultGameContext);
  newContext.status.gameUiState = 'GAME_DASHBOARD';
  newContext.playersInfo = [...playersInfo];
  playersInfo.forEach(player => {
    newContext.playersContext[player.id] = {
      drawnCards: [],
      holdingCards: [],
      score: 0
    }
  })
  return newContext;
}

const getScore = (card: Card) => {
  switch (card.value) {
    case 'ACE': return 11;
    case 'JACK':
    case 'QUEEN':
    case 'KING':
      return 10;

    default:
      return Number(card.value);
  }
}

const showPlayerTurn = (gameUiState: GameUiState) => {
  return gameUiState == 'DISPLAY_PLAYER_OPTIONS'
    || gameUiState == 'HOLD_OR_SKIP_MODE'
    || gameUiState == 'AUTOMATICALLY_SKIP_ON_DRAW'
}

const getPlayersOrderedListAfterGame = (context: GameContextType) => {
  const arr: [number, PlayerContext][] = Object.keys(context.playersContext).map(key => [+key, context.playersContext[+key]]);
  return arr.sort((item1, item2) => item2[1].score - item1[1].score)
    .map(item => item[0])
}

export default {
  submitPlayersInput,
  initiateGame,
  drawCard,
  getScore,
  holdCard,
  performPlayerTransition,
  skipPlayer,
  showPlayerTurn,
  getPlayersOrderedListAfterGame,
  resetGame,
}