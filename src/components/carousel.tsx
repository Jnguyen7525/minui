import React, { useState } from "react";

type CarouselProps = {
  images: string[];
  transition?: "fade" | "slide";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  prevButton?: React.ReactNode; // ✅ Custom previous button
  nextButton?: React.ReactNode; // ✅ Custom next button
  indicatorItem?: (index: number, isActive: boolean) => React.ReactNode; // ✅ Custom indicator item
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  transition = "fade",
  autoPlay = false,
  autoPlayInterval = 3000,
  prevButton = <span>❮</span>,
  nextButton = <span>❯</span>,
  indicatorItem = () => <div />,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // AutoPlay Logic
  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval]);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Slides */}
      <div className="relative w-full h-full flex transition-transform duration-500 ease-in-out">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`${
              transition == "fade"
                ? `absolute w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`
                : ` absolute w-full h-full object-cover duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`
            }`}
            style={{
              transform:
                transition === "slide"
                  ? `translateX(${(index - currentSlide) * 100}%)`
                  : "none",
              position: "absolute", // ✅ Keep images stacked properly
              left: "0", // ✅ Ensure images start from the left side
              top: "0", // ✅ Align images correctly within the container
            }}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)}>
            {indicatorItem(index, index === currentSlide)}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2"
        onClick={prevSlide}
      >
        {prevButton}
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={nextSlide}
      >
        {nextButton}
      </button>
    </div>
  );
};

export default Carousel;
