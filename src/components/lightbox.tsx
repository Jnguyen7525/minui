import { useState } from "react";

type LightboxProps = {
  images: string[];
  className?: string;
  //   imagesStyle?: string;
};

const Lightbox: React.FC<LightboxProps> = ({
  images,
  className,
  //   imagesStyle="",
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="p-5">
      {/* Thumbnail Grid */}
      <div className={`${className}`}>
        {images.map((src) => (
          <div key={src} className="flex w-full items-center justify-center">
            <img
              src={src}
              alt="Gallery"
              className="cursor-zoom-in rounded-md shadow-lg transition-transform hover:scale-105"
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ✖
          </button>

          {/* Full-page container */}
          <div className="w-screen h-screen flex items-center justify-center p-20">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="object-contain max-w-screen max-h-screen animate-fade-scale"
            />
          </div>
        </div>
      )}

      {/* Inline CSS for Keyframes Animation */}
      <style>
        {`
        @keyframes fade-scale {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          100% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .animate-fade-scale {
          animation: fade-scale 0.3s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default Lightbox;
