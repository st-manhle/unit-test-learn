import { isAscendingArr } from '../helpers/array';

describe ('array has ascending sorted', () => {

  describe('Incorrect cases', () => {
    it('Input not an array', () => {
      expect(isAscendingArr('')).toBe(false);
      expect(isAscendingArr(null)).toBe(false);
      expect(isAscendingArr(undefined)).toBe(false);
      expect(isAscendingArr(NaN)).toBe(false);
      expect(isAscendingArr({})).toBe(false);
      expect(isAscendingArr(1)).toBe(false);
    });
    it('Input is an array with 1 value', () => {
      expect(isAscendingArr([''])).toBe(false);
      expect(isAscendingArr([null])).toBe(false);
      expect(isAscendingArr([undefined])).toBe(false);
      expect(isAscendingArr([NaN])).toBe(false);
      expect(isAscendingArr([{}])).toBe(false);
      expect(isAscendingArr([1])).toBe(false);
    });

    it('Input is an array with 2 values', () => {
      expect(isAscendingArr([1, ''])).toBe(false);
      expect(isAscendingArr([1, null])).toBe(false);
      expect(isAscendingArr([1, undefined])).toBe(false);
      expect(isAscendingArr([1, NaN])).toBe(false);
      expect(isAscendingArr([1, {}])).toBe(false);
      // expect(isAscendingArr([1, 0])).toBe(false);
    });
  });

  describe('Correct case', () => {
    it('Input is an array with 2 values', () => {
      expect(isAscendingArr([1, 2])).toBe(true);
      expect(isAscendingArr([1, 1.1])).toBe(true);
      expect(isAscendingArr([-1, 1])).toBe(true);
    });
    it('Input is an array with more than 2 values', () => {
      expect(isAscendingArr([1, 2, 2])).toBe(true);
    });
  });
});
