//@ts-nocheck
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { fetchEntries } from '@/lib/contentfulClient';
import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const teams = ['In the News', 'Press Release', 'Video Coverage', 'Awards'];

  const fetchPeople = async () => {
    try {
      const response = await fetchEntries('execProfiles');
      const data = response.map((item) => {
        return {
          name: item.fields.name,
          designation: item.fields.desc,
          slug: item.fields.slug,
          teamName: item.fields.teamName,
          image: `https:${item.fields.images[0].fields.file.url}`,
          desc: item.fields.description.content.map((el) => el.content[0].value)
        };
      });

      const groupedData = data.reduce((acc, person) => {
        const team = person.teamName;
        if (!acc[team]) {
          acc[team] = [];
        }
        acc[team].push(person);
        return acc;
      }, {});

      const orderedGroupedData = teams.map((teamName) => ({
        name: teamName,
        data: groupedData[teamName] || []
      }));

      setNews(orderedGroupedData);
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
      <Footer />
    </div>
  );
};

export default Blogs;
