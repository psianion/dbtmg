import { cn } from '@/lib/utils';
import React from 'react';

const Divider = ({ width, margin }: { width?: string; margin?: number }) => {
  return (
    <div
      className={cn(
        `${width ? `w-[${width}]` : 'w-full'} h-[1px] bg-slate-500 my-${
          margin ? `${margin}` : '10'
        }`
      )}
    />
  );
};

export default Divider;
