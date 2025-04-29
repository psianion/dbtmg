import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import PortfolioHeading from '@/components/Portfolio/PortfolioHeading';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import RecentProjectsPortfolio from '@/components/Portfolio/RecentProjects';
import SignatureProjectsPortfolio from '@/components/Portfolio/SignatureProjects';
import React, { useEffect, useState } from 'react';
import { fetchEntries } from '@/lib/contentfulClient';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries('projects')
      .then((items) => {
        setProjects(items);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <PortfolioHero />
      <PortfolioHeading />
      <RecentProjectsPortfolio projects={projects} />
      <Divider width={'1080px'} />
      <SignatureProjectsPortfolio projects={projects} />
      <Footer />
    </div>
  );
};

export default Portfolio;
