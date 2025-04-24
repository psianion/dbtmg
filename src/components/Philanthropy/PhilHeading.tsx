import React from 'react';
import Divider from '../Divider';

const PhilHeading = () => {
  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>Philanthropy.</h1>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-1'></div>
        <p className='w-[400px] text-right text-sm font-light text-red-600 leading-4 uppercase'>
          WE MEASURE OUR SUCCESS BY WHAT WE CAN CONTRIBUTE BEYOND THE
          PERFORMANCE OF OUR DEVELOPMENT PROJECTS TO SUPPORT AND IMPROVE THE
          HEALTH OF THE MUMBAI METROPOLITAN REGION AS A WHOLE.
        </p>
      </div>
      <Divider width={'400px'} />
    </div>
  );
};

export default PhilHeading;
