import { cn } from '@/lib/utils';
import HowWeThinkModal from '@/pages/HowWeThink';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PiXLogo } from 'react-icons/pi';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { Menu, X } from 'lucide-react';
import HowWeThinkMobile from '@/pages/HowWeThinkMobile';

const NavMobile = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const defaultStyle = `w-fit font-[200] text-xl text-slate-500 hover:bg-slate-100 cursor-pointer px-2`;
  return (
    <>
      <div
        className={`w-[95%] flex flex-col absolute top-2 z-10 p-2 ${
          isOpen ? 'bg-white backdrop-blur-md' : ''
        }`}
      >
        <div className='flex items-start justify-between w-full'>
          <div
            onClick={() => handleNavigation('/')}
            className='w-[160px] h-[50px] cursor-pointer bg-[url(/DB_LOGO.webp)] bg-center bg-cover bg-no-repeat'
          ></div>
          <div
            className='w-10 h-10 flex items-center justify-center bg-white'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className='text-slate-500' />
            ) : (
              <Menu className='text-slate-500' />
            )}
          </div>
        </div>
        {isOpen && (
          <div className='flex flex-col gap-2 mt-4'>
            <div
              onClick={() => handleNavigation('/about')}
              className={defaultStyle}
            >
              About
            </div>
            <div
              onClick={() => handleNavigation('/portfolio')}
              className={defaultStyle}
            >
              Portfolio
            </div>
            <div
              onClick={() => handleNavigation('/board-of-directors')}
              className={defaultStyle}
            >
              Board of Directors
            </div>
            <div
              onClick={() => handleNavigation('/relationships')}
              className={defaultStyle}
            >
              Relationships
            </div>
            <div
              onClick={() => handleNavigation('/philanthropy')}
              className={defaultStyle}
            >
              Philanthropy
            </div>
            <div
              onClick={() =>
                (window.location.href =
                  'https://investors.dbrealty.co.in/investor-relations.php')
              }
              className={defaultStyle}
            >
              Investor Relations
            </div>
            <div
              onClick={() => handleNavigation('/news')}
              className={defaultStyle}
            >
              News & Awards
            </div>
            <div
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className={cn(
                defaultStyle,
                'bg-red-500 hover:bg-red-400 text-white py-1 px-3'
              )}
            >
              How We Think
            </div>
            <div className='flex flex-col gap-0 mt-2'>
              <p
                className={cn(defaultStyle, 'text-md')}
                onClick={() => handleNavigation('/')}
              >
                Valor Estate Limited
              </p>
              <p className={cn(defaultStyle, 'text-md')}>
                7th Floor, Resham Bhavan, Veer Nariman Road
              </p>
              <p className={cn(defaultStyle, 'text-md')}>
                Churchgate, Mumbai, MH 400020
              </p>
            </div>
            <div className='flex flex-col gap-0 mt-2'>
              <p className={cn(defaultStyle, 'text-md')}>investors@dbg.co.in</p>
              <p className={cn(defaultStyle, 'text-md')}>+91 22 49742706 T</p>
            </div>
            {/* <div className='w-full my-3 flex items-center'>
              <div
                className='w-6 h-6 cursor-pointer'
                onClick={() => window.open('https://x.com/dbreality', '_blank')}
              >
                <PiXLogo className='w-full h-full text-slate-400' />
              </div>
              <div
                className='w-6 h-5 cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://www.facebook.com/profile.php?id=100063612379380',
                    '_blank'
                  )
                }
              >
                <FaFacebookF className='w-full h-full text-slate-400' />
              </div>
              <div
                className='w-6 h-6 cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/company/db-realty-ltd/',
                    '_blank'
                  )
                }
              >
                <FaLinkedinIn className='w-full h-full text-slate-400' />
              </div>
            </div> */}
          </div>
        )}
      </div>
      {isModalOpen && <HowWeThinkMobile setIsModalOpen={setIsModalOpen} />}
    </>
  );
};
const Nav = ({ activePage }: { activePage?: string }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const defaultStyle = `w-[170px] h-[34px] bg-white/60 hover:bg-white cursor-pointer flex items-center justify-center font-light text-md text-slate-800`;

  return (
    <>
      <div className='lg:hidden w-[95%] mx-4'>
        <NavMobile />
      </div>
      <div className='hidden lg:block'>
        <div className='w-[1080px] flex justify-center  mx-auto min-h-20 gap-1 absolute top-6 left-1/2 -translate-x-1/2 z-10'>
          <div
            onClick={() => handleNavigation('/')}
            className='w-[200px] h-[60px] bg-white hover:bg-white/60 cursor-pointer  bg-[url(/DB_LOGO.webp)] bg-start bg-cover bg-no-repeat p-4'
          ></div>
          <div
            onClick={() => handleNavigation('/about')}
            className={cn(defaultStyle, 'w-[120px]')}
          >
            About
          </div>
          <div
            onClick={() => handleNavigation('/portfolio')}
            className={cn(defaultStyle, 'w-[140px]')}
          >
            Portfolio
          </div>
          <div
            className={cn(defaultStyle)}
            onClick={() => handleNavigation('/board-of-directors')}
          >
            Board of Directors
          </div>
          <div
            onClick={() => handleNavigation('/relationships')}
            className={cn(defaultStyle)}
          >
            Relationships
          </div>
          <div className='w-[170px] h-[80px] flex flex-col gap-1'>
            <div
              onClick={() => handleNavigation('/philanthropy')}
              className={cn(defaultStyle)}
            >
              Philanthropy
            </div>
            <div
              className={cn(defaultStyle)}
              onClick={() =>
                (window.location.href =
                  'https://investors.dbrealty.co.in/investor-relations.php')
              }
            >
              Investor Relations
            </div>
          </div>

          <div className='w-[150px] h-[120px] flex flex-col gap-1'>
            <div
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/news')}
            >
              News & Awards
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className={cn(
                defaultStyle,
                'bg-red-500 hover:bg-red-400 text-white'
              )}
            >
              How We Think
            </div>
            {/* <div className='flex items-center gap-2 w-[170px] justify-end'>
              <div
                className='w-6 h-6 cursor-pointer'
                onClick={() => window.open('https://x.com/dbreality', '_blank')}
              >
                <PiXLogo className='w-full h-full text-slate-200' />
              </div>
              <div
                className='w-6 h-5 cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://www.facebook.com/profile.php?id=100063612379380',
                    '_blank'
                  )
                }
              >
                <FaFacebookF className='w-full h-full text-slate-200' />
              </div>
              <div
                className='w-6 h-6 cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/company/db-realty-ltd/',
                    '_blank'
                  )
                }
              >
                <FaLinkedinIn className='w-full h-full text-slate-200' />
              </div>
              <div
                className='w-6 h-6 cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/company/db-realty-ltd/',
                    '_blank'
                  )
                }
              >
                <FaYoutube className='w-full h-full text-slate-100' />
              </div>
            </div> */}
          </div>
        </div>
        {isModalOpen && <HowWeThinkModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </>
  );
};

export default Nav;
