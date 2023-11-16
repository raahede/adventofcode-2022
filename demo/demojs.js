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

const getRucksacks = (data) => {
  return data.split('\n\n').map((str) =>
    str
      .split('\n')
      .filter((str) => !!str)
      .map((str) => parseInt(str))
  );
};

const mapRucksackData = (data) => {
  return data.map((rucksack) => {
    const sum = rucksack.reduce((a, b) => a + b, 0);

    return {
      sum,
      rucksack,
    };
  });
};

console.log(mapRucksackData(getRucksacks(data)));
