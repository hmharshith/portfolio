// Topmost context type for the game
export type GameContextType = {
  // Deck details received from Deck API (New deck created on every game)
  deck?: Deck,
  // Static player details: id, nick name (This app takes those details from user input)
  playersInfo: PlayerInput[],
  // context of each player: Drawn cards, score
  playersContext: { [key: number]: PlayerContext },
  // Game's status at any given time: is game over, current player id, List<id> of all skipped players
  status: StatusContext;
  // Handler when user submits the player details
  onInputSubmit: (nickNames: string[]) => void,
  setUiState: (state: GameUiState) => void;
  setNetworkState: (newState: NetworkStatus) => void;
  // When user wishes to view a card, draw one from the API
  drawCard: () => void,
  // When user wishes to hold the drawn card.
  holdCard: () => void,
  // When user wishes to skip the drawn cards
  // Also triggered when user is automatically skipped when the drawn card exceeds the target score 21.
  skipPlayer: () => void,
  // Reset the game context by retaining the players information
  resetGame: () => void,
}

export type PlayerContext = {
  // Cards those player chooses from the deck
  drawnCards: Card[],
  // Cards those player chose to hold them 
  // Excludes the skipped ones. In this game, it is possible to skip only one card
  holdingCards: Card[],
  score: number,
}

export type StatusContext = {
  gameUiState: GameUiState,
  currentPlayerId: number;
  skippedPlayers: number[],
  networkStatus: NetworkStatus;
}

export type PlayerInput = {
  id: number,
  nickName: string,
}

export type Card = {
  value: string,
  code: string,
  image: string,
  images: {
    svg: string, png: string
  },
  suit: string,
}

export interface Deck {
  success: boolean,
  deck_id: string,
  shuffled: boolean;
  remaining: number,
}

export interface DrawCardResponse extends Deck {
  cards: Card[],
}

export type GameUiState = 'PLAYER_INPUT_MODE'
  | 'GAME_DASHBOARD'
  | 'DISPLAY_PLAYER_OPTIONS'
  | 'HOLD_OR_SKIP_MODE'
  | 'AUTOMATICALLY_SKIP_ON_DRAW'
  | 'GAME_OVER'
  | 'TECHNICAL_ERROR';  // TODO: Handle failures

export type NetworkStatus = 'IDLE'
  | 'LOADING'
  | 'FAILURE';