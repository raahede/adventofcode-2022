import * as fs from 'fs';
import {
  getRucksacks,
  mapRucksackData,
  mostCaloriesCariedByTopThree,
} from './shared';

fs.readFile(__dirname + '/data.txt', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(
    'RESULT',
    mostCaloriesCariedByTopThree(mapRucksackData(getRucksacks(data.toString())))
  );
});
