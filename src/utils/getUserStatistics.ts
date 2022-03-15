import axios, { AxiosError } from 'axios';
import UserStatistics from 'src/types/UserStatistics';
import removeUserDataFromStorage from './removeUserDataFromStorage';

function getUserStatistics(userId: string, token: string) {
  return axios
    .get<UserStatistics>(`https://react-rslang-group.herokuapp.com/users/${userId}/statistics`, {
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

export default getUserStatistics;
