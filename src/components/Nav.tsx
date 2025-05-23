import { cn } from '@/lib/utils';
import HowWeThinkModal from '@/pages/HowWeThink';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = ({ activePage }: { activePage?: string }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const defaultStyle = `w-[170px] h-[34px] bg-white/60 hover:bg-white cursor-pointer flex items-center justify-center font-light text-md text-slate-800`;
  return (
    <>
      <div className='w-[1080px] flex justify-center  mx-auto min-h-20 gap-1 absolute top-6 left-1/2 -translate-x-1/2 z-10'>
        <div
          onClick={() => handleNavigation('/')}
          className='w-[200px] h-[75px] bg-white hover:bg-white/60 cursor-pointer  bg-[url(/DB_LOGO.webp)] bg-start bg-cover bg-no-repeat p-4'
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
            onClick={() => handleNavigation('/investor-relations')}
          >
            Investor Relations
          </div>
        </div>

        <div className='w-[150px] h-[80px] flex flex-col gap-1'>
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
        </div>
      </div>
      {isModalOpen && <HowWeThinkModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default Nav;
