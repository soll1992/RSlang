import axios, { AxiosError } from 'axios';
import UserWord from 'src/types/UserWord';
import removeUserDataFromStorage from './removeUserDataFromStorage';

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
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
}

export default updateUserWord;
