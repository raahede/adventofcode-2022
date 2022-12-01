import chalk from 'chalk';
import fs from 'fs';
import { cloneDeep } from 'lodash';
interface Collection {
  sum: number;
  allNumbers: number[];
}

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    const collections: Collection[] = data
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

    try {
      const largest = getHighestSum(collections);
      const topThreeSum = getTopThreeSum(collections);

      // Print results
      console.log(
        chalk.bgBlueBright.underline(`\nLargest number: ${largest}\n`)
      );
      console.log(
        chalk.bgBlueBright.underline(`\nTop three sum: ${topThreeSum}\n`)
      );
    } catch (error) {
      console.error(chalk.bgRedBright(error));
      process.exit(1);
    }

    process.exit(0);
  }
});

const getHighestSum = (collections: Collection[]): number => {
  const largest = collections
    .map((collection) => collection.sum)
    .reduce((accumulatedValue, currentValue) =>
      Math.max(accumulatedValue, currentValue)
    );

  console.log(
    chalk.bgBlue(`
----------------------------------------------
Printing all sums, highlighting largest number
----------------------------------------------
`)
  );

  // Print all values, highlight the largest value
  collections.forEach((collection, index) => {
    if (collection.sum > largest) {
      throw new Error('\nWut, this value is higher than the largest value.\n');
    }

    // highlight largest sum
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
        `${index}) Sum: ${collection.sum} - ${JSON.stringify(
          collection.allNumbers
        )}`
      );
    }
  });

  // Print result (largest)
  // console.log(chalk.bgGreen.underline(`\nLargest number: ${largest}\n`));

  return largest;
};

const getTopThreeSum = (collections: Collection[]) => {
  // Sort all collections with highest sum at the top
  const sortedCollections = cloneDeep(collections).sort(
    (a, b) => b.sum - a.sum
  );

  console.log(
    chalk.bgBlue(`
------------------------------------------------
Printing ordered collections, highlighting top 3
------------------------------------------------
`)
  );

  // Print all values, highlight top 3
  sortedCollections.forEach((collection, index) => {
    // highlight top 3 items
    if (index < 3) {
      console.log(
        chalk.bgGreen(
          `${index}) Sum: ${collection.sum} - ${JSON.stringify(
            collection.allNumbers
          )}`
        )
      );
    } else {
      console.log(
        `${index}) Sum: ${collection.sum} - ${JSON.stringify(
          collection.allNumbers
        )}`
      );
    }
  });

  const topThree = sortedCollections.slice(0, 3);

  if (topThree.length !== 3)
    throw new Error(`Top three must have 3 items, not ${topThree.length}`);

  return topThree.reduce((a, b) => a + b.sum, 0);
};
