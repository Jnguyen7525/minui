import React from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Star } from "lucide-react";
import Rating from "./rating";

type TestimonialProps = {
  name: string;
  review: string;
  avatar: string;
  className?: string;
  rating?: number;
};

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  review,
  avatar,
  className,
  rating = 0,
}) => {
  return (
    <Card className={`${className}`}>
      {/* ✅ Avatar and Name */}
      <CardHeader className="flex flex-col items-center">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full shadow-lg dark:shadow-black/30"
        />
        <p className="mt-3 text-lg font-semibold ">{name}</p>
      </CardHeader>

      {/* ✅ Review Content */}
      <CardContent className="mt-4 text-center flex flex-col items-center space-y-2 ">
        <p>"{review}"</p>
        {/* ✅ Star Rating */}
        <Rating
          value={rating}
          maxRating={5}
          icon={<Star />}
          activeColor="yellow"
          inactiveColor="white"
          readOnly={true} // ✅ Makes the rating non-interactive
        />
      </CardContent>
    </Card>
  );
};

export default Testimonial;
