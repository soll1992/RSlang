import axios, { AxiosError } from 'axios';
import UserWord from 'src/types/UserWord';
import removeUserDataFromStorage from './removeUserDataFromStorage';

function getUserWordById(wordId: string, userId: string, token: string) {
  return axios
    .get<UserWord>(`https://rs-lang-a13h.onrender.com/users/${userId}/words/${wordId}`, {
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

export default getUserWordById;
