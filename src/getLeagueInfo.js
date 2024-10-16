/* eslint-disable no-param-reassign */
import axios from 'axios';
import { FANTASY_V3_BASE_ENDPOINT } from './constants';

export default async (leagueId, leagueType, year) => {
  const ENDPOINT = `${FANTASY_V3_BASE_ENDPOINT}/${leagueType}/seasons/${year}/segments/0/leagues/${leagueId}`;
  const { data } = await axios.get(ENDPOINT);

  console.log(ENDPOINT)

  const ownersById = data.reduce((prev, { id, abbrev }) => {
    prev[id] = {
      name: abbrev,
      payout: 0,
      previousGameResult: 'INITIAL',
      streak: 0,
    };

    return prev;
  }, {});

  return {
    currentMatchupPeriod: status.currentMatchupPeriod,
    isActive: status.isActive,
    memberMappings: ownersById,
  };
};
