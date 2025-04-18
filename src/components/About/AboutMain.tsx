import React from 'react';

const data = [
  {
    heading: 'Exclusive Bay Area Focus.',
    text: 'Headquartered in San Francisco for decades, TMG Partners is a privately held full-service development company specializing in urban infill projects across the San Francisco Bay Area. Our exclusive focus on the region helps us understand the nuances of market trends and timing, allowing us to be highly responsive and opportunistic while contributing to the vibrancy of the communities that populate our region.'
  },
  {
    heading: 'Long Term Local Relationships.',
    text: 'Experienced management and unique local relationships have been key to TMG’s track record of success. Over the last four decades, our firm has cultivated deep relationships — both within the Bay Area real estate landscape, as well as nationally and internationally — with property owners, tenants, brokers, construction companies, capital sources, and financial institutions. TMG has developed in more than 20 different cities and every major county in the Bay Area, activating a reputation that reflects the value we place on enriching the communities in which we work. In concert with some of these very relationships, we have also delved deeper into the issues of housing, growth, water, transportation, and other matters critical to the overall sustainability of both the Bay Area and the greater State of California.'
  },
  {
    heading: 'Broad Mix of Developments.',
    text: 'TMG has developed a mix of uses totaling approximately 30 million square feet of office, research and development, multifamily residential, retail, and more than 400 acres of land, with a portfolio valuation totaling $6.8 billion.'
  },
  {
    heading: 'Institutional Partners and Superior Returns.',
    text: 'TMG’s successful development ventures have resulted in consistently superior investment returns for our equity capital partners. TMG’s partners include Farallon Capital Management, Boston Properties, Alexandria Real Estate, Invesco Real Estate, Northwood Investors, CalPERS, Fortress, Westbrook, Goldman Sachs and KKR, as well as a long track record with other institutional partners. The San Francisco Business Times has ranked TMG Partners among the top Real Estate Developers in the Bay Area and has acknowledged TMG for many award-winning development projects.'
  }
];

const AboutMain = () => {
  return (
    <div className='w-[1080px] flex gap-8'>
      <div className='min-w-[400px] h-[400px] bg-slate-200 rounded-sm'></div>
      <div className='flex flex-col gap-3'>
        {data.map((item, index) => (
          <div key={index} className='flex flex-col'>
            <p className='text-md font-semibold text-slate-600'>
              {item.heading}
            </p>
            <p className='text-sm font-light text-slate-600'>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMain;
