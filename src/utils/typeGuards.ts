/* eslint-disable @typescript-eslint/no-explicit-any */
import Word from 'src/types/Word';
import UserWord from 'src/types/UserWord';
import UserData from 'src/types/UserData';
import UserStatistics from 'src/types/UserStatistics';

function isWord(obj: any): obj is Word {
  return ('id' in obj || '_id' in obj) && 'word' in obj;
}

function isWordsData(arr: unknown[]): arr is Word[] {
  return isWord(arr[0]);
}

function isUserData(obj: any): obj is UserData {
  return 'id' in obj && 'token' in obj;
}

function isUserWord(obj: any): obj is UserWord {
  return 'difficulty' in obj;
}

function isUserStatistics(obj: any): obj is UserStatistics {
  return 'learnedWords' in obj;
}

export { isWord, isWordsData, isUserData, isUserWord, isUserStatistics };
