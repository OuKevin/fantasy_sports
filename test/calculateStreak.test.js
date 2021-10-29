import calculateStreak from '../src/calculateStreak';

describe('calculateStreak', () => {
  it('streak resets to 1 after a change in result', () => {
    const expected = 1;

    const actual = calculateStreak('LOSE', 2, 'WIN');

    expect(actual).toBe(expected);
  });
  it('adds to the streak if the result is the same', () => {
    const expected = 3;

    const actual = calculateStreak('LOSE', 2, 'LOSE');

    expect(actual).toBe(expected);
  });
});
