import { generateMessage } from '../src/postTotalResults';

describe('generateMessage', () => {
  it('generates week payout sorted by payout then name', () => {
    const memberMappings = {
      1: {
        name: 'charlie', payout: 15, previousGameResult: 'WIN', streak: 3,
      },
      2: {
        name: 'ben', payout: 5, previousGameResult: 'LOSE', streak: 3,
      },
      3: {
        name: 'daniel', payout: 15, previousGameResult: 'WIN', streak: 1,
      },
      4: {
        name: 'annie', payout: 5, previousGameResult: 'TIE', streak: 1,
      },
      9: {
        name: 'winston', payout: 7.5, previousGameResult: 'TIE', streak: 1,
      },
    };

    const expected = '-------------------------------- \n *WEEK 5 PAYOUT* \n -------------------------------- \n charlie: $15 :moneybag: :fire: \n daniel: $15 :moneybag:  \n winston: $7.5 :moneybag:  \n annie: $5 :moneybag:  \n ben: $5  :snowflake: \n \n :moneybag:: Made $$$ \n :fire:: 3+ Win Streak \n :snowflake:: 3+ Lose Streak';
    const actual = generateMessage(memberMappings, 'WEEK 5 PAYOUT');

    expect(actual).toEqual(expected);
  });
});
