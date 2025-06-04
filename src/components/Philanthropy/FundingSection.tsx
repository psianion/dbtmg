import React from 'react';
import Divider from '../Divider';

const FundingSection = () => {
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col gap-6'>
      <div className='w-full flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[450px] p-0 lg:p-7 pt-0 lg:pt-0 lg:pr-12'>
          <p className='font-light text-slate-500 text-4xl'>
            “Education is the most powerful investment you can make in a child’s
            future—and in the future of society.”
          </p>
          <span className='font-light text-md text-slate-600 mt-2'>
            — <b>Vinod Goenka</b>, Chairman, Valor Estate Ltd.
          </span>
        </div>
        <div className='flex flex-col w-full lg:w-[630px] gap-2'>
          <p className='font-light text-2xl text-slate-600'>
            Building Communities Beyond Brick and Mortar
          </p>
          <p className='font-light text-sm text-slate-600 mb-2'>
            At the heart of Valor Estate Ltd. lies a profound commitment to
            building not just structures, but lives and communities. Led by Mr.
            Vinod Goenka, the company has long held philanthropy and social
            responsibility as pillars of its business philosophy. Through its
            affiliated trusts—Goenka & Associates Educational Trust, Goenka &
            Associates Medical Trust, and Goenka & Associates Social Welfare
            Trust—the company contributes to a broad spectrum of social and
            charitable causes. The educational trust owns and manages eleven
            schools across Mumbai's suburbs, offering quality education to over
            22,000 students. In parallel, the medical trust serves more than
            1,000 patients daily, providing subsidized outpatient and diagnostic
            care to lower- and middle-income families.
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

export default FundingSection;
