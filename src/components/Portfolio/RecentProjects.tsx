import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentProjectsPortfolio = ({ projects, ref }) => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div className='flex flex-col w-[90%] lg:w-[1080px]' ref={ref}>
      <h2 className='text-lg font-semibold text-slate-600 mb-6'>
        Recent Projects.
      </h2>
      <div className='flex gap-4 flex-wrap'>
        {projects.map((el, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(`/portfolio/${el.slug}`)}
            className='flex flex-col gap-2 w-[180px] lg:w-[200px] text-slate-600 hover:text-red-700 cursor-pointer'
          >
            <div
              style={{
                backgroundImage: `url(${el.image})`
              }}
              className={`w-full h-[120px] bg-center bg-cover bg-no-repeat`}
            />
            <div className='flex flex-col gap-0'>
              <p className='font-semibold text-sm'>{el.name}</p>
              <p className='font-light text-xs text-slate-600'>{el.city}</p>
              <p className='font-light text-xs text-slate-600'>
                {`${el.area} sq. mt.`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjectsPortfolio;
