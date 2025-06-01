import { fetchEntries } from '@/lib/contentfulClient';
import React, { useEffect, useRef, useState } from 'react';
import ProjectMap from '../Map';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RecentProjectsSection = () => {
  const [activeSection, setActiveSection] = React.useState('Recent Projects');
  const [projects, setProjects] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  // Recent Projects scroll state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Signature Projects scroll state
  const [canScrollLeftSig, setCanScrollLeftSig] = useState(false);
  const [canScrollRightSig, setCanScrollRightSig] = useState(false);
  const scrollRefSig = useRef<HTMLDivElement>(null);

  const scrollByAmount = 1040;

  // --- Recent Projects Scroll Logic ---
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // --- Signature Projects Scroll Logic ---
  const checkScrollSig = () => {
    const el = scrollRefSig.current;
    if (!el) return;
    setCanScrollLeftSig(el.scrollLeft > 0);
    setCanScrollRightSig(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const handleScrollLeftSig = () => {
    if (scrollRefSig.current) {
      scrollRefSig.current.scrollBy({
        left: -scrollByAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollSig, 350);
    }
  };

  const handleScrollRightSig = () => {
    if (scrollRefSig.current) {
      scrollRefSig.current.scrollBy({
        left: scrollByAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollSig, 350);
    }
  };

  // Fetch projects
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

  useEffect(() => {
    checkScroll();
  }, [projects, activeSection]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  // Signature Projects scroll effect
  useEffect(() => {
    checkScrollSig();
  }, [projects, activeSection]);

  useEffect(() => {
    const el = scrollRefSig.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollSig);
    return () => el.removeEventListener('scroll', checkScrollSig);
  }, []);

  if (loading) return <p>Loading projects...</p>;

  const sections = [
    'Recent Projects',
    'Signature Projects',
    'Mumbai Experience Map'
  ];
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col gap-6 my-10 lg:my-20'>
      <div className='w-full flex flex-col-reverse lg:flex-row items-start justify-between gap-6'>
        <div className='flex flex-col gap-1'>
          {sections.map((section) => (
            <div
              onClick={() => setActiveSection(section)}
              className={`border-l-6 h-[25px] flex items-center border-solid pl-4 cursor-pointer text-lg ${
                activeSection === section
                  ? 'border-red-600 text-red-600 font-semibold'
                  : 'border-slate-400 text-slate-600 font-light'
              }`}
              key={section}
            >
              {section}
            </div>
          ))}
        </div>
        <p className='w-full lg:w-[500px] text-md lg:text-sm font-light text-slate-600 leading-4.5'>
          DB Realty (NSE: DB Realty) is a full service development company
          focusing on large scale, urban regeneration projects in the Mumbai
          Metropolitan Region. Our exclusive focus on brownfield development and
          on this region helps us understand the nuances of market trends and
          timing. Our relationships and technical knowledge give us an edge in
          developing iconic properties in challenging land and regulatory
          regimes.
        </p>
      </div>
      {activeSection === 'Mumbai Experience Map' && (
        <div className='w-full h-[680px]'>
          <ProjectMap projects={projects} />
        </div>
      )}
      {activeSection === 'Recent Projects' && (
        <div className=' w-full flex h-full gap-2'>
          <div
            onClick={canScrollLeft ? handleScrollLeft : undefined}
            className={`w-[30px] h-[120px] hidden lg:flex items-center justify-center bg-slate-200 ${
              !canScrollLeft
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <ChevronLeft />
          </div>
          <div
            className='w-full overflow-x-scroll flex gap-2 pb-6'
            ref={scrollRef}
          >
            {projects.map((el, index) => (
              <div className='min-w-[200px] flex flex-col gap-2' key={index}>
                <div
                  className='w-full h-[120px] bg-center bg-cover bg-no-repeat'
                  style={{
                    backgroundImage: `url(${el.image})`
                  }}
                />
                <div className='flex flex-col gap-0'>
                  <p className='font-semibold text-sm text-slate-600'>
                    {el.name}
                  </p>
                  <p className='font-light text-sm text-slate-600'>{el.city}</p>
                  <p className='font-light text-sm text-slate-600'>
                    {`${el.area} sq. mt.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={canScrollRight ? handleScrollRight : undefined}
            className={`w-[30px] h-[120px] hidden lg:flex items-center justify-center bg-slate-200 ${
              !canScrollRight
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <ChevronRight />
          </div>
        </div>
      )}
      {activeSection === 'Signature Projects' && (
        <div className='w-full flex h-full gap-2'>
          <div
            onClick={canScrollLeftSig ? handleScrollLeftSig : undefined}
            className={`w-[30px] h-[120px] hidden lg:flex items-center justify-center bg-slate-200 ${
              !canScrollLeftSig
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <ChevronLeft />
          </div>
          <div
            className='w-full overflow-x-scroll flex gap-2 pb-6'
            ref={scrollRefSig}
          >
            {projects
              .filter((el) => el.isSignature)
              .map((el, index) => (
                <div className='min-w-[200px] flex flex-col gap-2' key={index}>
                  <div
                    className='w-full h-[120px] bg-center bg-cover bg-no-repeat'
                    style={{
                      backgroundImage: `url(${el.image})`
                    }}
                  />
                  <div className='flex flex-col gap-0'>
                    <p className='font-semibold text-sm text-slate-600'>
                      {el.name}
                    </p>
                    <p className='font-light text-sm text-slate-600'>
                      {el.city}
                    </p>
                    <p className='font-light text-sm text-slate-600'>
                      {`${el.area} sq. ft.`}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div
            onClick={canScrollRightSig ? handleScrollRightSig : undefined}
            className={`w-[30px] h-[120px] hidden lg:flex items-center justify-center bg-slate-200 ${
              !canScrollRightSig
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProjectsSection;
