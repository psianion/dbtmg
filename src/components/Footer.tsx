import { cn } from '@/lib/utils';
import React from 'react';

const Footer = () => {
  const defaultStyle = `font-light text-slate-600 text-sm`;
  return (
    <div className='w-full mt-auto flex justify-center mb-8'>
      <div className='w-[1080px] flex flex-col border-t-2 border-solid border-slate-400 pt-4'>
        <div className='w-full flex justify-between'>
          <div className='flex flex-col gap-0 mt-2'>
            <p className={cn(defaultStyle)}>DB REALTY</p>
            <p className={cn(defaultStyle)}>1 Post Street, Suite 3300</p>
            <p className={cn(defaultStyle)}>San Francisco, CA 94104</p>
          </div>
          <div className='flex flex-col gap-0 mt-2'>
            <p className={cn(defaultStyle)}>info@tmgpartners.com</p>
            <p className={cn(defaultStyle)}>415.772.5900 T</p>
            <p className={cn(defaultStyle)}>415.772.5911 F</p>
          </div>
          <div className='flex flex-col gap-0 mt-2'>
            <p className={cn(defaultStyle)}>About</p>
            <p className={cn(defaultStyle)}>Portflio</p>
            <p className={cn(defaultStyle)}>Advisory Board</p>
          </div>
          <div className='flex flex-col gap-0 mt-2'>
            <p className={cn(defaultStyle)}>Philanthropy</p>
            <p className={cn(defaultStyle)}>Relationships</p>
            <p className={cn(defaultStyle)}>News & Awards</p>
          </div>
          <div className='w-[300px] h-[80px] rounded-sm bg-slate-200'></div>
        </div>
        <p className='font-light text-slate-500 text-xs'>
          © 2025 DB Partners. Terms of Use
        </p>
      </div>
    </div>
  );
};

export default Footer;
