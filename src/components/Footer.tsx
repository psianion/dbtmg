import { cn } from '@/lib/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const defaultStyle = `font-light text-slate-600 text-sm`;
  return (
    <div className='w-full mt-auto flex justify-center mb-8'>
      <div className='w-[1080px] flex flex-col border-t-2 border-solid border-slate-400 pt-4'>
        <div className='w-full flex justify-between'>
          <div className='flex flex-col gap-0 mt-2'>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/')}
            >
              Valor Estate Limited
            </p>
            <p className={cn(defaultStyle)}>
              7th Floor, Resham Bhavan, Veer Nariman Road
            </p>
            <p className={cn(defaultStyle)}>Churchgate, Mumbai, MH 400020</p>
          </div>
          <div className='flex flex-col gap-0 mt-2'>
            <p className={cn(defaultStyle)}>investors@dbg.co.in</p>
            <p className={cn(defaultStyle)}>+91 22 49742706 T</p>
            {/* <p className={cn(defaultStyle)}>415.772.5911 F</p> */}
          </div>
          <div className='flex flex-col gap-0 mt-2'>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/about')}
            >
              About
            </p>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/portfolio')}
            >
              Portflio
            </p>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/board-of-directors')}
            >
              Board of Directors
            </p>
          </div>
          <div className='flex flex-col gap-0 mt-2'>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/philanthropy')}
            >
              Philanthropy
            </p>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/relationships')}
            >
              Relationships
            </p>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/blogs')}
            >
              News & Awards
            </p>
          </div>
          <div className='w-[300px] h-[80px] rounded-sm bg-slate-200 bg-[url(/dblogo.webp)] bg-center bg-cover bg-no-repeat '></div>
        </div>
        <p className='font-light text-slate-500 text-xs'>
          © 2025 DB Partners. Terms of Use
        </p>
      </div>
    </div>
  );
};

export default Footer;
