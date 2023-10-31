export type GameContextType = {
  // Deck details received from Deck API (New deck created on every game)
  deck?: Deck,
  // All players personal details (id, nick name etc.)
  playersInfo: PlayerInput[],
  // Context of each player like drawn cards, holding cards, current score
  playersContext: { [key: number]: PlayerContext },
  // Game's status at any given point of time: current player id, List<id> of all skipped players
  status: StatusContext;

  onInputSubmit: (nickNames: string[]) => void,
  setUiState: (state: GameUiState) => void;
  setNetworkState: (newState: NetworkStatus) => void;
  drawCard: () => void,
  holdCard: () => void,
  skipPlayer: () => void,
  resetGame: () => void,
}

export type PlayerContext = {
  drawnCards: Card[],
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
  | 'TECHNICAL_ERROR';

export type NetworkStatus = 'IDLE'
  | 'LOADING'
  | 'FAILURE';