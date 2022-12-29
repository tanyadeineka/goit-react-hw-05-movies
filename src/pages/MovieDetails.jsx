import { useEffect, useState, Suspense } from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { getDetails } from 'API';
import css from './MovieDetails.module.css';
import Loader from '../components/Loader';
import Info from 'components/Info';

export default function MovieDetails() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    async function getFilmDetails() {
      try {
        setIsLoading(true);
        const data = await getDetails(id);
        setMovieInfo(data);
      } catch {
        setError('Sorry, we can not get data.');
      } finally {
        setIsLoading(false);
      }
    }
    getFilmDetails();
  }, [id]);

  return (
    <>
      <Link className={css.goBack} to={backLinkHref}>
        Go back
      </Link>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {movieInfo && <Info movieInfo={movieInfo} />}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
