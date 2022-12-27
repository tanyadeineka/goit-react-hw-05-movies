import { getTrending } from "API";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import css from "./Home.module.css";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        async function getTrendingFilms() {
            try {
                setIsLoading(true);
                const films = await getTrending();
                setFilms(films);
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
        <ul className={css.list}>
          {films.map(film => (
            <li key={film.id} className={css.item}>
              <img src={`https://image.tmdb.org/t/p/w300/${film.poster}`} alt={film.title} width={300}></img>
                  <Link className={css.link} to={`movies/${film.id}`} state={{from: location}}>{film.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}