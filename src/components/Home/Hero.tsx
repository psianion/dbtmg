import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className='w-full h-[60vh] lg:h-full '>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        effect='fade'
        fadeEffect={{ crossFade: true }}
        className='h-[95vh]'
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {heroData.map((src) => (
          <SwiperSlide key={src.id}>
            <div
              style={{ backgroundImage: `url(${src.image})` }}
              className='h-[60vh] lg:h-[95vh] w-full bg-center bg-cover bg-no-repeat'
            >
              <div className='flex items-center justify-center h-full bg-black/40'>
                <div className='w-[90%] lg:w-[1080px] flex items-end h-full pb-10 relative'>
                  <h1 className='text-5xl lg:text-8xl text-white font-[100] w-[700px]'>
                    {src.desc}
                  </h1>
                  <div className='absolute bottom-10 right-0 flex gap-1'>
                    {heroData.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setActiveIndex(index);
                          swiperRef.current?.slideToLoop(index);
                        }}
                        className={`w-2.5 h-2.5 cursor-pointer ${
                          activeIndex === index ? 'bg-red-500' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
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
