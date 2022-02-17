import axios, { AxiosError } from 'axios';
import UserStatistics from 'src/types/UserStatistics';
import removeUserDataFromStorage from './removeUserDataFromStorage';

type RequestBody = {
  learnedWords: number;
  optional?: {
    [key: string]: unknown;
  };
};

function updateUserStatistics(userId: string, token: string, requestBody: RequestBody) {
  return axios
    .put<UserStatistics>(`https://react-rslang-group.herokuapp.com/users/${userId}/statistics`, requestBody, {
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

export default updateUserStatistics;
