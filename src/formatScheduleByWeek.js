import { CATEGORY_TO_STAT_INDEX } from './constants';

const formatLoser = (winner) => {
  switch (winner) {
    case 'home':
      return 'away';
    case 'away':
      return 'home';
    default:
      return 'tie';
  }
};

export default (schedule, leagueType, tiebreakerCategory) => {
  const validMatches = schedule.filter(({ winner }) => winner !== 'UNDECIDED');
  const mappedSchedule = validMatches.map(({
    away, home, matchupPeriodId, winner,
  }) => {
    const statIndex = CATEGORY_TO_STAT_INDEX[leagueType]?.[tiebreakerCategory];
    const formattedWinner = winner.toLowerCase();
    const loser = formatLoser(formattedWinner);

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
      winner: formattedWinner,
      loser,
    });
  });

  return mappedSchedule;
};
