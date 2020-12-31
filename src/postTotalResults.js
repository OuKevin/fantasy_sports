import axios from 'axios';
import map from 'lodash/map';

export default async (results) => {
  const { SLACK_WEBHOOK } = process.env;
  const formattedResults = map(results, ({ name, payout }) => ({ name, payout }));
  const sortedResults = formattedResults.sort((a, b) => {
    // sorts by payout then by name
    if (b.payout === a.payout) {
      return a.name.localeCompare(b.name);
    }

    return b.payout - a.payout;
  });
  const message = sortedResults.map((({ name, payout }) => `${name}: $${payout}`));
  const messageHeader = '--------------- \n *Total Payouts* \n ---------------';
  const formattedMessage = `${messageHeader} \n ${message.join(' \n ')}`;

  await axios.put(SLACK_WEBHOOK, { text: formattedMessage });
};
