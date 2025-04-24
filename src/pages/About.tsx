import {
  DesignTeam,
  DevelopmentTeam,
  FinanceTeam,
  LeadershipData,
  LegalTeam,
  LiaisonTeam,
  SalesTeam
} from '@/assets/AboutData';
import AboutHeading from '@/components/About/AboutHeading';
import AboutHero from '@/components/About/AboutHero';
import AboutMain from '@/components/About/AboutMain';
import LeadershipTeam from '@/components/About/LeadershipTeam';
import Partners from '@/components/About/Partners';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import React, { useRef } from 'react';

const About = () => {
  const teamRef = useRef<HTMLDivElement>(null);
  const teams = [
    { name: 'Leadership Team', data: LeadershipData },
    { name: 'Development Team', data: DevelopmentTeam },
    { name: 'Design Team', data: DesignTeam },
    { name: 'Sales Team', data: SalesTeam },
    { name: 'Liaison Team', data: LiaisonTeam },
    { name: 'Legal Team', data: LegalTeam },
    { name: 'Finance Team', data: FinanceTeam }
  ];
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <AboutHero />
      <AboutHeading ref={teamRef} />
      <AboutMain />
      <Divider width={'1080px'} />
      {teams.map((team, index) => (
        <LeadershipTeam
          key={index}
          data={team.data}
          name={team.name}
          ref={index === 0 ? teamRef : null}
        />
      ))}
      {/* <Partners /> */}
      <Footer />
    </div>
  );
};

export default About;
