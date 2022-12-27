import { useEffect, useState, Suspense, useMemo } from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { getDetails } from 'API';
import css from './MovieDetails.module.css';
import Loader from '../components/Loader';

export default function MovieDetails() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [score, setScore] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    async function getFilmDetails() {
      try {
        setIsLoading(true);
        const { image, title, date, score, overview, genres } =
          await getDetails(id);
        setImage(image);
        setTitle(title);
        setDate(date.substr(0, 4));
        setScore(String(Math.ceil(Number(score) * 10)));
        setOverview(overview);
        setGenres(genres);
      } catch {
        setError('Sorry, we can not get data.');
      } finally {
        setIsLoading(false);
      }
    }
    getFilmDetails();
  }, [id]);

  const genresList = useMemo(() => {
    const genreArray = [];
    genres.map(genre => genreArray.push(genre.name));
    return genreArray.join(', ');
  }, [genres]);

  return (
    <>
      <Link className={css.goBack} to={backLinkHref}>
        Go back
      </Link>
      <div className={css.descriptionWrapper}>
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w300/${image}`}
          alt={title}
          width={300}
        ></img>
        <div className={css.description}>
          <h1>{`${title} (${date})`}</h1>
          <p className={css.score}>User Score: {score}%</p>
          <h2>Overview</h2>
          <p className={css.overview}>{overview}</p>
          <h2>Genres</h2>
          <p>{genresList}</p>
          <p className={css.additional}>Additional information</p>
          <ul className={css.list}>
            <li className={css.item}>
              <Link className={css.link} to="cast">
                Cast
              </Link>
            </li>
            <li className={css.item}>
              <Link className={css.link} to="reviews">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
