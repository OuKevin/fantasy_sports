export default (WEEK, matchupHistory) => (
  matchupHistory.filter(({ matchupPeriodId }) => matchupPeriodId === WEEK)
);
