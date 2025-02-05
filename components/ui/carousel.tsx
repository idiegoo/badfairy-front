import { useState, useRef } from 'react';
import Image from 'next/image';

type CarouselProps = {
  images: { url: string }[];
};

export const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto md:w-96 md:h-full">
      <div
        className="relative overflow-hidden w-full h-0 pb-[120%] md:w-96 md:h-96"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black p-2 font-bold"
        onClick={handlePrevClick}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black font-bold p-2"
        onClick={handleNextClick}
      >
        &#10095;
      </button>
    </div>
  );
};