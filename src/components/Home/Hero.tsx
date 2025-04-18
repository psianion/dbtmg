import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const images = ['/hero/hero1.jpg', '/hero/hero1.jpg', '/hero/hero1.jpg'];

const heroData = [
  { id: 1, image: '/hero/hero1.jpg', desc: 'Lorem ipsum dolor sit amet.' },
  { id: 2, image: '/hero/hero1.jpg', desc: 'ipsum dolor sit amet Lorem' },
  { id: 3, image: '/hero/hero1.jpg', desc: 'Lorem sit amet ipsum dolor' }
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
              <div className='flex items-center justify-center h-full bg-black/30'>
                <div className='w-[1000px] flex items-end h-full pb-20'>
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
