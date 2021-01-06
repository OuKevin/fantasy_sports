/* eslint-disable no-param-reassign */
import axios from 'axios';
import { FANTASY_V3_BASE_ENDPOINT } from './constants';

export default async (leagueId, year) => {
  const ENDPOINT = `${FANTASY_V3_BASE_ENDPOINT}/seasons/${year}/segments/0/leagues/${leagueId}`;
  const { data: { status, teams } } = await axios.get(ENDPOINT);

  const ownersById = teams.reduce((prev, { id, location, nickname }) => {
    prev[id] = {
      name: `${location} ${nickname}`,
      payout: 0,
    };

    return prev;
  }, {});

  return {
    currentMatchupPeriod: status.currentMatchupPeriod,
    isActive: status.isActive,
    memberMappings: ownersById,
  };
};
