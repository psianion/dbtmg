import React from 'react';
import Divider from '../Divider';

const RelationshipsHeading = () => {
  const [activeSection, setActiveSection] = React.useState(
    'Financial Partners.'
  );
  const financeRef = React.useRef<HTMLDivElement>(null);
  const governmentRef = React.useRef<HTMLDivElement>(null);
  const developmentRef = React.useRef<HTMLDivElement>(null);
  const professionalRef = React.useRef<HTMLDivElement>(null);

  const sections = [
    'Financial Partners.',
    'Government Partners.',
    'Development Partners.',
    'Professional Affiliations.'
  ];

  const data = [
    {
      name: 'Financial Partners.',
      description:
        'Valor collaborates with equity and debt investors to ensure project capitalization aligns with market conditions, delivering superior financial performance while enhancing the quality of the environment for tenants and the communities in which it operates.',
      images: 6,
      names: 0,
      ref: financeRef
    },
    {
      name: 'Government Partners.',
      description:
        'Valor has worked across five or more cities in every major county neighborhood of the Mumbai Metropolitan Region. We collaborate with local government partners to develop projects that address specific development challenges and meet the unique needs of each community.',
      images: 6,
      names: 0,
      ref: governmentRef
    },
    {
      name: 'Development Partners.',
      description:
        'Valor’s joint development partners include some of the largest developers and financial institutions in the country.',
      images: 4,
      names: 0,
      ref: developmentRef
    },
    {
      name: 'Professional Affiliations.',
      description:
        "Valor's management team is actively involved in a diverse range of local and national professional associations.",
      images: 5,
      names: 0,
      ref: professionalRef
    }
  ];

  const handleScrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === 'Financial Partners.' && financeRef.current) {
      financeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (section === 'Government Partners.' && governmentRef.current) {
      governmentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (section === 'Development Partners.' && developmentRef.current) {
      developmentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (section === 'Professional Affiliations.' && professionalRef.current) {
      professionalRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-col w-[1080px]'>
      <h1 className='text-8xl text-slate-600 font-thin my-6'>Relationships.</h1>
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
          VALOR STRUCTURES PARTNERSHIPS FOR EACH TRANSACTION TO ADDRESS SPECIFIC
          COMMUNITY, INVESTOR AND END‑USER NEEDS.
        </p>
      </div>
      <Divider width={'400px'} />
      <div className='flex flex-col w-full mb-10 text-slate-600'>
        {data.map((item, index) => (
          <div key={index} className='flex flex-col gap-4' ref={item.ref}>
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
