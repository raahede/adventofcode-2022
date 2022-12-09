export const stacks = new Map<number, string[]>();

export type StackId = number;

export interface PuzzleData {
  stacks: Map<StackId, string[]>;
  moves: Move[];
}

export const getStacksFromData = (data: string): Map<StackId, string[]> => {
  const stacks = <{ key: StackId; value: string[] }[]>[];
  const stacksMap = new Map<StackId, string[]>();
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
        if (trimmed.length) stacks[ii].value.unshift(trimmed); // add to beginning of array
      });
    }
  });

  // This could be improved
  stacks.forEach((entry) => {
    stacksMap.set(entry.key, entry.value);
  });

  return stacksMap;
};

export interface Move {
  count: number;
  fromStack: StackId;
  toStack: StackId;
}

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
