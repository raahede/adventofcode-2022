import {
  itemPriority,
  itemTypes,
  Rucksack,
  mapRucksackData,
  getPrioritySum,
} from './shared';

describe('itemPriority', () => {
  Array.from(itemTypes).forEach((letter, index) => {
    test(`${letter} has priority ${index + 1}`, () => {
      expect(itemPriority(letter)).toBe(index + 1);
    });
  });

  test('throws if letter is not found', () => {
    expect(() => itemPriority('Æ')).toThrow();
  });
});

const data = `
abcade
AaBCbcAd
`;

describe('mapRucksackData', () => {
  const expectedOutput: Rucksack[] = [
    {
      compartments: [
        ['a', 'b', 'c'],
        ['a', 'd', 'e'],
      ],
      sharedItem: 'a',
    },
    {
      compartments: [
        ['A', 'a', 'B', 'C'],
        ['b', 'c', 'A', 'd'],
      ],
      sharedItem: 'A',
    },
  ];
  test('maps data correctly', () => {
    expect(mapRucksackData(data)).toEqual(expectedOutput);
  });

  test('throws if uneven number of letters', () => {
    expect(() => mapRucksackData('abcades')).toThrow();
  });

  test('throws if more than one shared item found', () => {
    expect(() => mapRucksackData('AaBBdCBDbcAd')).toThrow();
  });

  test('throws if no shared items are found', () => {
    expect(() => mapRucksackData('abcdEFGH')).toThrow();
  });
});

describe('getPrioritySum', () => {
  const data: Rucksack[] = [
    {
      compartments: [
        ['a', 'b'],
        ['a', 'd'],
      ],
      sharedItem: 'a',
    },
    {
      compartments: [
        ['A', 'a'],
        ['c', 'A'],
      ],
      sharedItem: 'A',
    },
    {
      compartments: [
        ['Z', 'a'],
        ['c', 'Z'],
      ],
      sharedItem: 'Z',
    },
  ];
  test('gets correct sum', () => {
    expect(getPrioritySum(data)).toEqual(1 + 27 + 52);
  });
});
