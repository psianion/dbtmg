import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { fetchEntries } from '@/lib/contentfulClient';
import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries('blogs')
      .then((items) => {
        setBlogs(items);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <Footer />
    </div>
  );
};

export default Blogs;
