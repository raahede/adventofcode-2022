import {
  getMovesFromData,
  getStacksFromData,
  mapPuzzleData,
  Move,
  PuzzleData,
  StackId,
} from './shared';

// const stacksTxtFull = `
//                 [M]     [W] [M]
//             [L] [Q] [S] [C] [R]
//             [Q] [F] [F] [T] [N] [S]
//     [N]     [V] [V] [H] [L] [J] [D]
//     [D] [D] [W] [P] [G] [R] [D] [F]
// [T] [T] [M] [G] [G] [Q] [N] [W] [L]
// [Z] [H] [F] [J] [D] [Z] [S] [H] [Q]
// [B] [V] [B] [T] [W] [V] [Z] [Z] [M]
//  1   2   3   4   5   6   7   8   9
// `;

const stacksTxt = `
    [C]
[A] [D]
[B] [E] [F]
 1   2   3
`;

const expectedStacks: Map<StackId, string[]> = new Map([
  [1, ['[A]', '[B]']],
  [2, ['[C]', '[D]', '[E]']],
  [3, ['[F]']],
]);

describe('getStacksFromData', () => {
  it('maps stacks correctly to Map', () => {
    const stacks = getStacksFromData(stacksTxt);
    expect(stacks).toEqual(expectedStacks);
  });
});

const movesText = `
move 1 from 7 to 4
move 1 from 6 to 2
move 5 from 9 to 4
`;

const expectMoves: Move[] = [
  {
    count: 1,
    fromStack: 7,
    toStack: 4,
  },
  {
    count: 1,
    fromStack: 6,
    toStack: 2,
  },
  {
    count: 5,
    fromStack: 9,
    toStack: 4,
  },
];

describe('getMovesFromData', () => {
  it('maps moves correctly to array', () => {
    const stacks = getMovesFromData(movesText);
    expect(stacks).toEqual(expectMoves);
  });
});

const puzzleText = `
    [C]
[A] [D]
[B] [E] [F]
 1   2   3

move 1 from 7 to 4
move 1 from 6 to 2
move 5 from 9 to 4
`;

const expectedPuzzleData: PuzzleData = {
  stacks: expectedStacks,
  moves: expectMoves,
};

describe('mapPuzzleData', () => {
  it('maps moves correctly to array', () => {
    const stacks = mapPuzzleData(puzzleText);
    expect(stacks).toEqual(expectedPuzzleData);
  });
});
