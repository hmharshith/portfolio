import { Board, Cell } from "../types";

export const totalRows = 8;

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
      start: 23,
      end: 8,
    },
    {
      name: 'S2',
      type: 'SNAKE',
      start: 33,
      end: 4,
    },
    {
      name: 'S3',
      type: 'SNAKE',
      start: 50,
      end: 19,
    },
    {
      name: 'S4',
      type: 'SNAKE',
      start: 60,
      end: 40,
    },
    {
      name: 'L1',
      type: 'LADDER',
      start: 17,
      end: 56,
    },
    {
      name: 'L2',
      type: 'LADDER',
      start: 2,
      end: 45,
    },
    {
      name: 'L3',
      type: 'LADDER',
      start: 11,
      end: 29,
    },
    {
      name: 'L4',
      type: 'LADDER',
      start: 13,
      end: 27,
    },
  ]
}

export default Object.freeze(BoardData);