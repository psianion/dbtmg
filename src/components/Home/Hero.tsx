import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const images = ['/hero/hero1.webp', '/hero/hero1.webp', '/hero/hero1.webp'];

const heroData = [
  {
    id: 1,
    image: '/hero/hero1.webp',
    desc: 'Developing Mumbai, brick by brick'
  },
  {
    id: 2,
    image: '/hero/hero2.webp',
    desc: 'Creating landmarks that stand the test of time'
  },
  { id: 3, image: '/hero/hero3.webp', desc: 'Transforming urban districts' },
  { id: 4, image: '/hero/hero4.webp', desc: 'Bringing jobs closer to transit' }
];

const Hero = () => {
  return (
    <div className='w-full h-full '>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className='h-[95vh]'
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {heroData.map((src) => (
          <SwiperSlide key={src.id}>
            <div
              style={{ backgroundImage: `url(${src.image})` }}
              className='h-[95vh] w-full bg-center bg-cover bg-no-repeat'
            >
              <div className='flex items-center justify-center h-full bg-black/40'>
                <div className='w-[1000px] flex items-end h-full pb-10'>
                  <h1 className='text-8xl text-white font-thin w-[700px]'>
                    {src.desc}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
