import getTeamMappings from './getTeamMappings';

export default async (event, context, callback) => {
  const YEAR = 2021;
  const LEAGUE_ID = 10991115;

  try {
    const memberMappings = await getTeamMappings(LEAGUE_ID, YEAR);
    const response = {
      statusCode: 200,
      body: memberMappings,
    };

    callback(null, response);
  } catch (error) {
    callback(new Error('internal server error'));
  }
};
