import React from 'react';
import Divider from '../Divider';

const AboutHeading = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
  const [activeSection, setActiveSection] = React.useState('About.');
  const sections = ['About.', 'Team.'];

  const handleScrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === 'Team.' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>About.</h1>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-1'>
          {sections.map((section) => (
            <div
              onClick={() => handleScrollToSection(section)}
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
          MUMBAI METROPOLITAN REGION FOCUS, EXPERIENCED MANAGEMENT AND LONG TERM
          LOCAL RELATIONSHIPS HAVE BEEN THE KEYS TO VALOR’S{' '}
          <b className='font-semibold'>25‑year track record</b> of success.
        </p>
      </div>
      <Divider width={'400px'} />
    </div>
  );
};

export default AboutHeading;
