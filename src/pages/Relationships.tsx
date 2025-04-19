import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import RelationshipsHeading from '@/components/Relationships/RelationshipsHeading';
import RelationshipsHero from '@/components/Relationships/RelationshipsHero';

const Relationships = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <RelationshipsHero />
      <RelationshipsHeading />
      <Footer />
    </div>
  );
};

export default Relationships;
