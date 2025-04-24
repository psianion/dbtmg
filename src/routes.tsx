import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Relationships from './pages/Relationships';
import BoardOfDirectors from './pages/BoardOfDirectors';
import Philanthropy from './pages/Philanthropy';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/relationships', element: <Relationships /> },
  { path: '/philanthropy', element: <Philanthropy /> },
  { path: '/board-of-directors', element: <BoardOfDirectors /> },
  { path: '*', element: <Navigate to='/' replace /> }
]);

export default router;
