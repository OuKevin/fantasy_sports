/* eslint-disable no-param-reassign */
import axios from 'axios';

export default async (leagueId, year) => {
  const ENDPOINT = `http://fantasy.espn.com/apis/v3/games/fba/seasons/${year}/segments/0/leagues/${leagueId}`;
  const { data: { teams } } = await axios.get(ENDPOINT);

  const ownersById = teams.reduce((prev, { id, location, nickname }) => {
    prev[id] = {
      name: `${location} ${nickname}`,
      payout: 0,
    };

    return prev;
  }, {});

  return ownersById;
};
