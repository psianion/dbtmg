import React from 'react';

const AboutHeading = () => {
  const [activeSection, setActiveSection] = React.useState('About.');
  const sections = ['About.', 'Partners.', 'Team.'];

  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>About.</h1>
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
              {section}
            </div>
          ))}
        </div>
        <p className='w-[400px] text-right text-sm font-light text-red-600 leading-4 uppercase'>
          Bay Area focus, experienced management and long term local
          relationships have been the keys to TMG’s{' '}
          <b className='font-semibold'>40‑year track record</b> of success.
        </p>
      </div>
      <div className='w-[400px] h-[1px] bg-slate-500 my-10' />
    </div>
  );
};

export default AboutHeading;
