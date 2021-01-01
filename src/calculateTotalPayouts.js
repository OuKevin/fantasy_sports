/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';

const FIVE_DOLLARS = 5;
const WEEKLY_WIN_PAYOUT = FIVE_DOLLARS;
const WEEKLY_TIE_PAYOUT = FIVE_DOLLARS / 2;

export default (memberMappings, matchupHistory) => (
  matchupHistory.reduce((prev, cur) => {
    const { winner, home, away } = cur;

    // Handle Ties, still need to validate & improve this path.
    if (winner !== 'home' && winner !== 'away') {
      if (home.points === 'WIN') {
        prev[home.teamId].payout += WEEKLY_WIN_PAYOUT;
      } else if (away.points === 'WIN') {
        prev[away.teamId].payout += WEEKLY_WIN_PAYOUT;
      } else {
        prev[home.teamId].payout += WEEKLY_TIE_PAYOUT;
        prev[away.teamId].payout += WEEKLY_TIE_PAYOUT;
      }

      return prev;
    }

    const winningId = cur[winner].teamId;

    prev[winningId].payout += WEEKLY_WIN_PAYOUT;

    return prev;
  }, cloneDeep(memberMappings))
);
