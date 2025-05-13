import { fetchEntries } from '@/lib/contentfulClient';
import React from 'react';
import ProjectMap from '../Map';

const RecentProjectsSection = () => {
  const [activeSection, setActiveSection] = React.useState('Recent Projects');
  const [projects, setProjects] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

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

  const sections = [
    'Recent Projects',
    'Signature Projects',
    'Mumbai Experience Map'
  ];
  return (
    <div className='w-[1080px] flex flex-col gap-6 my-20'>
      <div className='w-full flex items-start justify-between'>
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
        <p className='w-[500px] text-sm font-light text-slate-600 leading-4.5'>
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
        <div className='w-full overflow-x-scroll flex gap-2 pb-6'>
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
      )}
      {activeSection === 'Signature Projects' && (
        <div className='w-full overflow-x-scroll flex gap-2 pb-6'>
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
                  <p className='font-light text-sm text-slate-600'>{el.city}</p>
                  <p className='font-light text-sm text-slate-600'>
                    {`${el.area} sq. ft.`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecentProjectsSection;
