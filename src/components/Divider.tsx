import React from 'react';

const Divider = ({ width }: { width?: string }) => {
  return (
    <div
      className={`${
        width ? `w-[${width}]` : 'w-full'
      } h-[1px] bg-slate-500 my-10`}
    />
  );
};

export default Divider;
