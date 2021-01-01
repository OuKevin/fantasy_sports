import calculateTotalPayouts from './calculateTotalPayouts';
import filterResultsByWeek from './filterResultsByWeek';
import getLeagueInfo from './getLeagueInfo';
import getMatchupHistory from './getMatchupHistory';
import postTotalResults from './postTotalResults';

export default async () => {
  // TODO: See if there is a way to programatically figure out the year
  const { LEAGUE_ID, YEAR } = process.env;
  const MAX_NUMBER_OF_GAMES = 16;

  try {
    const { currentMatchupPeriod, memberMappings } = await getLeagueInfo(LEAGUE_ID, YEAR);
    const previouslyCompletedPeriod = currentMatchupPeriod - 1;

    // TODO: Find a way to terminate the season, don't think this would account for final week
    if (previouslyCompletedPeriod > MAX_NUMBER_OF_GAMES) {
      return;
    }

    const matchupHistory = await getMatchupHistory(LEAGUE_ID, YEAR);
    const matchupForSingleWeek = filterResultsByWeek(previouslyCompletedPeriod, matchupHistory);
    const payoutForSingleWeek = calculateTotalPayouts(memberMappings, matchupForSingleWeek);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);

    await postTotalResults(payoutForSingleWeek, `WEEK ${previouslyCompletedPeriod} PAYOUT`);
    await postTotalResults(totalPayoutsByTeam, 'TOTAL PAYOUT');
  } catch (error) {
    console.log(error);
  }
};
