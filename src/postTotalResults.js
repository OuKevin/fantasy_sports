import axios from 'axios';
import map from 'lodash/map';

export const generateMessage = (results, headerText) => {
  const formattedResults = map(results, ({ name, payout }) => ({ name, payout }));

  // sorts by payout then by name
  const sortedResults = formattedResults.sort((a, b) => {
    if (b.payout === a.payout) {
      return a.name.localeCompare(b.name);
    }

    return b.payout - a.payout;
  });
  const message = sortedResults.map((({ name, payout }) => `${name}: $${payout}`));
  const messageHeader = `-------------------- \n *${headerText}* \n --------------------`;
  const formattedMessage = `${messageHeader} \n ${message.join(' \n ')}`;

  return formattedMessage;
};

export default async (results, headerText) => {
  const { SLACK_WEBHOOK } = process.env;
  const formattedMessage = generateMessage(results, headerText);

  await axios.put(SLACK_WEBHOOK, { text: formattedMessage });
};
