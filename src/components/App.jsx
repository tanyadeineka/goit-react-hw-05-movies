import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { lazy } from "react";

const Home = lazy(() => import('../pages/Home'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<></>} />
        <Route path="movies/:id" element={<></>}>
          <Route path="cast" element={<></>} />
          <Route path="reviews" element={<></>} />
        </Route>
      </Route>
    </Routes>
  );
};
