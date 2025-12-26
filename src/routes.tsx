import React, { JSX, lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const DashboardLayout = lazy(() => import("./pages/dashboard/_layout"));
const DashboardHome = lazy(() => import("./pages/dashboard/index"));
const BoardMembersPage = lazy(() => import("./pages/dashboard/board-members"));
// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const AboutDetails = lazy(() => import("./pages/AboutDetails"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioDetails = lazy(() => import("./pages/PortfolioDetails"));
const Relationships = lazy(() => import("./pages/Relationships"));
const BoardOfDirectors = lazy(() => import("./pages/BoardOfDirectors"));
const Philanthropy = lazy(() => import("./pages/Philanthropy"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Investor = lazy(() => import("./pages/InvestorRelations"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));

// Wrapper to apply Suspense to each route element
const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  { path: "/", element: withSuspense(Home) },
  { path: "/about", element: withSuspense(About) },
  { path: "/about/:slug", element: withSuspense(AboutDetails) },
  { path: "/portfolio", element: withSuspense(Portfolio) },
  { path: "/portfolio/:slug", element: withSuspense(PortfolioDetails) },
  { path: "/relationships", element: withSuspense(Relationships) },
  { path: "/philanthropy", element: withSuspense(Philanthropy) },
  { path: "/board-of-directors", element: withSuspense(BoardOfDirectors) },
  { path: "/news", element: withSuspense(Blogs) },
  { path: "/news/:slug", element: withSuspense(BlogDetails) },
  { path: "/investor-relations", element: withSuspense(Investor) },
  { path: "/terms-of-use", element: withSuspense(TermsOfUse) },
  { path: "*", element: <Navigate to="/" replace /> },

  /* ---------------- DASHBOARD ROUTES ---------------- */

  {
    path: "/dashboard",
    element: withSuspense(DashboardLayout),
    children: [
      {
        index: true,
        element: withSuspense(DashboardHome),
      },
      {
        path: "board-members",
        element: withSuspense(BoardMembersPage),
      },
    ],
  },
]);

export default router;
