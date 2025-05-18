//@ts-nocheck
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import NewsHeading from '@/components/News/NewsHeading';
import NewsHero from '@/components/News/NewsHero';
import { fetchEntries } from '@/lib/contentfulClient';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Investor = () => {
  const [news, setNews] = useState([]);
  const [activeSection, setActiveSection] = React.useState('In the News');
  const [loading, setLoading] = useState(true);
  const teams = ['In the News', 'Press Release', 'Video Coverage', 'Awards'];

  const fetchPeople = async () => {
    try {
      const response = await fetchEntries('investorRelations');
      //   const data = response.map((item) => {
      //     return {
      //       title: item.fields.title || '',
      //       year: item.fields.year || 2025,
      //       nameOfPublication: item.fields.nameOfPublication || '',
      //       itemType: item.fields.itemType || '',
      //       image:
      //         `https:${item.fields?.mediaUpload?.[0]?.fields?.file?.url}` || '',
      //       excerpt: item.fields.excerpt || '',
      //       date: item.fields.date || '',
      //       slug: item.fields.slug || '',
      //       text: item.fields.detailText || '',
      //       author: item.fields.author || '',
      //       hyperlink: item.fields.hyperlink || ''
      //     };
      //   });

      //   const groupedData = data.reduce((acc, person) => {
      //     const team = person.itemType;
      //     if (!acc[team]) {
      //       acc[team] = [];
      //     }
      //     acc[team].push(person);
      //     return acc;
      //   }, {});

      //   const orderedGroupedData = teams.map((itemType) => ({
      //     name: itemType,
      //     data: groupedData[itemType] || []
      //   }));

      //   const orderedGroupedDataByYear = orderedGroupedData.reduce(
      //     (acc, item) => {
      //       const groupedDataByYear = item.data.reduce((acc, person) => {
      //         const year = person.year;
      //         if (!acc[year]) {
      //           acc[year] = [];
      //         }
      //         acc[year].push(person);
      //         return acc;
      //       }, {});

      //       const sortedYears = Object.keys(groupedDataByYear).sort(
      //         (a, b) => b - a
      //       );

      //       acc[item.name] = sortedYears.map((year) => ({
      //         year,
      //         data: groupedDataByYear[year]
      //       }));

      //       return acc;
      //     },
      //     {}
      //   );

      //   setNews(orderedGroupedDataByYear);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (loading) return <p>Loading About...</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <NewsHero />
      <NewsHeading
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {/* <div className='flex w-[1080px] justify-end'>
        <div className='w-[50%] flex flex-col gap-10 mb-10'>
          {news[activeSection].map((item, index) => {
            return (
              <div key={index} className='w-full flex flex-col'>
                <p className='font-semibold text-[19px] text-red-600'>
                  {item.year}
                </p>
                <div className='flex flex-col gap-8'>
                  {item.data.map((person, index) => {
                    return (
                      <div key={index} className='flex flex-col gap-1'>
                        <p className='font-light text-[12px] text-slate-500 uppercase'>
                          {format(new Date(person.date), 'MMMM dd, yyyy')}
                        </p>
                        <p className='font-semibold text-[16px] text-gray-600'>
                          {person.nameOfPublication}
                        </p>
                        <p className='font-light text-[24px] text-slate-600'>
                          {person.title}
                        </p>
                        <p className='font-light text-[12px] text-slate-500 italic'>
                          {person.author}
                        </p>
                        <p className='font-light text-[16px] text-slate-500'>
                          {person.excerpt}
                        </p>
                        <p className='font-light text-[12px] text-red-600 uppercase cursor-pointer'>
                          Read More
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default Investor;
