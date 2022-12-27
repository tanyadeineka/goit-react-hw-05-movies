import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div className={css.container}>
      <header>
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.link)}
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.link)}
            to="/movies"
          >
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
