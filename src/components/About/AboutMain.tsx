import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart';
import { Pie, PieChart } from 'recharts';

const data = [
  {
    heading: 'Exclusive Mumbai Focus.',
    text: 'Headquartered in Mumbai for decades, DB Realty is a full-service development company specializing in large scale urban regeneration projects across the Mumbai Metro Region. Our exclusive focus on the region helps us understand the nuances of market trends and timing, allowing us to be highly responsive and opportunistic while contributing to the vibrancy of the communities that populate our region.'
  },
  {
    heading: 'Long Term Local Relationships.',
    text: "Experienced management and unique local relationships have been key to DBR's track record of success. Over the last three decades, our firm has cultivated deep relationships — both within the Mumbai real estate landscape, as well as nationally and internationally — with property owners, tenants, brokers, construction companies, capital sources, and financial institutions. DBR has developed in more than 20 different neighborhoods in the Mumbai Metro Region, activating a reputation that reflects the value we place on enriching the communities in which we work. In concert with some of these very relationships, we have also delved deeper into the issues of housing, growth, water, transportation, and other matters critical to the overall sustainability of both the Mumbai Metro Region and the greater state of Maharashtra."
  },
  {
    heading: 'Broad Mix of Developments and Large Land Bank.',
    text: 'DBR has developed a mix of uses totaling approximately 30 million square feet of office, luxury housing, social housing, retail and hospitality. Our undeveloped land bank in the Mumbai Metro Region spans more than 400 acres of land.'
  },
  {
    heading: 'Institutional Partners and Superior Returns.',
    text: 'DBR’s successful development ventures have resulted in consistently superior investment returns for our equity capital partners. TMG’s partners include Prestige Estates, Godrej Properties, L&T Realty, Lodha Group, Kotak Mahindra Bank , JC Flowers among others. The Times of India and other major publications have ranked DB Realty among the top Real Estate Developers in the Mumbai and has acknowledged DB Realty for many award-winning development projects.'
  }
];

const chartData = [
  { browser: 'retail', visitors: 12, fill: 'var(--color-retail)' },
  { browser: 'office', visitors: 71, fill: 'var(--color-office)' },
  { browser: 'residential', visitors: 17, fill: 'var(--color-residential)' }
];

const chartConfig = {
  visitors: {
    label: 'Growth Percentage'
  },
  office: {
    label: 'Office',
    color: '#5A849F'
  },
  retail: {
    label: 'Retail',
    color: '#BCBF90'
  },
  residential: {
    label: 'Residential',
    color: '#90ABC1'
  }
} satisfies ChartConfig;

const AboutMain = () => {
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col-reverse lg:flex-row gap-8'>
      <div className='min-w-[400px] h-[400px] rounded-sm flex flex-col'>
        <p className='text-sm font-semibold text-slate-600'>
          Summary of Diversity + Growth
        </p>
        <div>
          <ChartContainer
            config={chartConfig}
            className='aspect-square max-h-[350px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Pie data={chartData} dataKey='visitors' nameKey='browser' />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
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
