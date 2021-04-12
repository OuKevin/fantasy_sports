import { CATEGORY_TO_STAT_INDEX } from './constants';

export default (schedule, leagueType, tiebreakerCategory) => {
  const validMatches = schedule.filter(({ winner }) => winner !== 'UNDECIDED');
  const mappedSchedule = validMatches.map(({
    away, home, matchupPeriodId, winner,
  }) => {
    const statIndex = CATEGORY_TO_STAT_INDEX[leagueType]?.[tiebreakerCategory];

    return ({
      away: {
        teamId: away.teamId,
        tiebreakerCat: away.cumulativeScore.scoreByStat[statIndex].result,
      },
      home: {
        teamId: home.teamId,
        tiebreakerCat: home.cumulativeScore.scoreByStat[statIndex].result,
      },
      matchupPeriodId,
      winner: winner.toLowerCase(),
    });
  });

  return mappedSchedule;
};
