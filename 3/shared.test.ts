import { itemPriority, itemTypes } from './shared';

describe('itemPriority', () => {
  Array.from(itemTypes).forEach((letter, index) => {
    test(`${letter} has priority ${index + 1}`, () => {
      expect(itemPriority(letter)).toBe(index + 1);
    });
  });
});
