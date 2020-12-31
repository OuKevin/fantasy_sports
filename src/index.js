import getTeamMappings from './getTeamMappings';
import getMatchupHistory from './getMatchupHistory';
import calculateTotalPayouts from './calculateTotalPayouts';

export default async (event, context, callback) => {
  const YEAR = 2021;
  const LEAGUE_ID = 10991115;

  try {
    const memberMappings = await getTeamMappings(LEAGUE_ID, YEAR);
    const matchupHistory = await getMatchupHistory(LEAGUE_ID, YEAR);
    const totalPayoutsByTeam = calculateTotalPayouts(memberMappings, matchupHistory);

    const response = {
      statusCode: 200,
      body: totalPayoutsByTeam,
    };

    callback(null, response);
  } catch (error) {
    callback(new Error('internal server error'));
  }
};
