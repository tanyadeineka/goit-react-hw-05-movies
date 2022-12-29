import { React } from 'react';
import css from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ films }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {films.map(film => (
        <li key={film.id} className={css.item}>
          {film.poster ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${film.poster}`}
              alt={film.title}
              width={300}
            />
          ) : (
            <img
              src="https://img.freepik.com/premium-vector/photo-frame-icon-empty-photo-blank-vector-on-isolated-transparent-background-eps-10_399089-1290.jpg"
              alt="film poster"
              width={300}
            />
          )}
          <Link
            className={css.link}
            to={`/movies/${film.id}`}
            state={{ from: location }}
          >
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
