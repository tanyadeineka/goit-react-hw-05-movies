import { getReviews } from 'API';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import css from './Reviews.module.css';

export default function Reviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function onGetReviews() {
      try {
        setIsLoading(true);
        const reviews = await getReviews(id);
        setReviews(reviews);
        setError(null);
      } catch {
        setError("We don't have any review about this movie");
      } finally {
        setIsLoading(false);
      }
    }
    onGetReviews();
  }, [id]);
  
  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {reviews.length === 0 ? (
        <p className={css.notification}>
          We don't have any reviews about this movie
        </p>
      ) : (
        <ul className={css.list}>
          {reviews.map(review => {
            return (
              <li className={css.item} key={review.reviewId}>
                <h1>{review.author}</h1>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
