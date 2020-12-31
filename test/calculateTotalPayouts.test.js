import calculateTotalPayouts from '../src/calculateTotalPayouts';

describe('calculateTotalPayouts', () => {
  it('calculates total for a win', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, points: 'WIN' },
      home: { teamId: 2, points: 'LOSS' },
      matchupPeriodId: 1,
      winner: 'away',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 5 },
      2: { name: 'testUser2', payout: 0 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory);

    expect(actual).toEqual(expected);
  });
  it('calculates total for multiple wins', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, points: 'WIN' },
      home: { teamId: 2, points: 'LOSS' },
      matchupPeriodId: 1,
      winner: 'away',
    }, {
      away: { teamId: 1, points: 'WIN' },
      home: { teamId: 2, points: 'LOSS' },
      matchupPeriodId: 2,
      winner: 'away',
    }, {
      away: { teamId: 1, points: 'LOSS' },
      home: { teamId: 2, points: 'WIN' },
      matchupPeriodId: 1,
      winner: 'home',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 10 },
      2: { name: 'testUser2', payout: 5 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory);

    expect(actual).toEqual(expected);
  });
  it('calculates a win through points', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, points: 'LOSS' },
      home: { teamId: 2, points: 'WIN' },
      matchupPeriodId: 1,
      winner: 'tie',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 5 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory);

    expect(actual).toEqual(expected);
  });
  it('calculates a tie', () => {
    const memberMappings = {
      1: { name: 'testUser1', payout: 0 },
      2: { name: 'testUser2', payout: 0 },
    };
    const matchHistory = [{
      away: { teamId: 1, points: 'tie' },
      home: { teamId: 2, points: 'tie' },
      matchupPeriodId: 1,
      winner: 'tie',
    }];
    const expected = {
      1: { name: 'testUser1', payout: 2.5 },
      2: { name: 'testUser2', payout: 2.5 },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory);

    expect(actual).toEqual(expected);
  });
});
