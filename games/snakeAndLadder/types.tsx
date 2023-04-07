// Board
export type Board = {
  cells: Cell[];
  wormholes: WormHole[];
}

export type Cell = {
  value: number;
}

export type WormHole = {
  type: WormHoleType;
  name: string;
  start: number;
  end: number;
}

export type WormHoleType = 'SNAKE' | 'LADDER';

// Player
export type Player = {
  id: number;
  name: string;
}

// State
export type GameState = {
  // static board
  board: Board;
  // spawned random value in the range [1, 6]
  diceValue: number | null;
  // dice value decremented to zero on every roll (to achieve 1 step movement)
  step: number | null;
  // Current player whose turn to roll the dice
  currentPlayerId: number;
  // Flag for checking if any player has reached the destination
  isGameOver: boolean;
  // Player info, current score etc.
  playerContext: {
    [key: number]: {
      name: string;
      currentValue: number;
    }
  }
}

export type CellProps = {
  value: number;
  playerNames: string[];
  snakeStart?: string;
  snakeEnd?: string;
  ladderStart?: string;
  ladderEnd?: string;
}