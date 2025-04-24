import { LeadershipData } from '@/assets/AboutData';
import React from 'react';

const LeadershipTeam = ({
  data,
  name,
  ref
}: {
  data: any;
  name: string;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className='flex flex-col w-[1080px] my-5' ref={ref}>
      <h2 className='text-lg font-semibold text-slate-600 mb-6'>{name}.</h2>
      <div className='flex gap-4 flex-wrap'>
        {data.map((el, index) => (
          <div
            key={el.id}
            className='flex flex-col gap-2 w-[200px] text-slate-600 hover:text-red-700 cursor-pointer'
          >
            <div className='w-full h-[200px] bg-[url(/hero/hero1.jpg)] bg-center bg-cover bg-no-repeat' />
            <div className='flex flex-col gap-0'>
              <p className='font-light text-xl leading-6'>{el.name}</p>
              <p className='font-light text-[13px] text-slate-600 leading-4'>
                {el.title}
              </p>
              {/* <p className='font-light text-xs text-slate-600'>
                John is the CEO of the company and has over 20 years of
                experience in the industry.
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipTeam;
