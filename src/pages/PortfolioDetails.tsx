import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import { fetchEntryBySlug } from '@/lib/contentfulClient';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

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

const PortfolioDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const images = project?.fields.images.map((image) => image.fields.file.url);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntryBySlug('projects', slug)
      .then((item) => {
        setProject(item);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Blog not found</p>;
  console.log(project);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <PortfolioHero />
      <div className='flex flex-col w-[1080px] mt-10'>
        <div
          onClick={() => navigate('/portfolio')}
          className={`border-l-6 h-[25px] flex items-center border-solid pl-4 cursor-pointer text-lg border-red-600 text-red-600 font-semibold`}
        >
          Portfolio.
        </div>
        <Divider width='400px' margin={5} />
        <div className='w-full flex flex-col items-end'>
          <p className='font-light text-sm uppercase text-slate-600'>
            {project.fields.city}
          </p>
          <p className='font-light text-sm uppercase text-slate-600'>
            {project.fields.area} Sq Ft
          </p>
        </div>
        <p className='font-thin text-7xl text-slate-600 mb-2'>
          {project.fields.name}
        </p>
        <p className='font-light text-lg text-slate-600 mb-8'>
          {project.fields.desc}
        </p>
        <div
          style={{
            backgroundImage: `url(https:${images[activeImage]})`
          }}
          className={`w-full h-[520px] bg-center bg-cover bg-no-repeat mb-10`}
        />
        <div className='w-full flex'>
          <div className='w-[400px] flex gap-2 flex-wrap'>
            {images.map((image, index) => (
              <div
                onClick={() => setActiveImage(index)}
                key={index}
                style={{
                  backgroundImage: `url(https:${image})`
                }}
                className={`w-[100px] h-[80px] bg-center bg-cover bg-no-repeat mb-2 cursor-pointer ${
                  index === activeImage ? 'border-2 border-red-600' : ''
                }`}
              />
            ))}
          </div>
          <div className='flex flex-col w-[680px] gap-2'>
            <div className='font-light prose text-slate-600 mb-10'>
              {documentToReactComponents(
                project.fields.description,
                richTextOptions
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioDetails;
