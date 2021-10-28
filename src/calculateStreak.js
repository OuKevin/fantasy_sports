const calculateStreak = (previousResult, previousStreak, result) => (
  result === previousResult ? previousStreak + 1 : 1
);

export default calculateStreak;
