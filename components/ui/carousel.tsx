"use client"
import Image from 'next/image';
import { useState } from 'react';
import { Photo } from '@/app/utils/product';

const Carousel = ({ images }: { images: Photo[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto md:w-96 md:h-full">
      <div className="relative overflow-hidden w-full h-0 pb-[120%] md:w-96 md:h-96">
        {images.length > 1 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={image.url}
                alt={`Slide ${index}`}
                fill
                className="w-full h-full object-cover rounded-2xl"
                unoptimized
              />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 transition-opacity duration-500 opacity-100">
            <Image
              src={images[0].url}
              alt="Single Slide"
              fill
              className="w-full h-full object-cover rounded-2xl"
              unoptimized
            />
          </div>
        )}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 opacity-50 text-white p-2 rounded"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 opacity-50 text-white p-2 rounded"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
