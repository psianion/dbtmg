import { fetchEntries } from '@/lib/contentfulClient';
import { format } from 'date-fns';
import React, { useEffect } from 'react';

const NewsSection = () => {
  const [news, setNews] = React.useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetchEntries('newsAwards');
      const data = response.map((item) => {
        return {
          title: item.fields.title || '',
          year: item.fields.year || 2025,
          nameOfPublication: item.fields.nameOfPublication || '',
          itemType: item.fields.itemType || '',
          image:
            `https:${item.fields?.mediaUpload?.[0]?.fields?.file?.url}` || '',
          excerpt: item.fields.excerpt || '',
          date: item.fields.date || '',
          slug: item.fields.slug || '',
          text: item.fields.detailText || '',
          author: item.fields.author || '',
          hyperlink: item.fields.hyperlink || '',
          toBeFeaturedOnHomePage: item.fields.toBeFeaturedOnHomePage || false
        };
      });
      const filteredData = data.filter((item) => item.toBeFeaturedOnHomePage);
      setNews(filteredData);
      console.log({ filteredData });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <div className='w-[90%] lg:w-[1080px] flex flex-col mb-20 gap-6 '>
      <h5 className='border-l-6 h-[30px] flex items-center border-solid border-red-700 text-red-700 pl-4 font-semibold text-xl'>
        News.
      </h5>
      <div className='w-full flex flex-col lg:flex-row gap-8'>
        {news.length &&
          news.map((el, index) => (
            <div
              key={index}
              className='flex flex-col gap-2 w-full lg:w-[33%] text-slate-600 hover:text-red-700 cursor-pointer'
            >
              <div
                style={{ backgroundImage: `url(${el.image})` }}
                className='w-full h-[250px] bg-center bg-cover bg-no-repeat'
              />
              <div className='flex flex-col gap-1 lg:gap-0'>
                <p className='font-light text-xl leading-6'>{el.title}</p>
                <p className='font-light text-sm md:text-xs uppercase text-slate-600'>
                  {format(new Date(el.date), 'MMMM dd, yyyy')}
                </p>
                <p className='font-light text-sm md:text-xs text-slate-600'>
                  {el.excerpt}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsSection;
