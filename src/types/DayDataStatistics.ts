type WordsDayData = {
  newWordsQuantity: number;
  learnedWordsQuantity: number;
  rightAnswersPercent: number;
};

type GameDayData = {
  newWordsQuantity: number;
  rightAnswers: number;
  wrongAnswers: number;
  responsesSeries: number;
  gamesCounter: number;
};

export { WordsDayData, GameDayData };
