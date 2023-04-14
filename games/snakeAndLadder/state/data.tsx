import { Board, Cell } from "../types";

export const totalRows = 10;

const getCells = (): Cell[] => {
  const output: Cell[] = [];
  for (let i = 0; i < totalRows; i++) {
    const order = i % 2 == 0 ? 'right' : 'left';
    for (let j = order == 'left' ? 0 : totalRows - 1;
      order == 'left' ? j < totalRows : j >= 0;
      order == 'left' ? j++ : j--) {
      output.push({
        value: (i * totalRows) + j + 1,
      })
    }
  }
  return output;
}

const BoardData: Board = {
  cells: getCells(),
  wormholes: [
    {
      name: 'S1',
      type: 'SNAKE',
      start: 32,
      end: 10,
    },
    {
      name: 'S2',
      type: 'SNAKE',
      start: 36,
      end: 6,
    },
    {
      name: 'S3',
      type: 'SNAKE',
      start: 62,
      end: 18,
    },
    {
      name: 'S4',
      type: 'SNAKE',
      start: 48,
      end: 26,
    },
    {
      name: 'S5',
      type: 'SNAKE',
      start: 88,
      end: 24,
    },
    {
      name: 'S6',
      type: 'SNAKE',
      start: 95,
      end: 56,
    },
    {
      name: 'S7',
      type: 'SNAKE',
      start: 97,
      end: 78,
    },
    {
      name: 'L1',
      type: 'LADDER',
      start: 1,
      end: 38,
    },
    {
      name: 'L2',
      type: 'LADDER',
      start: 4,
      end: 14,
    },
    {
      name: 'L3',
      type: 'LADDER',
      start: 8,
      end: 30,
    },
    {
      name: 'L4',
      type: 'LADDER',
      start: 21,
      end: 42,
    },
    {
      name: 'L5',
      type: 'LADDER',
      start: 28,
      end: 76,
    },
    {
      name: 'L6',
      type: 'LADDER',
      start: 50,
      end: 67,
    },
    {
      name: 'L7',
      type: 'LADDER',
      start: 80,
      end: 99,
    },
    {
      name: 'L8',
      type: 'LADDER',
      start: 71,
      end: 92,
    },
  ]
}

export default Object.freeze(BoardData);