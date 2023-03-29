export type LetterStatus = 'GREEN' | 'YELLOW' | 'GRAY';

export type WordlyResponse = {
  [key: number]: {
    ch: string,
    status: LetterStatus,
  }
  success?: boolean,
};

export type WordlyState = {
  data: WordlyResponse[];
  gameOver: boolean;
};

export const WordlyConfig = {
  numberOfLettersInTheWord: 5,
  maxAttempt: 10,
  words: [
    "CLOUD",
    "CLOCK",
    "LOTUS",
    "POWER",
    "CHESS",
    "TOAST",
    "WHERE",
  ],
  wordHints: {
    CLOUD: "Rainfall",
    CLOCK: "Time",
    LOTUS: "Flower",
    POWER: "Electricity",
    CHESS: "Game",
    TOAST: "Bread",
    WHERE: "Question"
  } as any
}

export const applyWordly = (word: string, text: string): WordlyResponse => {
  const wordArr = word.toLocaleUpperCase().split("") as any[];
  const textArr = text.toLocaleUpperCase().split("") as any[];
  const output: WordlyResponse = {};

  // Fill GREENS Bucket
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i] == wordArr[i]) {
      output[i] = {
        ch: textArr[i],
        status: 'GREEN'
      }
      textArr[i] = null;
      wordArr[i] = null;
    }
  }

  // Victory :)
  if (Object.keys(output).length == textArr.length) {
    output.success = true;
    return output;
  }

  // Fill YELLOWS Bucket
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i] == null) {
      continue;
    }
    const index = wordArr.findIndex((ch) => ch == textArr[i]);
    if (index >= 0) {
      output[i] = {
        ch: textArr[i],
        status: 'YELLOW',
      }
      textArr[i] = null;
      wordArr[index] = null;
    }
  }

  // Fill the rest to GRAYS Bucket
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i] == null) {
      continue;
    }
    output[i] = {
      ch: textArr[i],
      status: 'GRAY'
    }
    // Just a sanity
    textArr[i] = null;
  }
  return output;
};
