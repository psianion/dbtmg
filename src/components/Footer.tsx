import { cn } from '@/lib/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FooterMobile = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const defaultStyle = `font-light text-slate-600 text-sm cursor-pointer`;
  return (
    <div className='w-[90%] mt-auto flex lg:hidden flex-col gap-3 justify-center mb-8'>
      <div className='flex items-center justify-between gap-2'>
        <div className='w-[200px] h-[60px] rounded-sm bg-transparent bg-[url(/DB_LOGO.png)] bg-center bg-cover bg-no-repeat mt-1' />
        <div className='w-[70px] h-[70px] rounded-sm  bg-[url(/25years.png)] bg-transparent bg-center bg-cover bg-no-repeat ' />
      </div>
      <div className='flex flex-col gap-0 mt-2'>
        <p className={cn(defaultStyle)} onClick={() => handleNavigation('/')}>
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
      <div className='flex gap-5'>
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
            Portfolio
          </p>
          <p
            className={cn(defaultStyle)}
            onClick={() => handleNavigation('/board-of-directors')}
          >
            Board of Directors
          </p>
          <p
            className={cn(defaultStyle)}
            onClick={() => handleNavigation('/investor-relations')}
          >
            Investor Relations
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
            onClick={() => handleNavigation('/news')}
          >
            News & Awards
          </p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <p className='font-light text-slate-500 text-xs'>
          © 2025 Valor Estate Limited.
        </p>
        <p
          className='font-light text-slate-500 text-xs cursor-pointer'
          onClick={() => handleNavigation('/terms-of-use')}
        >
          Terms of Use
        </p>
      </div>
    </div>
  );
};
const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const defaultStyle = `font-light text-slate-600 text-sm cursor-pointer`;

  return (
    <div className='w-full mt-auto flex justify-center mb-8'>
      <div className='w-[1080px]  hidden lg:flex flex-col border-t-2 border-solid border-slate-400 pt-4'>
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
              Portfolio
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
              onClick={() => handleNavigation('/news')}
            >
              News & Awards
            </p>
            <p
              className={cn(defaultStyle)}
              onClick={() => handleNavigation('/investor-relations')}
            >
              Investor Relations
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-[70px] h-[70px] rounded-sm bg-transparent bg-[url(/25years.png)] bg-center bg-cover bg-no-repeat ' />
            <div className='w-[210px] h-[70px] rounded-sm bg-transparent bg-[url(/DB_LOGO.png)] bg-center bg-cover bg-no-repeat mt-1' />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <p className='font-light text-slate-500 text-xs'>
            © 2025 Valor Estate Limited.
          </p>
          <p
            className='font-light text-slate-500 text-xs cursor-pointer'
            onClick={() => handleNavigation('/terms-of-use')}
          >
            Terms of Use
          </p>
        </div>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Footer;
