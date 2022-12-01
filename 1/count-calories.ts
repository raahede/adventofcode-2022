import chalk from 'chalk';
import fs from 'fs';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    const collections = data
      .toString()
      .split('\n\n') // split on groups (divided by new line)
      .map((collectionTxt) => {
        const allNumbers = collectionTxt
          .split('\n') // split on each value
          .filter((str) => !!str) // remove empty
          .flatMap((str) => parseInt(str)); // convert to int

        const sum = allNumbers.reduce((a, b) => a + b, 0);

        return { sum, allNumbers };
      });

    const largest = collections
      .map((collection) => collection.sum)
      .reduce((accumulatedValue, currentValue) =>
        Math.max(accumulatedValue, currentValue)
      );

    // Print all values, highlight the largest value
    collections.forEach((collection, index) => {
      if (collection.sum > largest) {
        console.error(
          chalk.bgRedBright('\nWut, is the value higher than largest value??\n')
        );
        process.exit(1);
      }

      if (collection.sum === largest) {
        console.log(
          chalk.bgGreen(
            `${index}) Sum: ${collection.sum} - ${JSON.stringify(
              collection.allNumbers
            )}`
          )
        );
      } else {
        console.log(
          chalk.bgBlue(
            `${index}) Sum: ${collection.sum} - ${JSON.stringify(
              collection.allNumbers
            )}`
          )
        );
      }
    });

    // Print result (largest)
    console.log(chalk.bgGreen.underline(`\nLargest number: ${largest}\n`));

    process.exit(0);
  }

  return data;
});
