import { fetchEntries } from '@/lib/contentfulClient';
import React, { useEffect, useState } from 'react';

const HowWeThinkModal = ({
  setIsModalOpen
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHWT = async () => {
    try {
      const response = await fetchEntries('howWeThink');
      // const _data = response.map((item) => {
      //   return {
      //     title: item.fields.title,
      //     description: item.fields.description,
      //     slideName: item.fields.slideName,
      //     quote: item.fields.quote,
      //     quoteAttribution: item.fields.quoteAttribution,
      //     image: `https:${item.fields.sliderPic.fields.file.url}`
      //   };
      // });
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHWT();
  }, []);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-100'
      onClick={closeModal}
    >
      <div className='w-full h-screen bg-white p-4'></div>
    </div>
  );
};

export default HowWeThinkModal;
