/* eslint-disable no-param-reassign */
import axios from 'axios';
import formatScheduleByWeek from './formatScheduleByWeek';

export default async (leagueId, year) => {
  const ENDPOINT = `http://fantasy.espn.com/apis/v3/games/fba/seasons/${year}/segments/0/leagues/${leagueId}?view=mMatchup`;

  const { data: { schedule } } = await axios.get(ENDPOINT);

  return formatScheduleByWeek(schedule);
};
