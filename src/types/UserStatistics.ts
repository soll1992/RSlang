type UserStatistics = {
  learnedWords: number;
  optional?: {
    [key: string]: {
      [key: string]: {
        newWordsQuantity: number;
        rightAnswers: number;
        wrongAnswers: number;
        responsesSeries: number;
        gamesCounter: number;
      };
    };
  };
  id?: string;
};

export default UserStatistics;
