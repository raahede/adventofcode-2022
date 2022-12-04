import chalk from 'chalk';
import fs from 'fs';
import { isEqual } from 'lodash';
import {
  DebugNames,
  DrawGames,
  Game,
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
      handPoints += Points.Rock; // add 1 point for rock
      break;

    case MyHands.Paper:
      handPoints += Points.Paper; // add 2 points for rock
      break;

    case MyHands.Scissors:
      handPoints += Points.Scissors; // add 3 points for rock
      break;
  }

  if (WinnerGames.some((winnerGame) => isEqual(winnerGame, game))) {
    gamePoints += Points.Win; // add 6 points for winning

    console.log(
      chalk.bgGreen(
        `${game} WIN!  ${handPoints} points for ${
          DebugNames.MyHands[game[1]]
        }, ${gamePoints} for winning, ${handPoints + gamePoints} total - ${
          DebugNames.OpponentHands[game[0]]
        } vs ${DebugNames.MyHands[game[1]]}`
      )
    );
  } else if (DrawGames.some((drawGame) => isEqual(drawGame, game))) {
    gamePoints += Points.Draw; // add 3 points for a draw

    console.log(
      chalk.bgGray(
        `${game} DRAW! ${handPoints} points for ${
          DebugNames.MyHands[game[1]]
        }, ${gamePoints} for drawing, ${handPoints + gamePoints} total - ${
          DebugNames.OpponentHands[game[0]]
        } vs ${DebugNames.MyHands[game[1]]}`
      )
    );
  } else if (LoserGames.some((loserGame) => isEqual(loserGame, game))) {
    console.log(
      chalk.bgRed(
        `${game} LOST! ${handPoints} points for ${
          DebugNames.MyHands[game[1]]
        }, ${gamePoints} for losing, ${handPoints + gamePoints} total - ${
          DebugNames.OpponentHands[game[0]]
        } vs ${DebugNames.MyHands[game[1]]}`
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
