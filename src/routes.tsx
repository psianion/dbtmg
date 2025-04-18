import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '*', element: <Navigate to='/' replace /> }
]);

export default router;
