import chalk from 'chalk';
import fs from 'fs';
import {
  DebugNames,
  DrawGames,
  ExpectedOutcome,
  FixedGame,
  LoserGames,
  MyHands,
  Points,
  WinnerGames,
} from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    const games: FixedGame[] = data
      .toString()
      .split('\n') // split on games (divided by new line)
      .filter((str) => !!str) // remove empty
      .map(
        (gameTxt) => gameTxt.split(' ') as FixedGame // split on empty space
      );
    console.log(games.length);

    try {
      const total = getAccumulatedFixedGameResults(games);
      console.log('getAccumulatedFixedGameResults');

      // Print result
      console.log(chalk.bgBlueBright.underline(`\nTotal score: ${total}\n`));
      console.log('fixed games!');
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});

export const fixedGameResult = (game: FixedGame): number => {
  const [opponentHand, expectedOutcome] = game;
  let handPoints = 0;
  let gamePoints = 0;
  let myHand: MyHands | null = null;

  switch (expectedOutcome) {
    case ExpectedOutcome.Draw:
      // eslint-disable-next-line no-case-declarations
      const gameMatch = DrawGames.find(([o]) => o === opponentHand);

      if (!gameMatch)
        throw new Error(`Matching losing game not found for ${opponentHand}`);

      myHand = gameMatch[1];
      gamePoints += Points.Draw; // add 3 points for a draw
      break;

    case ExpectedOutcome.Lose: {
      // eslint-disable-next-line no-case-declarations
      const gameMatch = LoserGames.find(([o]) => o === opponentHand);

      if (!gameMatch)
        throw new Error(`Matching losing game not found for ${opponentHand}`);

      myHand = gameMatch[1];
      gamePoints += Points.Lose; // add 0 points for a loss
      break;
    }

    case ExpectedOutcome.Win: {
      // eslint-disable-next-line no-case-declarations
      const gameMatch = WinnerGames.find(([o]) => o === opponentHand);

      if (!gameMatch)
        throw new Error(`Matching winning game not found for ${opponentHand}`);

      myHand = gameMatch[1];
      gamePoints += Points.Win; // add 6 points for winning
      break;
    }

    default:
      throw new Error(`No match for expected outcome: ${expectedOutcome}`);
  }

  switch (myHand) {
    case MyHands.Rock:
      handPoints += Points.Rock; // add 1 point for rock
      break;

    case MyHands.Paper:
      handPoints += Points.Paper; // add 2 points for paper
      break;

    case MyHands.Scissors:
      handPoints += Points.Scissors; // add 3 points for scissors
      break;

    default:
      throw new Error(`My hand not found for ${opponentHand}`);
  }

  switch (expectedOutcome) {
    case ExpectedOutcome.Win: {
      console.log(
        chalk.bgGreen(
          `${game} WIN! ${handPoints} points for ${
            DebugNames.MyHands[myHand]
          }, ${gamePoints} for winning, ${handPoints + gamePoints} total - ${
            DebugNames.OpponentHands[game[0]]
          } vs ${DebugNames.MyHands[myHand]}`
        )
      );
      break;
    }

    case ExpectedOutcome.Draw:
      console.log(
        chalk.bgGray(
          `${game} Draw! ${handPoints} points for ${
            DebugNames.MyHands[myHand]
          }, ${gamePoints} for drawing, ${handPoints + gamePoints} total - ${
            DebugNames.OpponentHands[game[0]]
          } vs ${DebugNames.MyHands[myHand]}`
        )
      );
      break;

    case ExpectedOutcome.Lose: {
      console.log(
        chalk.bgRed(
          `${game} Lose! ${handPoints} points for ${
            DebugNames.MyHands[myHand]
          }, ${gamePoints} for losing, ${handPoints + gamePoints} total - ${
            DebugNames.OpponentHands[game[0]]
          } vs ${DebugNames.MyHands[myHand]}`
        )
      );
      break;
    }
  }

  return handPoints + gamePoints;
};

const getAccumulatedFixedGameResults = (games: FixedGame[]): number => {
  return games.map((game) => fixedGameResult(game)).reduce((a, b) => a + b, 0);
};
