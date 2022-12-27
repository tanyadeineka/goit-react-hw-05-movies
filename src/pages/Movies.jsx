import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getByKeywords } from "API";
import MovieList from '../components/MovieList/MovieList';
import { MovieForm } from '../components/MovieForm/MovieForm';
import Loader from "../components/Loader";
import css from "./Movies.module.css";

export default function Movies() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const filmQuery = searchParams.get('query') ?? '';

    useEffect(() => {
        if (filmQuery === '') return;
        async function getQueryFilms() {
            try {
                setIsLoading(true);
                const filmsData = await getByKeywords(filmQuery);
                setFilms(filmsData);
            } catch {
                setError('Sorry, we can not get data.');
            } finally {
                setIsLoading(false);
            }
        }
        getQueryFilms();
    }, [filmQuery]);

    const handleSubmit = event => {
        event.preventDefault();
        setSearchParams({ query: event.target.elements.query.value });
        event.target.reset();
    };

    return (
      <div className={css.moviesWrapper}>
            <MovieForm onSubmit={handleSubmit} value={filmQuery} />
            {error && <p>{error}</p>}
            {isLoading && <Loader />}
            <MovieList films={films} /> 
      </div>
    );
}