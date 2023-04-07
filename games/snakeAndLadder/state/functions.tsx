import { CellProps, GameState, WormHoleType } from "../types";
import { totalRows } from "./data";

export const GetCellData = (cellValue: number, state: GameState): CellProps => {
  const { board, playerContext } = state;
  const playerNames = Object.keys(playerContext)
    .filter(key => playerContext[+key].currentValue == cellValue)
    .map(key => playerContext[+key].name);

  const snakeStart = board.wormholes.find(item => item.type == 'SNAKE' && item.start == cellValue)?.name;
  const snakeEnd = board.wormholes.find(item => item.type == 'SNAKE' && item.end == cellValue)?.name;
  const ladderStart = board.wormholes.find(item => item.type == 'LADDER' && item.start == cellValue)?.name;
  const ladderEnd = board.wormholes.find(item => item.type == 'LADDER' && item.end == cellValue)?.name;

  return {
    value: cellValue,
    playerNames,
    snakeStart,
    snakeEnd,
    ladderStart,
    ladderEnd,
  }
}

export const hasEncounteredWormHole = (type: WormHoleType, cellValue: number, state: GameState) => {
  const snake = state.board.wormholes.find(item => item.type == type && item.start == cellValue);
  return snake?.end;
}

export const getWinner = (game: GameState) => {
  const winnerId = Object.keys(game.playerContext)
    .find(key => game.playerContext[+key].currentValue == totalRows * totalRows);


  return winnerId ? game.playerContext[+winnerId] : undefined;
};

export const getCellBg = (props: CellProps) => {
  if (props.snakeStart) {
    return 'red.300';
  }
  if (props.ladderStart) {
    return 'green.300';
  }
  return undefined;
}

export const getCellWormHoleContent = (props: CellProps) => {
  let output = (props.snakeStart ? `${props.snakeStart} HEAD |` : '')
    + (props.snakeEnd ? ` ${props.snakeEnd} TAIL |` : '')
    + (props.ladderStart ? ` ${props.ladderStart} HEAD |` : '')
    + (props.ladderEnd ? ` ${props.ladderEnd} TAIL |` : '')

  return output.length > 0 ? output.substring(0, output.length - 2) : output
}