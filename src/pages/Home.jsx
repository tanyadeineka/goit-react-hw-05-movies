import { getTrending } from "API";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import css from "./Home.module.css";
import MovieList from "components/MovieList";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function getTrendingFilms() {
            try {
                setIsLoading(true);
                const films = await getTrending();
              setFilms(films);
              setError(null);
            } catch {
                setError('Sorry, we can not get data.');
            } finally {
                setIsLoading(false);
            }
        }
        getTrendingFilms();
    }, []);
    return (
      <div className={css.homeWrapper}>
        <h1 className={css.homeTitle}>Trending today</h1>
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        {films.length > 0 && <MovieList films={films} />}
      </div>
    );
}