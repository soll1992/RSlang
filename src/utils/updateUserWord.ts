import axios, { AxiosError } from 'axios';
import UserWord from 'src/types/UserWord';

type RequestBody = {
  difficulty: string;
  optional: {
    [key: string]: unknown;
  };
};

function updateUserWord(wordId: string, userId: string, token: string, requestBody: RequestBody) {
  return axios
    .put<UserWord>(`https://react-rslang-group.herokuapp.com/users/${userId}/words/${wordId}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => new Error(String(err.response?.status)));
}

export default updateUserWord;
