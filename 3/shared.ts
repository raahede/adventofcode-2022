export interface Rucksack {
  compartments: [string[], string[]];
  sharedItem?: string;
}

export const itemTypes = 'abcdefghijklmnopqrstuvwxyxABCDEFGHIJKLMNOPQRSTUVWXYX';

export const itemPriority = (itemType: string) => {
  const index = itemTypes.indexOf(itemType);

  if (index === -1) throw new Error(`Item type not found: ${itemType}`);

  return index + 1;
};
