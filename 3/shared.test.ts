import {
  itemPriority,
  itemTypes,
  Rucksack,
  mapRucksackData,
  getPrioritySum,
  mapGroupData,
  Group,
  getGroupBadge,
  getBadgePrioritySum,
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

const data2 = `
qFd
ZCW
WJZ
crt
PWV
gmz
`;

const data3 = `
qFdBBvtHHfvRlfvsqldvqjPpQmnQmjnjjjTRTLGRNG
ZCWhhCsJCzSJzSbzgsmPTGNNPPNGjgLTLjgn
WJZsbJMwJcszJcScwhVltFwBFBlqddvFdHDfqq
crtTsGTtqFThGQGCrsjTwdNJwpRdnJJwffRClpSf
PWVBPVHLvHHVgvZWBzmPpnfRSJJRQnSRflRPSNSl
`;

describe('mapGroupData', () => {
  const expectedOutput: Group[] = [
    [
      ['q', 'F', 'd'],
      ['Z', 'C', 'W'],
      ['W', 'J', 'Z'],
    ],
    [
      ['c', 'r', 't'],
      ['P', 'W', 'V'],
      ['g', 'm', 'z'],
    ],
  ];

  test('maps data correctly', () => {
    expect(mapGroupData(data2)).toEqual(expectedOutput);
  });

  test('throws if number of lines are not divisible by 3', () => {
    expect(() => mapGroupData(data3)).toThrow();
  });
});

describe('getGroupBadge', () => {
  const group1: Group = [
    ['W', 'F', 'd'],
    ['Z', 'C', 'W'],
    ['W', 'J', 'Z'],
  ];

  const group2: Group = [
    ['W', 'F', 'd'],
    ['Z', 'F', 'W'],
    ['W', 'F', 'Z'],
  ];

  const group3: Group = [
    ['A', 'F', 'd'],
    ['Z', 's', 'W'],
    ['W', 'F', 'Z'],
  ];

  test('maps data correctly', () => {
    expect(getGroupBadge(group1)).toEqual('W');
  });

  test('throws if group has more than badge', () => {
    expect(() => getGroupBadge(group2)).toThrow();
  });

  test('throws if group has no badge', () => {
    expect(() => getGroupBadge(group3)).toThrow();
  });
});

describe('getBadgePrioritySum', () => {
  const groups: Group[] = [
    [
      ['a', 'F', 'd'],
      ['Z', 'C', 'a'],
      ['a', 'J', 'Z'],
    ],
    [
      ['A', 'F', 'd'],
      ['Z', 'C', 'A'],
      ['A', 'J', 'Z'],
    ],
    [
      ['Z', 'F', 'd'],
      ['Z', 'C', 'A'],
      ['A', 'J', 'Z'],
    ],
  ];

  test('gets correct sum', () => {
    expect(getBadgePrioritySum(groups)).toEqual(1 + 27 + 52);
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
