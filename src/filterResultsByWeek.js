export default (currentMatchupPeriod, matchupHistory) => (
  matchupHistory.filter(({ matchupPeriodId }) => matchupPeriodId === currentMatchupPeriod)
);
