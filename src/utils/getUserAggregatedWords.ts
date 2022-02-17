import axios, { AxiosError } from 'axios';
import AgregatedWords from 'src/types/AgregatedWord';
import removeUserDataFromStorage from './removeUserDataFromStorage';

type Params = {
  wordsPerPage?: number;
  group?: number;
  page?: number;
  filter?: unknown;
};

function getUserAggregatedWords(userId: string, token: string, params?: Params) {
  return axios
    .get<AgregatedWords>(`https://react-rslang-group.herokuapp.com/users/${userId}/aggregatedWords`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      params,
    })
    .then((response) => response.data[0].paginatedResults)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
}

export default getUserAggregatedWords;
