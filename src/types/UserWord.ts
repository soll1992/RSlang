type UserWord = {
  difficulty: string;
  optional: {
    [key: string]: unknown;
  };
  id?: string;
  wordId?: string;
};

export default UserWord;
