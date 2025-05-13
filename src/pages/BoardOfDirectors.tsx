import { BODData } from '@/assets/BODData';
import BODHeading from '@/components/BoardOfDirectors/BODHeading';
import BODHero from '@/components/BoardOfDirectors/BODHero';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { fetchEntries } from '@/lib/contentfulClient';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

const BoardOfDirectors = () => {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBoard = async () => {
    try {
      const response = await fetchEntries('boardOfDirectors');
      const data = response.map((item) => {
        return {
          name: item.fields.name,
          designation: item.fields.designation,
          directorCategory: item.fields.directorCategory,
          bio: item.fields.shortBiography,
          image: `https:${item.fields.profilePic.fields.file.url}`
        };
      });
      setBoard(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  if (loading) return <p>Loading Board...</p>;
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <BODHero />
      <BODHeading />
      <div className='flex flex-col w-[1080px] mb-8'>
        {board.length &&
          board.map((el, index) => (
            <div key={index} className='flex flex-col w-full gap-5'>
              <p className='font-semibold text-slate-600 text-xl p-7 pb-0 pt-2'>
                {el.name}
              </p>
              <div className='w-full flex justify-between p-7 py-0'>
                <div className='w-[750px] font-light text-slate-600 text-[15px] leading-5 prose'>
                  <Markdown>{el.bio}</Markdown>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${el.image})`
                  }}
                  className='w-[250px] h-[250px] bg-center bg-cover bg-no-repeat'
                />
              </div>
              {index !== board.length - 1 && (
                <Divider width={'400px'} margin={5} />
              )}
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default BoardOfDirectors;
