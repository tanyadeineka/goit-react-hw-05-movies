import css from './MovieForm.module.css';
import { ReactComponent as SearchIcon } from './svg/Search.svg';

export const MovieForm = ({ onSubmit, value }) => {
  return (
    <div className={css.searchbar}>
      <form onSubmit={onSubmit} className={css.form}>
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
