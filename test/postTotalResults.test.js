import { generateMessage } from '../src/postTotalResults';

describe('generateMessage', () => {
  it('generates week payout sorted by payout then name', () => {
    const memberMappings = {
      1: { name: 'charlie', payout: 10 },
      2: { name: 'ben', payout: 0 },
      3: { name: 'daniel', payout: 10 },
      4: { name: 'annie', payout: 0 },
      9: { name: 'winston', payout: 5 },
    };

    const expected = '-------------------- \n *WEEK 5 PAYOUT* \n -------------------- \n charlie: $10 \n daniel: $10 \n winston: $5 \n annie: $0 \n ben: $0';
    const actual = generateMessage(memberMappings, 'WEEK 5 PAYOUT');

    expect(actual).toEqual(expected);
  });
});
