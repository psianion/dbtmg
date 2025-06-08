import { fetchEntries } from '@/lib/contentfulClient';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HowWeThinkMobile = ({
  setIsModalOpen
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const fetchHWT = async () => {
    try {
      const response = await fetchEntries('howWeThink');
      const _data = response.map((item) => {
        return {
          quote: item.fields.quote,
          description: item.fields.description,
          slideName: item.fields.slideName,
          rank: item.fields.rank,
          quoteAttribution: item.fields.quoteAttribution,
          image: `https:${item.fields.sliderPic.fields.file.url}`
        };
      });

      const sortedData = _data.sort((a, b) => a.rank - b.rank);
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHWT();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const closeModal = () => setIsModalOpen(false);
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-white flex flex-col z-100'
      onClick={() => closeModal()}
    >
      <div className='flex items-start justify-between absolute top-2 z-120 pl-2 w-[95%]'>
        <div
          onClick={() => {
            handleNavigation('/');
            closeModal();
          }}
          className='w-[150px] h-[50px] cursor-pointer  bg-[url(/DB_LOGO.webp)] bg-center bg-cover bg-no-repeat'
        ></div>
        <div
          className='w-10 h-10 flex items-center justify-center bg-white'
          onClick={() => closeModal()}
        >
          <X className='text-slate-500' />
        </div>
      </div>
      <div className='w-full h-screen overflow-y-scroll flex flex-col'>
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center'
              onClick={() => setIsModalOpen(true)}
            >
              <div
                className='w-full h-80 bg-center bg-no-repeat bg-cover p-6 relative'
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className='absolute top-0 left-0 w-full h-full bg-black/40' />
                {index !== 0 && (
                  <p className='absolute top-4 left-0 text-xs uppercase font-[400] text-white bg-red-500 px-2 py-1 pl-6'>
                    {item.slideName}
                  </p>
                )}
                <div className='absolute bottom-0 mb-6'>
                  <p className='text-4xl font-[200] text-white'>{item.quote}</p>
                  {item.quoteAttribution && (
                    <p className='text-xs font-[200] text-white mt-1'>
                      - {item.quoteAttribution}
                    </p>
                  )}
                </div>
              </div>
              <div className='w-full bg-[#333] p-6 text-white font-light text-md'>
                {item.description}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HowWeThinkMobile;
