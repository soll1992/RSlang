import { WordsDayData, GameDayData } from './DayDataStatistics';

type UserStatistics = {
  learnedWords: number;
  optional?: {
    games?: {
      [key: string]: {
        [key: string]: GameDayData;
      };
    };
    words?: {
      [key: string]: WordsDayData;
    };
  };
  id?: string;
};

export default UserStatistics;
