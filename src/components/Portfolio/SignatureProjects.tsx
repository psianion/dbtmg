import React from 'react';

const SignatureProjectsPortfolio = ({ projects }) => {
  return (
    <div className='flex flex-col w-[1080px] mb-10'>
      <h2 className='text-lg font-semibold text-slate-600 mb-6'>
        Signature Projects.
      </h2>
      <div className='flex gap-4 flex-wrap'>
        {projects.map((el, index) => (
          <div
            key={index}
            className='flex flex-col gap-2 w-[200px] text-slate-600 hover:text-red-700 cursor-pointer'
          >
            <div
              style={{
                backgroundImage: `url(https:${el.fields.images[0].fields.file.url})`
              }}
              className={`w-full h-[120px] bg-center bg-cover bg-no-repeat`}
            />
            <div className='flex flex-col gap-0'>
              <p className='font-semibold text-sm'>{el.fields.name}</p>
              <p className='font-light text-xs uppercase text-slate-600'>
                {el.fields.city}
              </p>
              <p className='font-light text-xs text-slate-600'>
                {`${el.fields.area} sq. ft.`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureProjectsPortfolio;
