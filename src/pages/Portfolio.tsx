import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import PortfolioHeading from '@/components/Portfolio/PortfolioHeading';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import RecentProjectsPortfolio from '@/components/Portfolio/RecentProjects';
import SignatureProjectsPortfolio from '@/components/Portfolio/SignatureProjects';
import React, { useEffect, useState } from 'react';
import { fetchEntries } from '@/lib/contentfulClient';
import ProjectMap from '@/components/Map';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const recentRef = React.useRef<HTMLDivElement>(null);
  const signatureRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetchEntries('projects');
      const data = response.map((item) => {
        return {
          name: item.fields.name,
          city: item.fields.city,
          slug: item.fields.slug,
          area: item.fields.area,
          image: `https:${item.fields.images[0].fields.file.url}`,
          isSignature: item.fields.isSignatureProject || false,
          location: item.fields.location
        };
      });
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <PortfolioHero />
      <PortfolioHeading
        recentRef={recentRef}
        signatureRef={signatureRef}
        mapRef={mapRef}
      />
      <RecentProjectsPortfolio projects={projects} ref={recentRef} />
      <Divider width={'1080px'} />
      <SignatureProjectsPortfolio projects={projects} ref={signatureRef} />
      <Divider width={'1080px'} />
      <div className='flex flex-col w-[1080px] h-[680px] mb-10' ref={mapRef}>
        <h2 className='text-lg font-semibold text-slate-600 mb-6'>
          Mumbai Experience Map.
        </h2>
        <ProjectMap projects={projects} />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
