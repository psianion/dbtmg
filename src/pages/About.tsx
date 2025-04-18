import AboutHeading from '@/components/About/AboutHeading';
import AboutHero from '@/components/About/AboutHero';
import AboutMain from '@/components/About/AboutMain';
import ExecutiveTeam from '@/components/About/ExecutiveTeam';
import Partners from '@/components/About/Partners';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import React from 'react';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <AboutHero />
      <AboutHeading />
      <AboutMain />
      <Divider width={'1080px'} />
      <ExecutiveTeam />
      <Partners />
      <Footer />
    </div>
  );
};

export default About;
