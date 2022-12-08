import {
  countCompleteOverlaps,
  countPartialOverlaps,
  getNumberArrayFromStringRange,
  mapPairData,
  Pair,
  pairsCompletelyOverlap,
  pairsPartiallyOverlap,
} from './shared';

describe('getNumberArrayFromStringRange', () => {
  it('maps range correctly to array', () => {
    expect(getNumberArrayFromStringRange('1-5')).toEqual([1, 2, 3, 4, 5]);
    expect(getNumberArrayFromStringRange('250-250')).toEqual([250]);
    expect(getNumberArrayFromStringRange('499-504')).toEqual([
      499, 500, 501, 502, 503, 504,
    ]);
  });

  it('throws if range input is not a number', () => {
    expect(() => getNumberArrayFromStringRange('a-5')).toThrow();
    expect(() => getNumberArrayFromStringRange('10-😃')).toThrow();
    expect(() => getNumberArrayFromStringRange('10')).toThrow();
  });
});

describe('mapPairData', () => {
  it('maps pair correctly', () => {
    expect(mapPairData('1-5,2-4')).toEqual([
      [1, 2, 3, 4, 5],
      [2, 3, 4],
    ]);
    expect(mapPairData('250-250,249-251')).toEqual([[250], [249, 250, 251]]);
    expect(mapPairData('499-504,503-504')).toEqual([
      [499, 500, 501, 502, 503, 504],
      [503, 504],
    ]);
  });

  it('throws if not two ranges', () => {
    expect(() => mapPairData('1-5')).toThrow();
    expect(() => mapPairData('250-250,249-251,250-250')).toThrow();
  });

  it('throws if range input is not a number', () => {
    expect(() => mapPairData('a-5,1-3')).toThrow();
    expect(() => mapPairData('400-405,10-😃')).toThrow();
  });
});

describe('pairsCompletelyOverlap', () => {
  it('gauges overlap correctly', () => {
    expect(
      pairsCompletelyOverlap([
        [1, 2, 3, 4, 5],
        [2, 3, 4],
      ])
    ).toBe(true);

    expect(
      pairsCompletelyOverlap([
        [410, 411, 412],
        [409, 410, 411, 412],
      ])
    ).toBe(true);

    expect(
      pairsCompletelyOverlap([
        [410, 411, 412, 413],
        [409, 410, 411, 412],
      ])
    ).toBe(false);
  });
});

describe('pairsPartiallyOverlap', () => {
  it('gauges overlap correctly', () => {
    expect(
      pairsPartiallyOverlap([
        [1, 2, 3, 4, 5],
        [2, 3, 4],
      ])
    ).toBe(true);

    expect(
      pairsPartiallyOverlap([
        [410, 411, 412, 413],
        [409, 410, 411, 412],
      ])
    ).toBe(true);

    expect(
      pairsPartiallyOverlap([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ])
    ).toBe(false);
  });
});

describe('countCompleteOverlaps', () => {
  const pairs: Pair[] = [
    [
      [1, 2, 3, 4, 5],
      [2, 3, 4],
    ],
    [
      [410, 411, 412],
      [409, 410, 411, 412],
    ],
    [
      [410, 411, 412, 413],
      [409, 410, 411, 412],
    ],
  ];

  it('counts overlap correctly', () => {
    expect(countCompleteOverlaps(pairs)).toBe(2);
  });
});

describe('countPartialOverlaps', () => {
  const pairs: Pair[] = [
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ],
    [
      [1, 2, 3, 4, 5],
      [2, 3, 4],
    ],
    [
      [410, 411, 412],
      [409, 410, 411, 412],
    ],
    [
      [410, 411, 412, 413],
      [409, 410, 411, 412],
    ],
  ];

  it('counts overlap correctly', () => {
    expect(countPartialOverlaps(pairs)).toBe(3);
  });
});
