import React from 'react';
import Divider from '../Divider';

const InvestorHeading = ({ activeSection, setActiveSection }) => {
  const sections = [
    'Financial Statements',
    'Codes & Policies',
    'Stock Exchange Communication',
    'Others'
  ];

  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>
        Investor Relations.
      </h1>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-1'>
          {sections.map((section) => (
            <div
              onClick={() => setActiveSection(section)}
              className={`border-l-6 h-[25px] flex items-center border-solid pl-4 cursor-pointer text-lg ${
                activeSection === section
                  ? 'border-red-600 text-red-600 font-semibold'
                  : 'border-slate-400 text-slate-600 font-light'
              }`}
              key={section}
            >
              {section}.
            </div>
          ))}
        </div>
        {/* <p className='w-[400px] text-right text-sm font-light text-red-600 leading-4 uppercase'>
          Valor has won{' '}
          <b className='font-semibold'>awards for many projects</b> including
          honors for “Best Mixed Use,” “Best Office,” and “Best Historic
          Rehabilitation”.
        </p> */}
      </div>
      <Divider width={'400px'} />
    </div>
  );
};

export default InvestorHeading;
