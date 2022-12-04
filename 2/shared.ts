export enum OpponentHands {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

export enum MyHands {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

export enum ExpectedOutcome {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z',
}

export const DebugNames = {
  OpponentHands: {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
  },
  MyHands: {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors',
  },
  ExpectedOutcome: {
    X: 'Lose',
    Y: 'Draw',
    Z: 'Win',
  },
};

export const Points = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
  Win: 6,
  Draw: 3,
  Lose: 0,
};

export type Game = [OpponentHand, MyHand];

export type FixedGame = [OpponentHand, ExpectedOutcome];

export const WinnerGames: Game[] = [
  [OpponentHands.Rock, MyHands.Paper],
  [OpponentHands.Paper, MyHands.Scissors],
  [OpponentHands.Scissors, MyHands.Rock],
];

export const DrawGames: Game[] = [
  [OpponentHands.Rock, MyHands.Rock],
  [OpponentHands.Paper, MyHands.Paper],
  [OpponentHands.Scissors, MyHands.Scissors],
];

export const LoserGames: Game[] = [
  [OpponentHands.Rock, MyHands.Scissors],
  [OpponentHands.Paper, MyHands.Rock],
  [OpponentHands.Scissors, MyHands.Paper],
];

export type OpponentHand =
  | OpponentHands.Rock
  | OpponentHands.Paper
  | OpponentHands.Scissors;

type MyHand = MyHands.Rock | MyHands.Paper | MyHands.Scissors;
