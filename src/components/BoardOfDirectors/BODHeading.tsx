import React from 'react';
import Divider from '../Divider';

const BODHeading = () => {
  return (
    <div className='flex flex-col w-[90%] lg:w-[1080px]'>
      <h1 className='text-6xl lg:text-8xl text-slate-600 font-thin my-6'>
        Board Of Directors.
      </h1>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-1'></div>
        <p className='w-[400px] text-right text-sm font-light text-red-600 leading-4 uppercase'>
          VALOR ESTATE IS PRIVILEGED TO WORK WITH A BOARD REPRESENTED BY WORLD
          LEADERS IN DEVELOPMENT, REAL ESTATE, GOVERNMENT AND FINANCE.
        </p>
      </div>
      <div className='w-[200px] lg:w-[400px]'>
        <Divider />
      </div>
    </div>
  );
};

export default BODHeading;
