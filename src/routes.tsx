import React, { JSX, lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Relationships = lazy(() => import('./pages/Relationships'));
const BoardOfDirectors = lazy(() => import('./pages/BoardOfDirectors'));
const Philanthropy = lazy(() => import('./pages/Philanthropy'));

// Wrapper to apply Suspense to each route element
const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  { path: '/', element: withSuspense(Home) },
  { path: '/about', element: withSuspense(About) },
  { path: '/portfolio', element: withSuspense(Portfolio) },
  { path: '/relationships', element: withSuspense(Relationships) },
  { path: '/philanthropy', element: withSuspense(Philanthropy) },
  { path: '/board-of-directors', element: withSuspense(BoardOfDirectors) },
  { path: '*', element: <Navigate to='/' replace /> }
]);

export default router;
