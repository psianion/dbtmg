import { BODData } from '@/assets/BODData';
import BODHeading from '@/components/BoardOfDirectors/BODHeading';
import BODHero from '@/components/BoardOfDirectors/BODHero';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

const BoardOfDirectors = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <BODHero />
      <BODHeading />
      <div className='flex flex-col w-[1080px] mb-8'>
        {BODData.map((el, index) => (
          <div key={index} className='flex flex-col w-full gap-5'>
            <p className='font-semibold text-slate-600 text-xl p-7 pb-0 pt-2'>
              {el.name}
            </p>
            <div className='w-full flex justify-between p-7 py-0'>
              <div className='w-[750px] font-light text-slate-600 text-[15px] leading-5'>
                {el.text}
              </div>
              <div className='w-[250px] h-[250px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
            </div>
            {index !== BODData.length - 1 && (
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
