import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import Rating from "react-rating-stars-component";
const ReviewsSlider = () => {
  const [latestReview, setLatestReview] = useState([]);
  useEffect(() => {
    axios
      .get("https://insta-stay-server.vercel.app/latestReview")
      .then((res) => setLatestReview(res.data));
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10 text-center">
        What customer said about us?
      </h1>
      <Slider {...settings} className="mx-auto text-center">
        {latestReview.map((rev) => (
          <div
            key={rev._id}
            className="max-w-lg mx-auto bg-base-300 px-5 py-8 rounded-md shadow-md mb-5"
          >
            <div className="avatar flex flex-col justify-center">
              <div className="w-20 rounded-full mx-auto">
                <img src={rev?.image} />
              </div>
            </div>
            <h1 className="text-sm text-gray-600 text-center">
              {rev?.userName}
            </h1>
            <div className="w-fit text-center mx-auto">
              <Rating
                count={rev.rating} // Total stars
                value={rev.rating} // Current rating value (e.g., 4)
                size={24} // Size of stars
                edit={false} // Disable editing
                activeColor="#ffd700" // Yellow color for active stars
                color="#d3d3d3" // Gray color for inactive stars
              />
            </div>
            <div className="text-center">
              <p className="w-fit mx-auto flex text-gray-800">
                <FaQuoteLeft className="mr-2"></FaQuoteLeft>
                {rev?.feedback}
                <FaQuoteRight className="ml-2"></FaQuoteRight>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsSlider;
