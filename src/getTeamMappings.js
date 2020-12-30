/* eslint-disable no-param-reassign */
import axios from 'axios';

export default async (leagueId, year) => {
  const ENDPOINT = `https://fantasy.espn.com/apis/v3/games/fba/seasons/${year}/segments/0/leagues/${leagueId}`;

  const { data: { teams } } = await axios.get(ENDPOINT);

  const ownersById = teams.reduce((prev, { id, location, nickname }) => {
    prev[id] = `${location} ${nickname}`;

    return prev;
  }, {});

  return ownersById;
};
