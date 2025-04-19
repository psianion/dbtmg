import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import PortfolioHeading from '@/components/Portfolio/PortfolioHeading';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import RecentProjectsPortfolio from '@/components/Portfolio/RecentProjects';
import SignatureProjectsPortfolio from '@/components/Portfolio/SignatureProjects';
import React from 'react';

const Portfolio = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <PortfolioHero />
      <PortfolioHeading />
      <RecentProjectsPortfolio />
      <Divider width={'1080px'} />
      <SignatureProjectsPortfolio />
      <Footer />
    </div>
  );
};

export default Portfolio;
