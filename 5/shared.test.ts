import {
  doAllMoves,
  doAllOrderedMoves,
  doMove,
  doOrderedMove,
  getMovesFromData,
  getStacksFromData,
  getTopLettersFromStacks,
  mapPuzzleData,
  Move,
  PuzzleData,
  Stacks,
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

const expectedStacks: Stacks = new Map([
  [1, ['[B]', '[A]']],
  [2, ['[E]', '[D]', '[C]']],
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
    text: 'move 1 from 7 to 4',
    count: 1,
    fromStack: 7,
    toStack: 4,
  },
  {
    text: 'move 1 from 6 to 2',
    count: 1,
    fromStack: 6,
    toStack: 2,
  },
  {
    text: 'move 5 from 9 to 4',
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

describe('doMove', () => {
  const stacks: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]']],
  ]);

  const move: Move = {
    text: 'move 1 from 1 to 3',
    count: 1,
    fromStack: 1,
    toStack: 3,
  };

  const expectedStacks: Stacks = new Map([
    [1, ['[A]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]', '[B]']],
  ]);

  it('moves one item correctly', () => {
    expect(doMove(move, stacks)).toEqual(expectedStacks);
  });

  const stacks2: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]']],
  ]);

  const move2: Move = {
    text: 'move 3 from 2 to 1',
    count: 3,
    fromStack: 2,
    toStack: 1,
  };

  const expectedStacks2: Stacks = new Map([
    [1, ['[A]', '[B]', '[E]', '[D]', '[C]']],
    [2, []],
    [3, ['[F]']],
  ]);

  it('moves multiple items correctly', () => {
    expect(doMove(move2, stacks2)).toEqual(expectedStacks2);
  });
});

describe('doOrderedMove', () => {
  const stacks: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]']],
  ]);

  const move: Move = {
    text: 'move 1 from 1 to 3',
    count: 1,
    fromStack: 1,
    toStack: 3,
  };

  const expectedStacks: Stacks = new Map([
    [1, ['[A]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]', '[B]']],
  ]);

  it('moves one item correctly', () => {
    expect(doOrderedMove(move, stacks)).toEqual(expectedStacks);
  });

  const stacks2: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]']],
  ]);

  const move2: Move = {
    text: 'move 3 from 2 to 1',
    count: 3,
    fromStack: 2,
    toStack: 1,
  };

  const expectedStacks2: Stacks = new Map([
    [1, ['[A]', '[B]', '[C]', '[D]', '[E]']],
    [2, []],
    [3, ['[F]']],
  ]);

  it('moves multiple items correctly', () => {
    expect(doOrderedMove(move2, stacks2)).toEqual(expectedStacks2);
  });
});

describe('doAllMoves', () => {
  const stacks: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]']],
  ]);

  const moves: Move[] = [
    {
      text: 'move 3 from 2 to 1',
      count: 3,
      fromStack: 2,
      toStack: 1,
    },
    {
      text: 'move 2 from 1 to 3',
      count: 2,
      fromStack: 1,
      toStack: 3,
    },
  ];

  const expectedStacks: Stacks = new Map([
    [1, ['[A]', '[B]', '[E]']],
    [2, []],
    [3, ['[F]', '[C]', '[D]']],
  ]);

  it('executes all moves correctly', () => {
    expect(doAllMoves({ moves, stacks })).toEqual(expectedStacks);
  });
});

describe('doAllOrderedMoves', () => {
  const stacks: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, ['[F]']],
  ]);

  const moves: Move[] = [
    {
      text: 'move 3 from 2 to 1',
      count: 3,
      fromStack: 2,
      toStack: 1,
    },
    {
      text: 'move 2 from 1 to 3',
      count: 2,
      fromStack: 1,
      toStack: 3,
    },
  ];

  const expectedStacks: Stacks = new Map([
    [1, ['[A]', '[B]', '[C]']],
    [2, []],
    [3, ['[F]', '[D]', '[E]']],
  ]);

  it('executes all moves correctly', () => {
    expect(doAllOrderedMoves({ moves, stacks })).toEqual(expectedStacks);
  });
});

describe('getTopLettersFromStacks', () => {
  const stacks: Stacks = new Map([
    [1, ['[A]', '[B]']],
    [2, ['[C]', '[D]', '[E]']],
    [3, []],
    [4, ['[F]']],
  ]);

  it('gets all stack top letters', () => {
    expect(getTopLettersFromStacks(stacks)).toEqual('BEF');
  });
});
