import chalk from 'chalk';
import fs from 'fs';
import { getPrioritySum, mapRucksackData } from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    try {
      const rucksacks = mapRucksackData(data.toString());

      const total = getPrioritySum(rucksacks);

      // Print result
      console.log(chalk.bgBlueBright.underline(`\nTotal score: ${total}\n`));
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});
