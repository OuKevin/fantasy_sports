import calculateTotalPayouts from './calculateTotalPayouts';
import getLeagueInfo from './getLeagueInfo';
import getFantasyYear from './getFantasyYear';
import getMatchupHistory from './getMatchupHistory';
import filterResultsByWeek from './filterResultsByWeek';
import postTotalResults from './postTotalResults';

export default async () => {
  const { LEAGUE_ID } = process.env;

  try {
    const year = await getFantasyYear();
    const { currentMatchupPeriod, isActive, memberMappings } = await getLeagueInfo(LEAGUE_ID, year);
    const previouslyCompletedPeriod = currentMatchupPeriod - 1;

    // TODO: Validate if this is correct way to end the season
    if (!isActive) {
      return;
    }

    const matchupHistory = await getMatchupHistory(LEAGUE_ID, year);
    const matchupForSingleWeek = filterResultsByWeek(previouslyCompletedPeriod, matchupHistory);
    const payoutForSingleWeek = calculateTotalPayouts(memberMappings, matchupForSingleWeek);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);

    await postTotalResults(payoutForSingleWeek, `WEEK ${previouslyCompletedPeriod} PAYOUT`);
    await postTotalResults(totalPayoutsByTeam, 'TOTAL PAYOUT');
  } catch (error) {
    console.log(error);
  }
};
