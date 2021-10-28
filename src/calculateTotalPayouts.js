/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';
import calculateStreak from './calculateStreak';

/*
 * Weekly winners receive determined payout amount
 * If there is a tie, TIEBREAKER_CATEGORY is compared to break it
 * If TIEBREAKER_CATEGORY ends up tied, winners split the payout
*/
export default (memberMappings, matchupHistory, WEEKLY_WIN_PAYOUT) => (
  matchupHistory.reduce((prev, cur) => {
    const {
      loser, winner, home, away,
    } = cur;
    const parsedPayout = parseFloat(WEEKLY_WIN_PAYOUT, 10);

    if (winner === 'tie') {
      if (home.tiebreakerCat === 'WIN') {
        prev[home.teamId].payout += parsedPayout;

        prev[home.teamId].streak = calculateStreak(prev[home.teamId].previousGameResult, prev[home.teamId].streak, 'WIN');
        prev[away.teamId].streak = calculateStreak(prev[away.teamId].previousGameResult, prev[away.teamId].streak, 'LOSE');

        prev[home.teamId].previousGameResult = 'WIN';
        prev[away.teamId].previousGameResult = 'LOSE';
      } else if (away.tiebreakerCat === 'WIN') {
        prev[away.teamId].payout += parsedPayout;

        prev[home.teamId].streak = calculateStreak(prev[home.teamId].previousGameResult, prev[home.teamId].streak, 'LOSE');
        prev[away.teamId].streak = calculateStreak(prev[away.teamId].previousGameResult, prev[away.teamId].streak, 'WIN');

        prev[home.teamId].previousGameResult = 'LOSE';
        prev[away.teamId].previousGameResult = 'WIN';
      } else {
        prev[home.teamId].payout += parsedPayout / 2;
        prev[away.teamId].payout += parsedPayout / 2;

        prev[home.teamId].streak = calculateStreak(prev[home.teamId].previousGameResult, prev[home.teamId].streak, 'TIE');
        prev[away.teamId].streak = calculateStreak(prev[away.teamId].previousGameResult, prev[away.teamId].streak, 'TIE');

        prev[home.teamId].previousGameResult = 'TIE';
        prev[away.teamId].previousGameResult = 'TIE';
      }

      return prev;
    }

    const winningId = cur[winner].teamId;
    const losingId = cur[loser].teamId;

    prev[winningId].streak = calculateStreak(prev[winningId].previousGameResult, prev[winningId].streak, 'WIN');
    prev[losingId].streak = calculateStreak(prev[losingId].previousGameResult, prev[losingId].streak, 'LOSE');

    prev[winningId].previousGameResult = 'WIN';
    prev[losingId].previousGameResult = 'LOSE';

    prev[winningId].payout += parsedPayout;

    return prev;
  }, cloneDeep(memberMappings))
);
