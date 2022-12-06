import { intersection } from 'lodash';

export type Pair = [number[], number[]];

export const getNumberArrayFromStringRange = (rangeStr: string): number[] => {
  const range = rangeStr.split('-').map((item) => {
    const num = parseInt(item);
    if (isNaN(num)) throw new Error(`${item} is not a number.`);
    return num;
  });

  if (range.length !== 2)
    throw new Error(`${rangeStr} does not have 2 numbers`);

  const returnVal: number[] = [];

  let n = range[0];

  while (n <= range[1]) {
    returnVal.push(n);
    n++;
  }

  return returnVal;
};

export const mapPairData = (pairStr: string): Pair => {
  const pair = pairStr
    .split(',')
    .map((item) => getNumberArrayFromStringRange(item));

  if (pair.length === 2) {
    return pair as Pair;
  }

  throw new Error(`${pairStr} does not have 2 ranges`);
};

export const mapPairsData = (data: string): Pair[] => {
  return data
    .split('\n') // split on newline
    .filter((str) => !!str) // remove empty
    .map((item) => mapPairData(item));
};

export const pairsCompletelyOverlap = (pair: Pair): boolean => {
  const [a, b] = pair;
  const overlap = intersection(a, b);
  return overlap.length === a.length || overlap.length === b.length;
};

export const countTotalOverlaps = (pairs: Pair[]): number => {
  return pairs.reduce(
    (accumulator, currentValue) =>
      accumulator + (pairsCompletelyOverlap(currentValue) ? 1 : 0),
    0
  );
};
