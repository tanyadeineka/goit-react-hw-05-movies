import { React } from "react";
import { useLocation, Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MoovieList({ films }) {
    const location = useLocation();
    return (
      <ul className={css.list}>
        {films.map(film => (
          <li key={film.id} className={css.item}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${film.poster}`}
              alt={film.title}
              width={300}
            ></img>
            <Link
              className={css.link}
              to={`${film.id}`}
              state={{ from: location }}
            >
              {film.title}
            </Link>
          </li>
        ))}
      </ul>
    );

}