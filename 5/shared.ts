export type StackId = number;

export type Stacks = Map<number, string[]>;

export interface Move {
  text: string;
  count: number;
  fromStack: StackId;
  toStack: StackId;
}
export interface PuzzleData {
  stacks: Stacks;
  moves: Move[];
}

export const getStacksFromData = (data: string): Stacks => {
  const stacks = <{ key: StackId; value: string[] }[]>[];
  const stacksMap: Stacks = new Map();
  const rows = data
    .split('\n') // split on newline
    .filter((str) => !!str) // remove empty
    .map((row) => row.toString().match(/.{1,4}/g)) // split on every 4 characters
    .reverse(); // reverse to put numbers on top

  rows.forEach((row, i) => {
    // First row is numbers
    if (i === 0) {
      row?.forEach((char) => {
        const trimmed = char.trim();
        const num = parseInt(trimmed);
        if (isNaN(num))
          throw new Error(`Could not parse "${trimmed}" as number`);
        stacks.push({ key: num, value: [] });
      });
    } else {
      row?.forEach((char, ii) => {
        const trimmed = char.trim();
        if (trimmed.length) stacks[ii].value.push(trimmed); // add to beginning of array
      });
    }
  });

  // This could be improved
  stacks.forEach((entry) => {
    stacksMap.set(entry.key, entry.value);
  });

  return stacksMap;
};

export const getMovesFromData = (data: string): Move[] => {
  const movesTxts = data
    .split('\n') // split on newline
    .filter((str) => !!str); // remove empty

  const mapMove = (moveTxt: string): Move => {
    const fromIndex = moveTxt.indexOf('from');
    const toIndex = moveTxt.indexOf('to');
    const count = parseInt(moveTxt.substring('move'.length, fromIndex).trim());
    const fromStack = parseInt(
      moveTxt.substring(fromIndex + 'from'.length, toIndex).trim()
    );

    const toStack = parseInt(moveTxt.substring(toIndex + 'to'.length).trim());

    if (isNaN(count))
      throw new Error(`Could not parse "count" as number in "${moveTxt}"`);

    if (isNaN(fromStack))
      throw new Error(`Could not parse "fromStack" as number in "${moveTxt}"`);

    if (isNaN(toStack))
      throw new Error(`Could not parse "toStack" as number in "${moveTxt}"`);

    return {
      text: moveTxt,
      count,
      fromStack,
      toStack,
    };
  };

  return movesTxts.map((moveTxt) => mapMove(moveTxt));
};

export const mapPuzzleData = (data: string): PuzzleData => {
  const firstMoveIndex = data.indexOf('move');
  const stacksTxts = data.substring(0, firstMoveIndex);
  const movesTxts = data.substring(firstMoveIndex);

  return {
    stacks: getStacksFromData(stacksTxts),
    moves: getMovesFromData(movesTxts),
  };
};

export const doMove = (move: Move, stacks: Stacks): Stacks => {
  const fromStack = stacks.get(move.fromStack);
  const toStack = stacks.get(move.toStack);
  if (!fromStack)
    throw new Error(`Stack with id ${move.fromStack} does not exist`);
  if (!toStack) throw new Error(`Stack with id ${move.toStack} does not exist`);

  for (let index = 0; index < move.count; index++) {
    const moveItem = fromStack[fromStack.length - 1];
    fromStack.pop();
    toStack.push(moveItem);
  }

  return stacks;
};

export const doAllMoves = (data: PuzzleData): Stacks => {
  const { moves, stacks } = data;
  let currentStacks = new Map(stacks);

  moves.forEach((move) => {
    // console.log(`Executing move: ${move.text}`);
    // console.log(currentStacks);
    currentStacks = new Map(doMove(move, currentStacks));
    // console.log(currentStacks);
  });

  return currentStacks;
};

export const getTopLettersFromStacks = (stacks: Stacks): string => {
  const topLetters = Array.from(stacks.values())
    .map((arr) => arr[arr.length - 1]?.replace(/\[|\]/g, '') || '') // remove "[" and "]"
    .join('');

  // console.log(`Top letters: ${topLetters}`);
  return topLetters;
};
