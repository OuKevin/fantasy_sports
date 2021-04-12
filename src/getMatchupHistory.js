/* eslint-disable no-param-reassign */
import axios from 'axios';
import formatScheduleByWeek from './formatScheduleByWeek';
import { FANTASY_V3_BASE_ENDPOINT } from './constants';

export default async (leagueId, leagueType, tiebreakerCategory, year) => {
  const ENDPOINT = `${FANTASY_V3_BASE_ENDPOINT}/${leagueType}/seasons/${year}/segments/0/leagues/${leagueId}?view=mMatchup`;

  const { data: { schedule } } = await axios.get(ENDPOINT);

  return formatScheduleByWeek(schedule, leagueType, tiebreakerCategory);
};
