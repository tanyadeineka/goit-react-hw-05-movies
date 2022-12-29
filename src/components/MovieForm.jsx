import css from './MovieForm.module.css';
import { ReactComponent as SearchIcon } from '../svg/Search.svg';
import { useSearchParams } from 'react-router-dom';

export const MovieForm = () => {
  const [, setSearchParams] = useSearchParams();

  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchParams({ query: evt.target.elements.query.value });
    evt.target.reset();
  };

  return (
    <div className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}></span>
          <SearchIcon width="20" height="20" className={css.searchSvg} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          name="query"
        />
      </form>
    </div>
  );
};
