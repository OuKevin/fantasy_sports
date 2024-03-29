/* eslint-disable no-param-reassign */
import axios from 'axios';
import { FANTASY_V3_BASE_ENDPOINT } from './constants';

export default async (LEAGUE_TYPE) => {
  const { data: { currentSeasonId } } = await axios.get(`${FANTASY_V3_BASE_ENDPOINT}/${LEAGUE_TYPE}`);

  return currentSeasonId;
};
