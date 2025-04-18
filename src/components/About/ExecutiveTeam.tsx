import React from 'react';

const ExecutiveTeam = () => {
  return (
    <div className='flex flex-col w-[1080px]'>
      <h2 className='text-lg font-semibold text-slate-600 mb-6'>
        Executive Team.
      </h2>
      <div className='flex gap-4 flex-wrap'>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className='flex flex-col gap-2 w-[200px] text-slate-600 hover:text-red-700 cursor-pointer'
          >
            <div className='w-full h-[200px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
            <div className='flex flex-col gap-0'>
              <p className='font-light text-xl leading-6'>John Doe</p>
              <p className='font-light text-xs uppercase text-slate-600'>CEO</p>
              <p className='font-light text-xs text-slate-600'>
                John is the CEO of the company and has over 20 years of
                experience in the industry.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveTeam;
