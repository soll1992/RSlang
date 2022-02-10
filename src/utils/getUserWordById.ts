import axios, { AxiosError } from 'axios';
import UserWord from 'src/types/UserWord';

function getUserWordById(wordId: string, userId: string, token: string) {
  return axios
    .get<UserWord>(`https://react-rslang-group.herokuapp.com/users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => new Error(String(err.response?.status)));
}

export default getUserWordById;
