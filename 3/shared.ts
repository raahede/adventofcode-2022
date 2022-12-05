import { intersection } from 'lodash';

export interface Rucksack {
  compartments: [string[], string[]];
  sharedItem: string;
}

export type Group = [string[], string[], string[]];

export const itemTypes = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const itemPriority = (itemType: string) => {
  const index = itemTypes.indexOf(itemType);

  if (index === -1) throw new Error(`Item type not found: ${itemType}`);

  return index + 1;
};

export const mapRucksackData = (data: string): Rucksack[] => {
  return data
    .split('\n') // split on newline
    .filter((str) => !!str) // remove empty
    .map((rucksackTxt) => {
      const length = rucksackTxt.length;
      if (length % 2 !== 0)
        throw new Error(`Rucksack items are not an even number ${length}`);
      const compartmentA = Array.from(rucksackTxt.substring(0, length / 2));
      const compartmentB = Array.from(rucksackTxt.substring(length / 2));

      if (compartmentA.length !== compartmentB.length)
        throw new Error(
          `Rucksack compartments do not have equal sizes ${length}`
        );

      const sharedItems = intersection(compartmentA, compartmentB);

      if (sharedItems.length > 1)
        throw new Error(
          `Compartments should have a maximum of 1 shared item, ${sharedItems.length} found: ${sharedItems}`
        );

      const { 0: sharedItem } = sharedItems;

      if (!sharedItem) throw new Error(`Compartments must have a shared item`);

      return {
        compartments: [compartmentA, compartmentB],
        sharedItem,
      };
    });
};

export const mapGroupData = (data: string): Group[] => {
  const groups: Group[] = [];

  const rucksacks = data
    .split('\n') // split on newline
    .filter((str) => !!str)
    .map((rucksackTxt) => Array.from(rucksackTxt)); // remove empty

  if (rucksacks.length % 3 !== 0)
    throw new Error('Number of lines must be divisible by 3');

  rucksacks.forEach((rucksack) => {
    if (!groups.length || groups[groups.length - 1].length === 3) {
      const group = [rucksack] as unknown as Group;
      groups.push(group);
    } else {
      groups[groups.length - 1].push(rucksack);
    }
  });

  if (groups.length !== rucksacks.length / 3)
    throw new Error('Grouped rucksacks do not fit number of rucksacks');

  return groups;
};

export const getGroupBadge = (group: Group): string => {
  const commonLetters = intersection(...group);

  if (commonLetters.length !== 1)
    throw new Error('There should always be one badge in a group');

  return commonLetters[0];
};

export const getBadgePrioritySum = (groups: Group[]): number => {
  return groups
    .map((group) => getGroupBadge(group))
    .reduce(
      (accumulator, currentValue) => accumulator + itemPriority(currentValue),
      0
    );
};

export const getPrioritySum = (rucksacks: Rucksack[]): number => {
  return rucksacks
    .map((rucksack) =>
      rucksack.sharedItem ? itemPriority(rucksack.sharedItem) : 0
    )
    .reduce((a, b) => a + b, 0);
};
