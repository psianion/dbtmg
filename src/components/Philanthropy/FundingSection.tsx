import React from 'react';
import Divider from '../Divider';

const FundingSection = () => {
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col gap-6'>
      <div className='w-full flex'>
        <div className='w-[400px] hidden lg:block'></div>
        <div className='flex flex-col w-full lg:w-[680px] gap-2'>
          <p className='font-semibold text-lg text-slate-600'>
            Housing, Community and the Arts
          </p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            Valor Estate and its management have been active participants in
            supporting the Mumbai Metropolitan Region’s network of nonprofit
            organizations through both corporate and individual philanthropic
            efforts for over 40 years.
          </p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            The firm and its principals are deeply committed to the issues,
            needs, and people they engage with through their extensive
            experience in the communities where they live and work—and where
            they remain dedicated to making a positive impact. Valor is
            committed to enhancing the health and well-being of the Greater
            Mumbai Region.
          </p>
          <p className='font-light text-sm text-slate-600'>
            In addition to its core philanthropic initiatives, the firm also
            organizes annual company-wide days of service at charitable
            organizations across the Bay Area. Most recently, these days of
            service have included volunteering at the following organizations:
          </p>
        </div>
      </div>
      <div className='w-[200px] lg:w-[400px]'>
        <Divider />
      </div>
    </div>
  );
};

export default FundingSection;
