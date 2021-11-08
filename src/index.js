import calculateTotalPayouts from './calculateTotalPayouts';
import getLeagueInfo from './getLeagueInfo';
import getFantasyYear from './getFantasyYear';
import getMatchupHistory from './getMatchupHistory';
import postTotalResults from './postTotalResults';

export default async () => {
  const {
    LEAGUE_ID,
    LEAGUE_TYPE,
    TIEBREAKER_CATEGORY,
    WEEKLY_WIN_PAYOUT,
  } = process.env;

  try {
    const year = await getFantasyYear(LEAGUE_TYPE);
    const {
      currentMatchupPeriod,
      isActive,
      memberMappings,
    } = await getLeagueInfo(LEAGUE_ID, LEAGUE_TYPE, year);
    const previouslyCompletedPeriod = currentMatchupPeriod - 1;

    // TODO: Validate if this is correct way to end the season
    if (!isActive) {
      return;
    }

    const matchupHistory = await getMatchupHistory(
      LEAGUE_ID,
      LEAGUE_TYPE,
      TIEBREAKER_CATEGORY,
      year,
    );
    const totalPayoutsByTeam = calculateTotalPayouts(
      memberMappings,
      matchupHistory,
      WEEKLY_WIN_PAYOUT,
    );

    await postTotalResults(totalPayoutsByTeam, `WEEK ${previouslyCompletedPeriod} TOTAL PAYOUT `);
  } catch (error) {
    console.log(error);
  }
};
