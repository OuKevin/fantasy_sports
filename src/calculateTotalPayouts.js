/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';
import { WEEKLY_WIN_PAYOUT } from './constants';

/*
 * Weekly winners receive determined payout amount
 * If there is a tie, points are compared to break it
 * If points are tied, winners split the payout
*/
export default (memberMappings, matchupHistory) => (
  matchupHistory.reduce((prev, cur) => {
    const { winner, home, away } = cur;

    if (winner === 'tie') {
      if (home.points === 'WIN') {
        prev[home.teamId].payout += WEEKLY_WIN_PAYOUT;
      } else if (away.points === 'WIN') {
        prev[away.teamId].payout += WEEKLY_WIN_PAYOUT;
      } else {
        prev[home.teamId].payout += WEEKLY_WIN_PAYOUT / 2;
        prev[away.teamId].payout += WEEKLY_WIN_PAYOUT / 2;
      }

      return prev;
    }

    const winningId = cur[winner].teamId;

    prev[winningId].payout += WEEKLY_WIN_PAYOUT;

    return prev;
  }, cloneDeep(memberMappings))
);
