import formatScheduleByWeek from '../src/formatScheduleByWeek';

describe('formatScheduleByWeek', () => {
  const schedule = [{
    away: {
      teamId: 1,
      cumulativeScore: {
        scoreByStat: {
          0: {
            result: 'WIN',
          },
        },
      },
    },
    home: {
      cumulativeScore: {
        scoreByStat: {
          0: {
            result: 'LOSS',
          },
        },
      },
      teamId: 2,
    },
    matchupPeriodId: 1,
    winner: 'AWAY',
  }, {
    away: {
      cumulativeScore: {
        scoreByStat: {
          0: {
            result: 'LOSS',
          },
        },
      },
      teamId: 1,
    },
    home: {
      cumulativeScore: {
        scoreByStat: {
          0: {
            result: 'WIN',
          },
        },
      },
      teamId: 2,
    },
    matchupPeriodId: 2,
    winner: 'HOME',
  }, {
    away: {
      teamId: 1,
      cumulativeScore: {
        scoreByStat: {
          0: {
            result: 'WIN',
          },
        },
      },
    },
    home: {
      teamId: 2,
      cumulativeScore: {
        scoreByStat: {
          0: {
            result: 'LOSS',
          },
        },
      },
    },
    matchupPeriodId: 3,
    winner: 'TIE',
  }];
  const leagueType = 'fba';
  const tiebreakerCategory = 'points';

  it('returns formatted schedules', () => {
    const expected = [{
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      loser: 'home',
      matchupPeriodId: 1,
      winner: 'away',
    }, {
      away: { teamId: 1, tiebreakerCat: 'LOSS' },
      home: { teamId: 2, tiebreakerCat: 'WIN' },
      loser: 'away',
      matchupPeriodId: 2,
      winner: 'home',
    }, {
      away: { teamId: 1, tiebreakerCat: 'WIN' },
      home: { teamId: 2, tiebreakerCat: 'LOSS' },
      loser: 'tie',
      matchupPeriodId: 3,
      winner: 'tie',
    }];

    const actual = formatScheduleByWeek(schedule, leagueType, tiebreakerCategory);

    expect(actual).toEqual(expected);
  });
});
