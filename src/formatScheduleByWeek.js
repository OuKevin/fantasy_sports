export default (schedule) => {
  const validMatches = schedule.filter(({ winner }) => winner !== 'UNDECIDED');
  const mappedSchedule = validMatches.map(({
    away, home, matchupPeriodId, winner,
  }) => ({
    away: {
      teamId: away.teamId,
      points: away.cumulativeScore.scoreByStat[0].result,
    },
    home: {
      teamId: home.teamId,
      points: home.cumulativeScore.scoreByStat[0].result,
    },
    matchupPeriodId,
    winner: winner.toLowerCase(),
  }));

  return mappedSchedule;
};
