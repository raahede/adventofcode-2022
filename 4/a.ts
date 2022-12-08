import chalk from 'chalk';
import fs from 'fs';
import {
  countCompleteOverlaps,
  countPartialOverlaps,
  mapPairsData,
} from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    try {
      const pairs = mapPairsData(data.toString());

      const completeOverlaps = countCompleteOverlaps(pairs);
      const partialOverlaps = countPartialOverlaps(pairs);

      // Print result
      console.log(
        chalk.bgBlueBright.underline(
          `\nComplete overlaps: ${completeOverlaps}\n`
        )
      );

      console.log(
        chalk.bgBlueBright.underline(`\nPartial overlaps: ${partialOverlaps}\n`)
      );
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});
