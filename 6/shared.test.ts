import { getFirstMarker } from './shared';

describe('getFirstMarker', () => {
  it('gets end position of first set of 4 different characters', () => {
    expect(getFirstMarker('mjqjpqmg')).toBe(7);
    expect(getFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(getFirstMarker('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(getFirstMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(getFirstMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);

    expect(getFirstMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19);
    expect(getFirstMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23);
    expect(getFirstMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23);
    expect(getFirstMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29);
    expect(getFirstMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26);
  });
});
