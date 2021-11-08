import axios from 'axios';
import map from 'lodash/map';
import { LOSE, STREAK_THRESHOLD, WIN } from './constants';

const BORDER_TEXT = '--------------------------------';
const renderDelta = (previousGameResult) => {
  if (previousGameResult === LOSE) {
    return '';
  }

  return ':moneybag:';
};

const renderStreak = (previousGameResult, streak) => {
  const streakImage = previousGameResult === WIN ? ':fire:' : ':snowflake:';

  return streak >= STREAK_THRESHOLD ? streakImage : '';
};

export const generateMessage = (results, headerText) => {
  const formattedResults = map(results, (result) => result);

  // sorts by payout then by name
  const sortedResults = formattedResults.sort((a, b) => {
    if (b.payout === a.payout) {
      return a.name.localeCompare(b.name);
    }

    return b.payout - a.payout;
  });
  const message = sortedResults.map((({
    name, payout, previousGameResult, streak,
  }) => `${name}: $${payout} ${renderDelta(previousGameResult)} ${renderStreak(previousGameResult, streak)}`));
  const messageHeader = `${BORDER_TEXT} \n *${headerText}* \n ${BORDER_TEXT}`;
  const formattedMessage = `${messageHeader} \n ${message.join(' \n ')} \n \n :moneybag:: Made $$$ \n :fire:: 3+ Win Streak \n :snowflake:: 3+ Lose Streak`;

  return formattedMessage;
};

export default async (results, headerText) => {
  const { SLACK_WEBHOOK } = process.env;
  const formattedMessage = generateMessage(results, headerText);

  await axios.put(SLACK_WEBHOOK, { text: formattedMessage });
};
