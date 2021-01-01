import calculateTotalPayouts from './calculateTotalPayouts';
import filterResultsByWeek from './filterResultsByWeek';
import getLeagueInfo from './getLeagueInfo';
import getMatchupHistory from './getMatchupHistory';
import postTotalResults from './postTotalResults';

export default async () => {
  // TODO: See if there is a way to programatically figure out the year
  const { LEAGUE_ID, YEAR } = process.env;

  try {
    const { currentMatchupPeriod, memberMappings } = await getLeagueInfo(LEAGUE_ID, YEAR);
    const matchupHistory = await getMatchupHistory(LEAGUE_ID, YEAR);
    const matchupForSingleWeek = filterResultsByWeek(currentMatchupPeriod, matchupHistory);
    const payoutForSingleWeek = calculateTotalPayouts(memberMappings, matchupForSingleWeek);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);

    await postTotalResults(payoutForSingleWeek, `WEEK ${currentMatchupPeriod} PAYOUT`);
    await postTotalResults(totalPayoutsByTeam, 'TOTAL PAYOUT');
  } catch (error) {
    console.log(error);
  }
};
