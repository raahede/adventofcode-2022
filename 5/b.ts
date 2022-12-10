import chalk from 'chalk';
import fs from 'fs';
import {
  doAllOrderedMoves,
  getTopLettersFromStacks,
  mapPuzzleData,
} from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    try {
      const mappedData = mapPuzzleData(data.toString());

      const finalStacks = doAllOrderedMoves(mappedData);
      const topLetters = getTopLettersFromStacks(finalStacks);

      // Print result
      console.log(
        chalk.bgBlueBright.underline(`\nTop letters: ${topLetters}\n`)
      );
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});
