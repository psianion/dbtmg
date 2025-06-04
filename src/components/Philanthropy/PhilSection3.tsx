import React from 'react';
import Divider from '../Divider';

const PhilSection3 = () => {
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col gap-6'>
      <div className='w-full flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[450px] p-0 lg:p-7 pt-0 lg:pt-0 lg:pr-12'>
          <p className='font-light text-slate-500 text-4xl'>
            “Philanthropy is not a side project. It is central to who we are and
            how we build.”
          </p>
          <span className='font-light text-md text-slate-600 mt-2'>
            — Internal CSR Charter, Valor Estate Ltd.
          </span>
        </div>
        <div className='flex flex-col w-full lg:w-[630px] gap-2'>
          <p className='font-light text-2xl text-slate-600'>A Legacy of Care</p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            Through a harmonious blend of compassion, foresight, and strategic
            execution, Valor Estate Ltd. continues to define what it means to be
            a socially responsible business in the modern era. From the slums of
            Mumbai to the classrooms of Pirojpura, the company’s philanthropic
            reach underscores a simple truth: real success is measured not just
            in square feet, but in the lives we touch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhilSection3;
