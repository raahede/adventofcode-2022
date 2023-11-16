import {
  getRucksacks,
  mapRucksackData,
  mostCaloriesCaried,
  mostCaloriesCariedByTopThree,
} from './shared';

const data = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

describe('getRucksacks', () => {
  const expectedOutput = [
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000],
  ];

  test('maps data correctly', () => {
    expect(getRucksacks(data)).toEqual(expectedOutput);
  });
});

describe('mostCaloriesCaried', () => {
  const expectedOutput = 24000;

  test('maps data correctly', () => {
    expect(mostCaloriesCaried(mapRucksackData(getRucksacks(data)))).toEqual(
      expectedOutput
    );
  });
});

describe('mostCaloriesCariedByTopThree', () => {
  const expectedOutput = 45000;

  test('maps data correctly', () => {
    expect(
      mostCaloriesCariedByTopThree(mapRucksackData(getRucksacks(data)))
    ).toEqual(expectedOutput);
  });
});
