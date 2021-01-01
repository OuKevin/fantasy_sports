import calculateTotalPayouts from './calculateTotalPayouts';
import filterResultsByWeek from './filterResultsByWeek';
import getTeamMappings from './getTeamMappings';
import getMatchupHistory from './getMatchupHistory';
import postTotalResults from './postTotalResults';

export default async () => {
  const { LEAGUE_ID, YEAR } = process.env;

  try {
    const WEEK = 1;
    const memberMappings = await getTeamMappings(LEAGUE_ID, YEAR);
    const matchupHistory = await getMatchupHistory(LEAGUE_ID, YEAR);
    const matchupForSingleWeek = filterResultsByWeek(WEEK, matchupHistory);
    const payoutForSingleWeek = calculateTotalPayouts(memberMappings, matchupForSingleWeek);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);

    await postTotalResults(payoutForSingleWeek, `WEEK ${WEEK} PAYOUT`);
    await postTotalResults(totalPayoutsByTeam, 'TOTAL PAYOUT');
  } catch (error) {
    console.log(error);
  }
};
