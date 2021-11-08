export const FANTASY_V3_BASE_ENDPOINT = 'https://fantasy.espn.com/apis/v3/games';
export const TIE = 'TIE';
export const LOSE = 'LOSE';
export const WIN = 'WIN';
export const STREAK_THRESHOLD = 2;
// TODO: add more as needed
export const CATEGORY_TO_STAT_INDEX = {
  fba: {
    points: 0,
  },
  flb: {
    runs: 20,
  },
};

export default FANTASY_V3_BASE_ENDPOINT;
