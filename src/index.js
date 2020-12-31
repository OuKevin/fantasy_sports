import getTeamMappings from './getTeamMappings';
import getMatchupHistory from './getMatchupHistory';
import calculateTotalPayouts from './calculateTotalPayouts';
import postTotalResults from './postTotalResults';

export default async () => {
  const { LEAGUE_ID, YEAR } = process.env;

  try {
    const memberMappings = await getTeamMappings(LEAGUE_ID, YEAR);
    const matchupHistory = await getMatchupHistory(LEAGUE_ID, YEAR);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);
    await postTotalResults(totalPayoutsByTeam);
  } catch (error) {
    console.log(error);
  }
};
