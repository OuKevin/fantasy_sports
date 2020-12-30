export default (schedule) => {
  const validMatches = schedule.filter(({ winner }) => winner !== 'UNDECIDED');
  const mappedSchedule = validMatches.map(({
    away, home, matchupPeriodId, winner,
  }) => ({
    away: {
      teamId: away.teamId,
      points: away.cumulativeScore.scoreByStat[0],
    },
    home: {
      teamId: home.teamId,
      points: home.cumulativeScore.scoreByStat[0],
    },
    matchupPeriodId,
    winner,
  }));

  return mappedSchedule;
};
