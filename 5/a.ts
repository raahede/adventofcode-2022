import chalk from 'chalk';
import fs from 'fs';
import { mapPuzzleData } from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    try {
      const { stacks, moves } = mapPuzzleData(data.toString());

      console.log(stacks);
      console.log(moves);

      // // Print result
      // console.log(
      //   chalk.bgBlueBright.underline(
      //     `\nComplete overlaps: ${completeOverlaps}\n`
      //   )
      // );

      // console.log(
      //   chalk.bgBlueBright.underline(`\nPartial overlaps: ${partialOverlaps}\n`)
      // );
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});
