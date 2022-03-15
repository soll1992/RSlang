import React from 'react';
import './wordStatisticsCard.scss';

type Props = {
  data: string | number;
  text: string;
};

export default function WordStatisticsCard({ data, text }: Props) {
  return (
    <div className="word-statistics-card">
      <div className="word-statistics-card__data">{data}</div>
      <div className="word-statistics-card__text">{text}</div>
    </div>
  );
}
