import React, { useState } from 'react';
import Divider from '../Divider';
import { fetchEntries } from '@/lib/contentfulClient';

const RelationshipsHeading = () => {
  const [activeSection, setActiveSection] = React.useState(
    'Financial Partners.'
  );
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const financeRef = React.useRef<HTMLDivElement>(null);
  const governmentRef = React.useRef<HTMLDivElement>(null);
  const developmentRef = React.useRef<HTMLDivElement>(null);
  const professionalRef = React.useRef<HTMLDivElement>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetchEntries('mediaDirectory');
      const data = response.map((item) => {
        return {
          name: item.fields.name,
          images: item.fields.imageName.map(
            (el) => `https:${el.fields.file.url}`
          )
        };
      });
      setMedia(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const sections = [
    'Financial Partners.',
    'Government Partners.',
    'Development Partners.'
  ];

  const data = [
    {
      name: 'Financial Partners.',
      description:
        'Valor collaborates with equity and debt investors to ensure project capitalization aligns with market conditions, delivering superior financial performance while enhancing the quality of the environment for tenants and the communities in which it operates.',
      images:
        media?.find((item) => item.name === 'Financial Partners')?.images || [],
      names: 0,
      ref: financeRef
    },
    {
      name: 'Government Partners.',
      description:
        'Valor has worked across five or more cities in every major county neighborhood of the Mumbai Metropolitan Region. We collaborate with local government partners to develop projects that address specific development challenges and meet the unique needs of each community.',
      images:
        media?.find((item) => item.name === 'Government Partners')?.images ||
        [],
      names: 0,
      ref: governmentRef
    },
    {
      name: 'Development Partners.',
      description:
        'Valor’s joint development partners include some of the largest developers and financial institutions in the country.',
      images:
        media?.find((item) => item.name === 'Development Partners')?.images ||
        [],
      names: 0,
      ref: developmentRef
    }
    // {
    //   name: 'DB Brand Collaterals.',
    //   description:
    //     "Valor's management team is actively involved in a diverse range of local and national professional associations.",
    //   images:
    //     media?.find((item) => item.name === 'DB Brand Collaterals')?.images ||
    //     [],
    //   names: 0,
    //   ref: professionalRef
    // }
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

  if (loading) {
    return <div>Loading Relationships...</div>;
  }
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
              {item.images.map((_, index) => (
                <div
                  style={{
                    backgroundImage: `url(${item.images[index]})`
                  }}
                  className='w-[200px] h-[100px] bg-center bg-contain bg-no-repeat'
                />
              ))}
            </div>
            {/* <div className='flex flex-wrap'>
              {[...Array(item.names)].map((_, index) => (
                <p className='w-[250px] text-sm font-light leading-5'>
                  Something
                </p>
              ))}
            </div> */}
            {index < data.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelationshipsHeading;
