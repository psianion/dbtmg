import React from 'react';
import Divider from '../Divider';

const PhilSection1 = () => {
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col gap-6'>
      <div className='w-full flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[450px] p-0 lg:p-7 lg:pt-0 pt-0 lg:pr-12'>
          <p className='font-light text-slate-500 text-4xl'>
            “True development begins where compassion meets commitment. Our
            communities deserve both.”
          </p>
          <span className='font-light text-md text-slate-600 mt-2'>
            — <b>Shahid Usman Balwa</b>, Director, Valor Estate Ltd.
          </span>
        </div>
        <div className='flex flex-col w-full lg:w-[630px] gap-2'>
          <p className='font-light text-2xl text-slate-600'>
            Investing in Rural Education
          </p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            The N.M. Balwa Higher Secondary School in Pirojpura, sponsored by
            the Balwa Charitable Trust (Mumbai) and managed by the Balwa
            Education Trust, has emerged as a highly respected co-educational
            institution in the region. Plans are underway to expand educational
            infrastructure in Pirojpura with a vision to serve over 10,000
            students in the near future. These educational initiatives are more
            than symbolic—they represent a strategic investment in India’s
            future. Education is viewed not just as empowerment, but as a form
            of social justice—ensuring every child has access to opportunity
            regardless of background or geography.
          </p>
          <p className='font-light text-2xl text-slate-600'>
            Slum Rehabilitation and Social Infrastructure
          </p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            Valor Estate Ltd. has also demonstrated its unwavering commitment to
            inclusive urban development through landmark social infrastructure
            projects. The company’s execution of the 8 million sq. ft. Slum
            Rehabilitation Project at Mahul, Mumbai, stands as a testament to
            this ethos. Developed and handed over to the Government of
            Maharashtra, this large-scale project reflects the company’s belief
            in dignified housing as a fundamental right. Notably, the project
            was undertaken not just as a statutory responsibility, but as a
            moral imperative—one that echoed the values of community upliftment
            and nation-building.
          </p>
        </div>
      </div>
      <Divider width='400px' />
    </div>
  );
};

export default PhilSection1;
