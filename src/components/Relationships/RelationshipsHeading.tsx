import React from 'react';
import Divider from '../Divider';

const RelationshipsHeading = () => {
  const [activeSection, setActiveSection] = React.useState(
    'Financial Partners.'
  );

  const sections = [
    'Financial Partners.',
    'Tenants.',
    'Communities.',
    'Professional Affiliations.'
  ];

  const data = [
    {
      name: 'Financial Partners',
      description:
        'TMG Partners has a long history of working with the Bay Area’s leading financial institutions. We have a proven track record of delivering superior risk-adjusted returns to our partners.',
      images: 13,
      names: 40
    },
    {
      name: 'Tenants',
      description:
        'TMG Partners has a long history of working with the Bay Area’s leading financial institutions. We have a proven track record of delivering superior risk-adjusted returns to our partners.',
      images: 0,
      names: 60
    },
    {
      name: 'Communities',
      description:
        'TMG Partners has a long history of working with the Bay Area’s leading financial institutions. We have a proven track record of delivering superior risk-adjusted returns to our partners.',
      images: 0,
      names: 20
    },
    {
      name: 'Professional Affiliations',
      description:
        'TMG Partners has a long history of working with the Bay Area’s leading financial institutions. We have a proven track record of delivering superior risk-adjusted returns to our partners.',
      images: 4,
      names: 20
    }
  ];

  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>Relationships.</h1>
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
          TMG Partners has{' '}
          <b className='font-semibold'>
            entitled, developed, acquired and managed
          </b>{' '}
          a diversified portfolio of over 30 million square feet, valued at $6.8
          billion.
        </p>
      </div>
      <div className='w-[400px] h-[1px] bg-slate-500 my-10' />
      <div className='flex flex-col w-full mb-10 text-slate-600'>
        {data.map((item, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <p className='text-lg font-semibold '>{item.name}</p>
            <p className='text-sm font-light leading-5'>{item.description}</p>
            <div className='flex gap-4 flex-wrap'>
              {[...Array(item.images)].map((_, index) => (
                <div className='w-[200px] h-[100px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
              ))}
            </div>
            <div className='flex flex-wrap'>
              {[...Array(item.names)].map((_, index) => (
                <p className='w-[250px] text-sm font-light leading-5'>
                  Something
                </p>
              ))}
            </div>
            {index < data.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelationshipsHeading;
