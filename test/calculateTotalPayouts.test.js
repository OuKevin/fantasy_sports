import calculateTotalPayouts from '../src/calculateTotalPayouts';

describe('calculateTotalPayouts', () => {
  const PAYOUT = 5;

  it('calculates total for a win', () => {
    const memberMappings = {
      1: {
        name: 'testUser1', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
      2: {
        name: 'testUser2', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      matchupPeriodId: 1,
      winner: 'away',
      loser: 'home',
    }];
    const expected = {
      1: {
        name: 'testUser1', payout: 5, previousGameResult: 'WIN', streak: 1,
      },
      2: {
        name: 'testUser2', payout: 0, previousGameResult: 'LOSE', streak: 1,
      },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
  it('calculates total for multiple wins', () => {
    const memberMappings = {
      1: {
        name: 'testUser1', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
      2: {
        name: 'testUser2', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      matchupPeriodId: 1,
      winner: 'away',
      loser: 'home',
    }, {
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      matchupPeriodId: 2,
      winner: 'away',
      loser: 'home',
    }, {
      away: { teamId: 1, tiebreakerCat: 'LOSS' },
      home: { teamId: 2, tiebreakerCat: 'WIN' },
      matchupPeriodId: 1,
      winner: 'home',
      loser: 'away',
    }];
    const expected = {
      1: {
        name: 'testUser1', payout: 10, previousGameResult: 'LOSE', streak: 1,
      },
      2: {
        name: 'testUser2', payout: 5, previousGameResult: 'WIN', streak: 1,
      },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
  it('calculates a win through tiebreakerCat', () => {
    const memberMappings = {
      1: {
        name: 'testUser1', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
      2: {
        name: 'testUser2', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'LOSS' },
      home: { teamId: 2, tiebreakerCat: 'WIN' },
      matchupPeriodId: 1,
      winner: 'tie',
      loser: 'tie',
    }, {
      away: { teamId: 1, tiebreakerCat: 'LOSS' },
      home: { teamId: 2, tiebreakerCat: 'WIN' },
      matchupPeriodId: 1,
      winner: 'home',
      loser: 'away',
    }];
    const expected = {
      1: {
        name: 'testUser1', payout: 0, previousGameResult: 'LOSE', streak: 2,
      },
      2: {
        name: 'testUser2', payout: 10, previousGameResult: 'WIN', streak: 2,
      },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
  it('calculates a tie', () => {
    const memberMappings = {
      1: {
        name: 'testUser1', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
      2: {
        name: 'testUser2', payout: 0, previousGameResult: 'INITIAL', streak: 0,
      },
    };
    const matchHistory = [{
      away: { teamId: 1, tiebreakerCat: 'tie' },
      home: { teamId: 2, tiebreakerCat: 'tie' },
      matchupPeriodId: 1,
      winner: 'tie',
      loser: 'tie',
    }];
    const expected = {
      1: {
        name: 'testUser1', payout: 2.5, previousGameResult: 'TIE', streak: 1,
      },
      2: {
        name: 'testUser2', payout: 2.5, previousGameResult: 'TIE', streak: 1,
      },
    };
    const actual = calculateTotalPayouts(memberMappings, matchHistory, PAYOUT);

    expect(actual).toEqual(expected);
  });
});
