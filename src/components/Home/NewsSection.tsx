import React from 'react';

const NewsSection = () => {
  return (
    <div className='w-[1080px] flex flex-col mb-20 gap-6 '>
      <h5 className='border-l-6 h-[30px] flex items-center border-solid border-red-700 text-red-700 pl-4 font-semibold text-xl'>
        News.
      </h5>
      <div className='w-full flex gap-8'>
        {[...Array(3)].map((_, index) => (
          <div className='flex flex-col gap-2 w-[33%] text-slate-600 hover:text-red-700 cursor-pointer'>
            <div className='w-full h-[250px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
            <div className='flex flex-col gap-0'>
              <p className='font-light text-xl leading-6'>
                Sale shows Fremont downtown district’s viability
              </p>
              <p className='font-light text-xs uppercase text-slate-600'>
                December 11, 2024
              </p>
              <p className='font-light text-xs text-slate-600'>
                Fully-leased Capitol Square gains new long-term operators
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
