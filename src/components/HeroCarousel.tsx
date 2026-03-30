'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PhotoModal from './PhotoModal';

const images = [
  { src: '/imgs/planes/rauli.png', alt: 'Urna 1 Margarita' },
  { src: '/imgs/planes/orquidea.png', alt: 'Urna 2 Margarita' }
];

export default function HeroCarousel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(images[0]);

  const handleImageClick = (img: typeof images[0]) => {
    setSelectedImg(img);
    setModalOpen(true);
  };

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full"
        a11y={{ enabled: true, prevSlideMessage: 'Imagen anterior', nextSlideMessage: 'Siguiente imagen' }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="relative w-full h-full cursor-pointer" onClick={() => handleImageClick(img)}>
            <Image 
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority={i === 0}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <PhotoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        imageSrc={selectedImg.src} 
        imageAlt={selectedImg.alt} 
      />
    </>
  );
}
