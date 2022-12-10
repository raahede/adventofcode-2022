import chalk from 'chalk';
import fs from 'fs';
import { getFirstMarker } from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRed(err));
    process.exit(1);
  }

  if (data) {
    try {
      const startOfPackageMarker = getFirstMarker(data.toString().trim());
      const startOfMessageMarker = getFirstMarker(data.toString().trim(), 14);

      // Print result
      console.log(
        chalk.bgBlueBright.underline(
          `\nstart-of-packet marker: ${startOfPackageMarker}\n`
        )
      );
      console.log(
        chalk.bgBlueBright.underline(
          `\nstart-of-message marker: ${startOfMessageMarker}\n`
        )
      );
    } catch (error) {
      console.error(chalk.bgRed(error));
      process.exit(1);
    }
  }

  process.exit(0);
});
