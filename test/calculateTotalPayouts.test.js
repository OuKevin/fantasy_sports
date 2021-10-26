import calculateTotalPayouts from '../src/calculateTotalPayouts';

describe('calculateTotalPayouts', () => {
  const PAYOUT = 5;

  it('calculates total for a win', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      matchupPeriodId: 1,
      winner: 'away',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 5 },
      2: { name: 'testUser2', payout: 0 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
  it('calculates total for multiple wins', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      matchupPeriodId: 1,
      winner: 'away',
    }, {
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      matchupPeriodId: 2,
      winner: 'away',
    }, {
      away: { teamId: 1, tiebreakerCat: 'LOSS' },
      home: { teamId: 2, tiebreakerCat: 'WIN' },
      matchupPeriodId: 1,
      winner: 'home',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 10 },
      2: { name: 'testUser2', payout: 5 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
  it('calculates a win through tiebreakerCat', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'LOSS' },
      home: { teamId: 2, tiebreakerCat: 'WIN' },
      matchupPeriodId: 1,
      winner: 'tie',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 5 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
  it('calculates a tie', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'tie' },
      home: { teamId: 2, tiebreakerCat: 'tie' },
      matchupPeriodId: 1,
      winner: 'tie',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 2.5 },
      2: { name: 'testUser2', payout: 2.5 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
});
