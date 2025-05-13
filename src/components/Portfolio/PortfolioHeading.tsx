import React from 'react';
import Divider from '../Divider';

const PortfolioHeading = ({ recentRef, signatureRef, mapRef }) => {
  const [activeSection, setActiveSection] = React.useState('Recent Projects.');
  const sections = [
    'Recent Projects.',
    'Signature Projects.',
    'Mumbai Experience Map.'
  ];

  const handleScrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === 'Recent Projects.' && recentRef.current) {
      recentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (section === 'Signature Projects.' && signatureRef.current) {
      signatureRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (section === 'Mumbai Experience Map.' && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>Portfolio.</h1>
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
          TMG Partners has{' '}
          <b className='font-semibold'>
            entitled, developed, acquired and managed
          </b>{' '}
          a diversified portfolio of over 30 million square feet, valued at $6.8
          billion.
        </p>
      </div>
      <Divider width={'400px'} />
    </div>
  );
};

export default PortfolioHeading;
