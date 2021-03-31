import calculateTotalPayouts from './calculateTotalPayouts';
import getLeagueInfo from './network/getLeagueInfo';
import getFantasyYear from './network/getFantasyYear';
import getMatchupHistory from './network/getMatchupHistory';
import filterResultsByWeek from './filterResultsByWeek';
import postTotalResults from './postTotalResults';
import hasHandledFinalWeek from './hasHandledFinalWeek';
import handleFinalWeek from './handleFinalWeek';

export default async () => {
  const { LEAGUE_ID } = process.env;

  try {
    const year = await getFantasyYear();
    const { currentMatchupPeriod, isActive, memberMappings } = await getLeagueInfo(LEAGUE_ID, year);
    const previouslyCompletedPeriod = currentMatchupPeriod - 1;
    const seasonIsCompleted = !isActive && await hasHandledFinalWeek(year);
    const isFinalWeek = false;

    // TODO: Find regular season termination condition
    if (seasonIsCompleted) {
      return;
    }

    const matchupHistory = await getMatchupHistory(LEAGUE_ID, year);
    const matchupForSingleWeek = filterResultsByWeek(previouslyCompletedPeriod, matchupHistory);
    const payoutForSingleWeek = calculateTotalPayouts(memberMappings, matchupForSingleWeek);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);

    await postTotalResults(payoutForSingleWeek, `WEEK ${previouslyCompletedPeriod} PAYOUT`);
    await postTotalResults(totalPayoutsByTeam, 'TOTAL PAYOUT');

    if (isFinalWeek) {
      await handleFinalWeek(year);
    }
  } catch (error) {
    console.log(error);
  }
};
