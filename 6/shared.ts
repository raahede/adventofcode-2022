import { uniq } from 'lodash';

export const getFirstMarker = (data: string, numChars = 4): number => {
  let index = 0;
  do {
    const arr = data.substring(index, index + numChars).split('');
    if (uniq(arr).length === numChars) {
      return index + numChars;
    }
    index++;
  } while (index < data.length);

  console.log('data:', data);
  console.log('end index:', index);

  throw new Error('Position not found');
};
