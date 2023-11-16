export const getRucksacks = (data: string): number[][] => {
  return data.split('\n\n').map((str) =>
    str
      .split('\n')
      .filter((str) => !!str)
      .flatMap((str) => parseInt(str))
  );
};

type Rucksack = {
  sum: number;
  rucksack: number[];
};

export const mapRucksackData = (data: number[][]): Rucksack[] => {
  return data.map((rucksack) => {
    const sum = rucksack.reduce((a, b) => a + b, 0);

    return {
      sum,
      rucksack,
    };
  });
};

export const mostCaloriesCaried = (data: Rucksack[]): number => {
  return data
    .map((rucksack) => rucksack.sum)
    .reduce((accumulated, current) => Math.max(accumulated, current));
};

export const mostCaloriesCariedByTopThree = (data: Rucksack[]): number => {
  const sortedData = data.sort((a, b) => b.sum - a.sum);
  const top3 = sortedData.slice(0, 3);
  const sum = top3.reduce((total, next) => total + next.sum, 0);

  return sum;
};
