import AboutHero from '@/components/About/AboutHero';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { fetchEntryBySlug } from '@/lib/contentfulClient';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import NewsHero from '@/components/News/NewsHero';
import { format } from 'date-fns';
import NewsHeading from '@/components/News/NewsHeading';

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className='mb-6 leading-relaxed'>{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className='mt-8 mb-4 text-2xl font-semibold'>{children}</h2>
    )
    // …add more (lists, quotes, etc.) as needed
  }
};

const BlogDetails = () => {
  const { slug } = useParams();
  const [details, setDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const fetchNewDetails = async () => {
    try {
      const res = await fetchEntryBySlug('newsAwards', slug);
      const data = {
        title: res.fields.title || '',
        year: res.fields.year || 2025,
        nameOfPublication: res.fields.nameOfPublication || '',
        itemType: res.fields.itemType || '',
        image: res.fields?.mediaUpload?.[0]?.fields?.file?.url
          ? `https:${res.fields?.mediaUpload?.[0]?.fields?.file?.url}`
          : '',
        excerpt: res.fields.excerpt || '',
        date: res.fields.date || '',
        slug: res.fields.slug || '',
        text: res.fields.detailText || '',
        author: res.fields.author || '',
        hyperlink: res.fields.hyperlink || ''
      };
      console.log(data);
      setDetails(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchNewDetails();
  }, []);

  function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    // Match standard and short YouTube URLs
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <NewsHero />
      <NewsHeading setActiveSection={() => navigate('/news')} />
      <div className='flex flex-col lg:flex-row w-[90%] lg:w-[1080px] justify-between'>
        <div className='flex flex-col w-full lg:w-[50%] max-w-[400px]'>
          {details.hyperlink && getYouTubeEmbedUrl(details.hyperlink) && (
            <div className='w-full flex justify-center mb-8'>
              <iframe
                width='400'
                height='fit'
                src={getYouTubeEmbedUrl(details.hyperlink)}
                title='YouTube video'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='rounded-lg w-full max-w-[400px] aspect-video'
              ></iframe>
            </div>
          )}
          {!details.image ? (
            <div className='w-[50%]'>Image Placeholder</div>
          ) : (
            <div
              style={{ backgroundImage: `url(${details.image})` }}
              className='w-[50%] max-w-[400px] max-h-[300px] bg-cover bg-center bg-no-repeat'
            />
          )}
        </div>

        <div className='w-full lg:w-[50%] flex flex-col gap-10 mb-10'>
          <div className='flex flex-col gap-1'>
            <p className='font-light text-[12px] text-slate-500 uppercase'>
              {format(new Date(details.date), 'MMMM dd, yyyy')}
            </p>
            <p className='font-semibold text-[16px] text-gray-600'>
              {details.nameOfPublication}
            </p>
            <p className='font-light text-[24px] text-slate-600 hover:text-red-600 transistion-all duration-300 ease-in-out cursor-pointer'>
              {details.title}
            </p>
            <p className='font-light text-[12px] text-slate-500 italic'>
              {details.author}
            </p>
            <p className='font-light text-[16px] text-slate-500'>
              {documentToReactComponents(details?.text, richTextOptions)}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
