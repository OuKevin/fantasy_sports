/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';

/*
 * Weekly winners receive determined payout amount
 * If there is a tie, TIEBREAKER_CATEGORY is compared to break it
 * If TIEBREAKER_CATEGORY ends up tied, winners split the payout
*/
export default (memberMappings, matchupHistory, TIEBREAKER_CATEGORY, WEEKLY_WIN_PAYOUT) => (
  matchupHistory.reduce((prev, cur) => {
    const { winner, home, away } = cur;
    const parsedPayout = parseFloat(WEEKLY_WIN_PAYOUT, 10);

    if (winner === 'tie') {
      if (home.tiebreakerCat === 'WIN') {
        prev[home.teamId].payout += parsedPayout;
      } else if (away.tiebreakerCat === 'WIN') {
        prev[away.teamId].payout += parsedPayout;
      } else {
        prev[home.teamId].payout += parsedPayout / 2;
        prev[away.teamId].payout += parsedPayout / 2;
      }

      return prev;
    }

    const winningId = cur[winner].teamId;

    prev[winningId].payout += parsedPayout;

    return prev;
  }, cloneDeep(memberMappings))
);
