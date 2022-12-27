import { getCasts } from 'API';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import css from './Cast.module.css';

export default function Cast() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actors, setActors] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function onGetCast() {
      try {
        setIsLoading(true);
        const actors = await getCasts(id);
        setActors(actors);
      } catch {
        setError("We don't have any cast about this movie");
      } finally {
        setIsLoading(false);
      }
    }
    onGetCast();
  }, [id]);
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      <ul className={css.list}>
        {actors.map(actor => {
          return (
            <li className={css.item} key={actor.name}>
              {actor.avatar ? (
                <img
                  className={css.img}
                  src={`https://image.tmdb.org/t/p/w200/${actor.avatar}`}
                  alt={actor.name}
                  width={200}
                ></img>
              ) : (
                <img
                  src="https://img.freepik.com/premium-vector/photo-frame-icon-empty-photo-blank-vector-on-isolated-transparent-background-eps-10_399089-1290.jpg"
                  alt={actor.name}
                  width={200}
                ></img>
              )}
              <div>
                <p className={css.name}>{actor.name}</p>
                <p className={css.character}>Character: {actor.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
