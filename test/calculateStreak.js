import calculateStreak from '../src/calculateStreak';

describe('calculateStreak', () => {
  describe('WIN', () => {
    const result = 'WIN';
    it('obtains first WIN after initializing', () => {
      const previousStreak = 0;
      const previousResult = 'INITIAL';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains second WIN', () => {
      const previousStreak = 1;
      const previousResult = 'WIN';
      const expected = 2;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains first WIN after a LOSE', () => {
      const previousStreak = 2;
      const previousResult = 'LOSE';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains first WIN after a TIE', () => {
      const previousStreak = 1;
      const previousResult = 'TIE';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
  });
  describe('LOSE', () => {
    const result = 'LOSE';
    it('obtains first LOSE after initializing', () => {
      const previousStreak = 0;
      const previousResult = 'INITIAL';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains second LOSE', () => {
      const previousStreak = 1;
      const previousResult = 'LOSE';
      const expected = 2;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains first LOSE after a WIN', () => {
      const previousStreak = 2;
      const previousResult = 'WIN';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains first LOSE after a TIE', () => {
      const previousStreak = 1;
      const previousResult = 'TIE';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
  });
  describe('TIE', () => {
    const result = 'TIE';
    it('obtains first tie after initializing', () => {
      const previousStreak = 0;
      const previousResult = 'INITIAL';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains second TIE', () => {
      const previousStreak = 1;
      const previousResult = 'TIE';
      const expected = 2;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains first TIE after a WIN', () => {
      const previousStreak = 2;
      const previousResult = 'WIN';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
    it('obtains first TIE after a LOSE', () => {
      const previousStreak = 1;
      const previousResult = 'TIE';
      const expected = 1;

      const actual = calculateStreak(previousResult, previousStreak, result);

      expect(actual).toBe(expected);
    });
  });
});
