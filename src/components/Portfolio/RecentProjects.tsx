import React from 'react';

const RecentProjectsPortfolio = () => {
  return (
    <div className='flex flex-col w-[1080px]'>
      <h2 className='text-lg font-semibold text-slate-600 mb-6'>
        Recent Projects.
      </h2>
      <div className='flex gap-4 flex-wrap'>
        {[...Array(11)].map((_, index) => (
          <div
            key={index}
            className='flex flex-col gap-2 w-[200px] text-slate-600 hover:text-red-700 cursor-pointer'
          >
            <div className='w-full h-[120px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
            <div className='flex flex-col gap-0'>
              <p className='font-semibold text-sm'>Landmark at One Market</p>
              <p className='font-light text-xs uppercase text-slate-600'>
                San Francisco
              </p>
              <p className='font-light text-xs text-slate-600'>
                400,000 sq. ft. Office
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjectsPortfolio;
