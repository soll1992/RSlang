import Word from './Word';

type AgregatedWords = [
  {
    paginatedResults: Word[];
    totalCount: [
      {
        count: number;
      }
    ];
  }
];

export default AgregatedWords;
