import chalk from 'chalk';
import fs from 'fs';
import { isEqual } from 'lodash';

enum OpponentHands {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum MyHands {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

const DebugNames = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
};

const WinnerGames = [
  [OpponentHands.Rock, MyHands.Paper],
  [OpponentHands.Paper, MyHands.Scissors],
  [OpponentHands.Scissors, MyHands.Rock],
];

const DrawGames = [
  [OpponentHands.Rock, MyHands.Rock],
  [OpponentHands.Paper, MyHands.Paper],
  [OpponentHands.Scissors, MyHands.Scissors],
];

const LoserGames = [
  [OpponentHands.Rock, MyHands.Scissors],
  [OpponentHands.Paper, MyHands.Rock],
  [OpponentHands.Scissors, MyHands.Paper],
];

type OpponentHand =
  | OpponentHands.Rock
  | OpponentHands.Paper
  | OpponentHands.Scissors;

type MyHand = MyHands.Rock | MyHands.Paper | MyHands.Scissors;

type Game = [OpponentHand, MyHand];

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    const games: Game[] = data
      .toString()
      .split('\n') // split on games (divided by new line)
      .filter((str) => !!str) // remove empty
      .map(
        (gameTxt) => gameTxt.split(' ') as Game // split on empty space
      );
    console.log(games.length);

    try {
      const total = getAccumulatedGameResults(games);

      // Print result
      console.log(chalk.bgBlueBright.underline(`\nTotal score: ${total}\n`));
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});

const gameResult = (game: Game): number => {
  const [, myHand] = game;
  let handPoints = 0;
  let gamePoints = 0;

  switch (myHand) {
    case MyHands.Rock:
      handPoints += 1; // add 1 point for rock
      break;

    case MyHands.Paper:
      handPoints += 2; // add 2 points for rock
      break;

    case MyHands.Scissors:
      handPoints += 3; // add 3 points for rock
      break;
  }

  if (WinnerGames.some((winnerGame) => isEqual(winnerGame, game))) {
    gamePoints += 6; // add 6 points for winning

    console.log(
      chalk.bgGreen(
        `${game} WIN!  ${handPoints} points for ${
          DebugNames[game[1]]
        }, ${gamePoints} for winning, ${handPoints + gamePoints} total - ${
          DebugNames[game[0]]
        } vs ${DebugNames[game[1]]}`
      )
    );
  } else if (DrawGames.some((drawGame) => isEqual(drawGame, game))) {
    gamePoints += 3; // add 3 points for a draw

    console.log(
      chalk.bgGray(
        `${game} DRAW! ${handPoints} points for ${
          DebugNames[game[1]]
        }, ${gamePoints} for drawing, ${handPoints + gamePoints} total - ${
          DebugNames[game[0]]
        } vs ${DebugNames[game[1]]}`
      )
    );
  } else if (LoserGames.some((loserGame) => isEqual(loserGame, game))) {
    console.log(
      chalk.bgRed(
        `${game} LOST! ${handPoints} points for ${
          DebugNames[game[1]]
        }, ${gamePoints} for losing, ${handPoints + gamePoints} total - ${
          DebugNames[game[0]]
        } vs ${DebugNames[game[1]]}`
      )
    );
  } else {
    throw new Error(`Game structure not recognized: ${game}`);
  }

  return handPoints + gamePoints;
};

const getAccumulatedGameResults = (games: Game[]): number => {
  return games.map((game) => gameResult(game)).reduce((a, b) => a + b, 0);
};
