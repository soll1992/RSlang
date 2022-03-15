import axios, { AxiosError } from 'axios';
import Word from 'src/types/Word';

type Params = {
  group?: number;
  page?: number;
};

function getWords(params?: Params) {
  return axios
    .get<Word[]>('https://react-rslang-group.herokuapp.com/words', {
      params,
    })
    .then((response) => response.data)
    .catch((err) => console.log('Error getWords', err));
}

export default getWords;
