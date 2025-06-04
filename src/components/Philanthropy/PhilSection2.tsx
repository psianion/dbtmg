import React from 'react';
import Divider from '../Divider';

const PhilSection2 = () => {
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col gap-6'>
      <div className='w-full flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[450px] p-0 lg:p-7 pt-0 lg:pt-0 lg:pr-12'>
          <p className='font-light text-slate-500 text-4xl'>
            “We do not just build structures. We build schools, temples,
            hospitals—and most importantly, trust.”
          </p>
          <span className='font-light text-md text-slate-600 mt-2'>
            — From the Founders’ Statement on Community Impact
          </span>
        </div>
        <div className='flex flex-col w-full lg:w-[630px] gap-2'>
          <p className='font-light text-2xl text-slate-600'>
            Sustainability and Urban Resilience
          </p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            Equally important is Valor Estate’s environmental and civic
            engagement. The company remains a staunch advocate for sustainable
            urban development. Its projects incorporate environmentally
            responsible design, efficient resource use, and a focus on
            preserving green zones in densely populated areas. Valor partners
            with like-minded organizations to drive sustainability in the built
            environment while also contributing to regional resilience planning.
            Beyond buildings, the company invests in people, in values, and in
            the idea of a better tomorrow.
          </p>
        </div>
      </div>
      <Divider width='400px' />
    </div>
  );
};

export default PhilSection2;
