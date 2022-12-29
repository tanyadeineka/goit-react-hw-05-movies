import { React } from 'react';
import { useLocation, Link } from 'react-router-dom';
import css from './Info.module.css';

export default function Info({ movieInfo }) {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  const genresList = () => {
    const genreArray = [];
    movieInfo.genres.map(genre => genreArray.push(genre.name));
    return genreArray.join(', ');
  };

  const image = movieInfo.poster_path;
  const title = movieInfo.title;
  const date = movieInfo.release_date.substr(0, 4);
  const score = String(Math.ceil(Number(movieInfo.vote_average) * 10));
  const overview = movieInfo.overview;
  const genres = genresList();

  return (
    <>
      <div className={css.descriptionWrapper}>
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w300/${image}`}
          alt={title}
          width={300}
        />
        <div className={css.description}>
          <h1>{`${title} (${date})`}</h1>
          <p className={css.score}>User Score: {score}%</p>
          <h2>Overview</h2>
          <p className={css.overview}>{overview}</p>
          <h2>Genres</h2>
          <p>{genres}</p>
          <p className={css.additional}>Additional information</p>
          <ul className={css.list}>
            <li className={css.item}>
              <Link
                className={css.link}
                to="cast"
                state={{ from: backLinkHref }}
              >
                Cast
              </Link>
            </li>
            <li className={css.item}>
              <Link
                className={css.link}
                to="reviews"
                state={{ from: backLinkHref }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
