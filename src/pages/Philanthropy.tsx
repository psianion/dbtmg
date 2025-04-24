import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import FundingSection from '@/components/Philanthropy/FundingSection';
import PhilHeading from '@/components/Philanthropy/PhilHeading';
import PhilHero from '@/components/Philanthropy/PhilHero';
import PhilSection1 from '@/components/Philanthropy/PhilSection1';
import PhilSection2 from '@/components/Philanthropy/PhilSection2';
import PhilSection3 from '@/components/Philanthropy/PhilSection3';

const Philanthropy = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <PhilHero />
      <PhilHeading />
      <FundingSection />
      <PhilSection1 />
      <PhilSection2 />
      <PhilSection3 />
      <Footer />
    </div>
  );
};

export default Philanthropy;
