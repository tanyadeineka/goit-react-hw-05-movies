import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getByKeywords } from "API";
import MovieList from '../components/MovieList';
import { MovieForm } from '../components/MovieForm';
import Loader from "../components/Loader";
import css from "./Movies.module.css";

export default function Movies() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const filmQuery = searchParams.get('query') ?? '';

    useEffect(() => {
        if (filmQuery === '') return;
        async function getQueryFilms() {
            try {
                setIsLoading(true);
                const filmsData = await getByKeywords(filmQuery);
                setFilms(filmsData);
                setError(null);
            } catch {
                setError('Sorry, we can not get data.');
            } finally {
                setIsLoading(false);
            }
        }
        getQueryFilms();
    }, [filmQuery]);

    return (
      <div className={css.moviesWrapper}>
        <MovieForm />
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        {filmQuery !== '' && films.length === 0 && !isLoading && (
          <p className={css.notify}>
            We don't have this film. Try do other query
          </p>
        )}
        {films.length > 0 && <MovieList films={films} />}
      </div>
    );
}