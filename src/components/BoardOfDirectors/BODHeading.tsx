import React from 'react';
import Divider from '../Divider';

const BODHeading = () => {
  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>
        Board Of Directors.
      </h1>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-1'></div>
        <p className='w-[400px] text-right text-sm font-light text-red-600 leading-4 uppercase'>
          VALOR ESTATE IS PRIVILEGED TO WORK WITH A BOARD OF ADVISORS
          REPRESENTED BY REGIONAL AND WORLD LEADERS IN REAL ESTATE, TECHNOLOGY,
          GOVERNMENT AND FINANCE.
        </p>
      </div>
      <Divider width={'400px'} />
    </div>
  );
};

export default BODHeading;
