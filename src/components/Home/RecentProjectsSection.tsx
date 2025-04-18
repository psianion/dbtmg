import React from 'react';

const RecentProjectsSection = () => {
  const [activeSection, setActiveSection] = React.useState('Recent Projects');
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
        <p className='w-[500px] font-lg font-light text-slate-600 leading-5.5'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
          repudiandae hic minus, consectetur officiis ea! Culpa nostrum magni
          ad, odio dicta ut quos, iusto quam vitae quia exercitationem nisi
          sapiente!
        </p>
      </div>
      <div className='w-full overflow-x-scroll flex gap-2 pb-6'>
        {[...Array(10)].map((_, index) => (
          <div className='min-w-[200px] flex flex-col gap-2'>
            <div className='w-full h-[120px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
            <div className='flex flex-col gap-0'>
              <p className='font-semibold text-sm text-slate-600'>
                Platform 16
              </p>
              <p className='font-light text-sm text-slate-600'>San Jose</p>
              <p className='font-light text-sm text-slate-600'>
                1.1 million sq. ft. Office
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjectsSection;
